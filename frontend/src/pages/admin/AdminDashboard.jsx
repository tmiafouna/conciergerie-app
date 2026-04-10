import { Link } from "react-router-dom";
import { Package, ClipboardList, Users, TrendingUp, Clock, Euro, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllOrders, getAllUsers } from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ orders: [], users: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [ordersRes, usersRes] = await Promise.all([
          getAllOrders().catch(() => ({ data: [] })),
          getAllUsers().catch(() => ({ data: [] })),
        ]);
        setStats({
          orders: ordersRes.data || [],
          users: usersRes.data || [],
        });
      } catch {
        /* silent */
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalRevenue = stats.orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = stats.orders.filter((o) => o.status === "pending").length;
  const completedOrders = stats.orders.filter((o) => o.status === "completed").length;

  const ordersByStatus = [
    { label: "En attente", count: pendingOrders, color: "bg-yellow-400" },
    { label: "Confirmées", count: stats.orders.filter((o) => o.status === "confirmed").length, color: "bg-blue-400" },
    { label: "Terminées", count: completedOrders, color: "bg-green-400" },
    { label: "Annulées", count: stats.orders.filter((o) => o.status === "cancelled").length, color: "bg-red-400" },
  ];

  const avgProcessingTime = stats.orders.length > 0
    ? Math.round(stats.orders.reduce((sum, o) => {
        const created = new Date(o.createdAt);
        const updated = new Date(o.updatedAt);
        return sum + (updated - created) / 60000;
      }, 0) / stats.orders.length)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Administration</h1>
      <p className="text-gray-500 mb-8">Vue d'ensemble</p>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">Chiffre d'affaires</span>
            <div className="h-9 w-9 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <Euro size={18} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">{loading ? "..." : `${totalRevenue} €`}</p>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><TrendingUp size={12} /> Total cumulé</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">Commandes</span>
            <div className="h-9 w-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingBag size={18} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">{loading ? "..." : stats.orders.length}</p>
          <p className="text-xs text-yellow-600 mt-1">{pendingOrders} en attente</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">Temps moyen</span>
            <div className="h-9 w-9 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <Clock size={18} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">{loading ? "..." : `${avgProcessingTime} min`}</p>
          <p className="text-xs text-gray-500 mt-1">Traitement moyen</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">Utilisateurs</span>
            <div className="h-9 w-9 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">{loading ? "..." : stats.users.length}</p>
          <p className="text-xs text-gray-500 mt-1">Utilisateurs actifs</p>
        </div>
      </div>

      {/* Orders by status */}
      <div className="mb-10">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <ClipboardList size={20} className="text-green-600" />
            <h3 className="font-semibold text-gray-800">Commandes par statut</h3>
          </div>
          <div className="space-y-4">
            {ordersByStatus.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{s.label}</span>
                  <span className="font-medium text-gray-800">{s.count}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${s.color} rounded-full transition-all`}
                    style={{ width: `${stats.orders.length > 0 ? (s.count / stats.orders.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Gestion</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/room-service"
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group"
        >
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Package size={24} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Services</h3>
          <p className="text-sm text-gray-500">Voir et gérer tous les services.</p>
        </Link>

        <Link
          to="/admin/orders"
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group"
        >
          <div className="h-12 w-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <ClipboardList size={24} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Commandes</h3>
          <p className="text-sm text-gray-500">Voir et gérer toutes les commandes.</p>
        </Link>

        <Link
          to="/admin/users"
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group"
        >
          <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Users size={24} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Utilisateurs</h3>
          <p className="text-sm text-gray-500">Gérer les comptes et les rôles.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
