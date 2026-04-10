import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import RoomServiceLinks from "./RoomServiceLinks";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ========== HEADER ========== */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Conciergerie
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/hotel" className="text-gray-600 hover:text-blue-600 transition">
                Hôtel
              </Link>
              <Link to="/room-service" className="text-gray-600 hover:text-blue-600 transition">
                Room Service
              </Link>

              {user ? (
                <>
                  <Link to={user.role === "admin" ? "/admin" : "/dashboard"} className="text-gray-600 hover:text-blue-600 transition">
                    Dashboard
                  </Link>
                  <Link to="/orders" className="text-gray-600 hover:text-blue-600 transition">
                    Commandes
                  </Link>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {user.name}
                  </span>
                  <button onClick={handleLogout} className="inline-flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition cursor-pointer">
                    <LogOut size={20} /> Se déconnecter
                  </button>
                </>
              ) : (
                <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Connexion
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <button className="md:hidden text-gray-600 cursor-pointer" onClick={() => setOpen(!open)}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden pb-4 space-y-2">
              <Link to="/hotel" onClick={() => setOpen(false)} className="block py-2 text-gray-600">Hôtel</Link>
              <Link to="/room-service" onClick={() => setOpen(false)} className="block py-2 text-gray-600">Room Service</Link>
              {user ? (
                <>
                  <Link to={user.role === "admin" ? "/admin" : "/dashboard"} onClick={() => setOpen(false)} className="block py-2 text-gray-600">Dashboard</Link>
                  <Link to="/orders" onClick={() => setOpen(false)} className="block py-2 text-gray-600">Commandes</Link>
                  <span className="block py-2 text-sm font-medium text-blue-600">{user.name}</span>
                  <button onClick={handleLogout} className="block py-2 text-red-500 cursor-pointer">Déconnexion</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="block py-2 text-blue-600 font-medium">Connexion</Link>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* ========== CONTENU ========== */}
      <main className="flex-1">{children}</main>

      {/* ========== FOOTER ========== */}
      <footer className="bg-gray-900 text-gray-300 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Conciergerie</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Votre partenaire de confiance pour la gestion de vos biens locatifs. Services premium, disponibilité 24/7.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition">Accueil</Link></li>
                <li><Link to="/room-service" className="hover:text-white transition">Room Service</Link></li>
                <li><Link to="/hotel" className="hover:text-white transition">Hôtel</Link></li>
                <li><Link to="/login" className="hover:text-white transition">Connexion</Link></li>
              </ul>
            </div>

            {/* Room Service Categories */}
            <div>
              <h4 className="text-white font-semibold mb-4">Room Service</h4>
              <RoomServiceLinks />
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>contact@sheraton-paris-airport.com</li>
                <li>+33 1 49 19 67 67</li>
                <li>Avenue du Général de Gaulle</li>
                <li>95700 Roissy-en-France, France</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Conciergerie. Tous droits réservés.</p>
            <div className="flex gap-4 mt-3 sm:mt-0">
              <Link to="/legal" className="hover:text-white transition">Mentions légales</Link>
              <Link to="/privacy" className="hover:text-white transition">Confidentialité</Link>
              <Link to="/terms" className="hover:text-white transition">CGV</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
