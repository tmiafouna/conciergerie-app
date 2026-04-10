import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Utensils, ClipboardList, BedDouble } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Bonjour, {user?.name}.
      </h1>
      <p className="text-gray-500 mb-10">Bienvenue dans votre espace client.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/room-service"
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group"
        >
          <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Utensils size={24} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Room Service</h3>
          <p className="text-sm text-gray-500">Commandez depuis votre chambre.</p>
        </Link>

        <Link
          to="/hotel"
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group"
        >
          <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <BedDouble size={24} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">L'hôtel</h3>
          <p className="text-sm text-gray-500">Réservez une chambre.</p>
        </Link>

        <Link
          to="/orders"
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group"
        >
          <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <ClipboardList size={24} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Mes commandes</h3>
          <p className="text-sm text-gray-500">Consultez l'historique de vos commandes.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
