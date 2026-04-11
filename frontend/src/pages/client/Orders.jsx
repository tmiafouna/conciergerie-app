import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders, getAllOrders } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { ClipboardList, BedDouble, Utensils, ShoppingBag, ArrowRight } from "lucide-react";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabels = {
  pending: "En attente",
  confirmed: "Confirmée",
  completed: "Terminée",
  cancelled: "Annulée",
};

const typeLabels = {
  hotel: { label: "Réservation hôtel", icon: <BedDouble size={16} />, color: "bg-indigo-50 text-indigo-700", link: "/hotel", linkLabel: "L'hôtel" },
  roomservice: { label: "Room Service", icon: <Utensils size={16} />, color: "bg-orange-50 text-orange-700", link: "/room-service", linkLabel: "Room Service" },
};

const Orders = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = isAdmin ? getAllOrders : getMyOrders;
    fetchOrders()
      .then((data) => setOrders(data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ClipboardList size={48} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Aucune commande</h2>
        <p className="text-gray-500 mb-6">Vous n'avez pas encore passé de commande.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/room-service" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition">
            <Utensils size={16} /> Room Service
          </Link>
          <Link to="/hotel" className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition">
            <BedDouble size={16} /> L'hôtel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{isAdmin ? "Toutes les commandes" : "Mes commandes"}</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const typeInfo = typeLabels[order.type] || typeLabels.service;
          return (
            <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              {isAdmin && order.user && (
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {order.user.name} <span className="text-gray-400 font-normal">({order.user.email})</span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${typeInfo.color}`}>
                    {typeInfo.icon} {typeInfo.label}
                  </span>
                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                  <span className="font-bold text-blue-600">{order.total.toFixed(2)} €</span>
                </div>
              </div>

              {/* Hotel booking details */}
              {order.type === "hotel" && order.roomName && (
                <div className="bg-indigo-50 rounded-lg p-3 mb-3 text-sm text-indigo-700">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">{order.roomName}</p>
                    {order.roomNumber && (
                      <span className="bg-indigo-200 text-indigo-800 font-bold px-2.5 py-0.5 rounded-full text-xs">
                        Chambre n°{order.roomNumber}
                      </span>
                    )}
                  </div>
                  <p>
                    {order.bookingType === "hour"
                      ? `${order.bookingDate} · ${order.startTime} — ${order.endTime} (${order.duration}h)`
                      : `Du ${order.bookingDate} au ${order.bookingEndDate} (${order.duration} nuit${order.duration > 1 ? "s" : ""})`}
                  </p>
                </div>
              )}

              {/* Room service details */}
              {order.type === "roomservice" && order.roomNumber && (
                <div className="bg-orange-50 rounded-lg p-3 mb-3 text-sm text-orange-700">
                  <p className="font-medium">Chambre n°{order.roomNumber}</p>
                </div>
              )}

              <div className="divide-y">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-2 text-sm">
                    <span className="text-gray-600">
                      {item.name || item.service?.name || "Service supprimé"} × {item.quantity}
                    </span>
                    <span className="text-gray-800 font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-50">
                <Link
                  to={typeInfo.link}
                  className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition"
                >
                  {typeInfo.linkLabel} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
