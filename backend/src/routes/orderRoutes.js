const router = require("express").Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const auth = require("../middlewares/auth");
const roleGuard = require("../middlewares/roleGuard");

router.post("/", auth, createOrder);
router.get("/", auth, getMyOrders);
router.get("/all", auth, roleGuard("admin"), getAllOrders);
router.put("/:id/status", auth, roleGuard("admin"), updateOrderStatus);
router.delete("/:id", auth, roleGuard("admin"), deleteOrder);

module.exports = router;
