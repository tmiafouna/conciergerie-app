const Order = require("../models/Order");

// POST /api/orders — client connecté
exports.createOrder = async (req, res, next) => {
  try {
    const { type = "roomservice", items, roomId, roomName, bookingDate, bookingEndDate, bookingType, startTime, endTime, duration, roomNumber, total: bodyTotal } = req.body;

    // Validation stricte du type
    if (!["hotel", "roomservice"].includes(type)) {
      return res.status(400).json({ success: false, message: "Type de commande invalide" });
    }

    if (type === "roomservice") {
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, message: "Le panier est vide" });
      }
      
      // Validation des items
      for (const item of items) {
        if (!item.name || typeof item.name !== 'string' || item.name.trim().length === 0) {
          return res.status(400).json({ success: false, message: "Nom d'article invalide" });
        }
        if (typeof item.quantity !== 'number' || item.quantity < 1 || item.quantity > 100) {
          return res.status(400).json({ success: false, message: "Quantité invalide" });
        }
        if (typeof item.price !== 'number' || item.price < 0 || item.price > 10000) {
          return res.status(400).json({ success: false, message: "Prix invalide" });
        }
      }
    }

    const total = bodyTotal || (items ? items.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0);
    
    // Validation du total
    if (typeof total !== 'number' || total < 0 || total > 50000) {
      return res.status(400).json({ success: false, message: "Total invalide" });
    }

    // Auto-assign room number for hotel bookings
    let assignedRoomNumber = roomNumber;
    if (type === "hotel" && !roomNumber) {
      const floor = Math.floor(Math.random() * 5) + 1; // floors 1-5
      const room = Math.floor(Math.random() * 20) + 1; // rooms 01-20
      assignedRoomNumber = `${floor}${String(room).padStart(2, "0")}`;
    }

    // Room service: merge into existing hotel order for the same room
    if (type === "roomservice" && roomNumber) {
      const existingOrder = await Order.findOne({
        user: req.user._id,
        type: "hotel",
        roomNumber,
        status: { $in: ["pending", "confirmed"] },
      });

      if (existingOrder) {
        existingOrder.items.push(...(items || []));
        existingOrder.total += total;
        await existingOrder.save();
        return res.status(200).json({ success: true, data: existingOrder, merged: true });
      }
    }

    const order = await Order.create({
      user: req.user._id,
      type,
      items: items || [],
      roomId,
      roomName,
      bookingDate,
      bookingEndDate,
      bookingType,
      startTime,
      endTime,
      duration,
      roomNumber: assignedRoomNumber,
      total,
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// GET /api/orders — commandes du client connecté
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// GET /api/orders/all — admin : toutes les commandes
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/orders/:id — admin : supprimer une commande
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Commande introuvable" });
    }
    res.json({ success: true, message: "Commande supprimée" });
  } catch (error) {
    next(error);
  }
};

// PUT /api/orders/:id/status — admin : modifier le statut
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).json({ success: false, message: "Commande introuvable" });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
