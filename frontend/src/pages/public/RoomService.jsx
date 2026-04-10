import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { hotel, roomServiceCategories } from "../../data/hotel";
import { useAuth } from "../../context/AuthContext";
import { createOrder, getMyOrders } from "../../services/api";
import {
  Utensils, Wine, Sparkles, Heart, ShoppingBag, Plus, Minus,
  ArrowLeft, BedDouble, Shirt, Trash2, CheckCircle,
} from "lucide-react";

const iconMap = {
  Utensils: <Utensils size={20} />,
  Wine: <Wine size={20} />,
  Sparkles: <Sparkles size={20} />,
  Heart: <Heart size={20} />,
  BedDouble: <BedDouble size={20} />,
  Shirt: <Shirt size={20} />,
};

const RoomService = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("restaurant");
  const [cart, setCart] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [hasHotelBooking, setHasHotelBooking] = useState(false);
  const [loading, setLoading] = useState(true);

  // Handle category navigation from footer links
  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
      // Scroll to categories section
      const categoriesSection = document.querySelector('.flex.gap-2.overflow-x-auto');
      if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.state]);

  // Pre-fill room number from active hotel booking
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    getMyOrders()
      .then((res) => {
        const hotelOrder = res.data?.find(
          (o) => o.type === "hotel" && o.roomNumber && ["pending", "confirmed"].includes(o.status)
        );
        if (hotelOrder) {
          setRoomNumber(hotelOrder.roomNumber);
          setHasHotelBooking(true);
        } else {
          setHasHotelBooking(false);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const activeCategories = roomServiceCategories.filter((c) => c.active);
  const currentCategory = roomServiceCategories.find((c) => c.id === activeCategory);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.qty > 1) return prev.map((i) => (i.id === itemId ? { ...i, qty: i.qty - 1 } : i));
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const deleteFromCart = (itemId) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderMerged, setOrderMerged] = useState(false);
  const [orderError, setOrderError] = useState("");

  const handleOrder = async () => {
    if (!user) {
      navigate("/login?redirect=/room-service");
      return;
    }
    if (!roomNumber) return;
    setOrderLoading(true);
    setOrderError("");
    try {
      const res = await createOrder({
        type: "roomservice",
        roomNumber,
        total: cartTotal,
        items: cart.map((item) => ({
          name: item.name,
          quantity: item.qty,
          price: item.price,
        })),
      });
      setOrderMerged(!!res.merged);
      setOrderSuccess(true);
      setCart([]);
      setTimeout(() => navigate("/orders"), 2500);
    } catch (err) {
      setOrderError(err.message);
    } finally {
      setOrderLoading(false);
    }
  };

  // Afficher un message d'erreur si le client n'a pas de réservation de chambre
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Vérification de vos réservations...</p>
      </div>
    );
  }

  if (user && !hasHotelBooking) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 max-w-md mx-auto">
          <div className="text-yellow-600 mb-4">
            <BedDouble size={48} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Réservation de chambre requise</h2>
          <p className="text-gray-600 mb-6">
            Vous devez avoir une réservation de chambre active pour commander du room service.
          </p>
          <div className="space-y-3">
            <Link
              to="/hotel/rooms"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Réserver une chambre
            </Link>
            <Link
              to="/orders"
              className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Voir mes commandes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/hotel" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition mb-6">
        <ArrowLeft size={18} /> Retour à l'hôtel
      </Link>

      {/* Header services */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Room Service</h1>
          <p className="text-gray-500 mt-1">{hotel.name} - Commandez depuis votre chambre</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Categories services */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
        {activeCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap text-sm font-medium transition cursor-pointer ${
              activeCategory === cat.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
            }`}
          >
            {iconMap[cat.icon]}
            {cat.name}
          </button>
        ))}
      </div>

      {/* Items grid */}
      {currentCategory && currentCategory.active ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCategory.items
            .filter((item) => item.available)
            .map((item) => {
              const inCart = cart.find((i) => i.id === item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col justify-between hover:shadow-sm transition"
                >
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <span className="text-blue-600 font-bold whitespace-nowrap ml-3">
                        {item.price === 0 ? "Gratuit" : `${item.price} €`}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                  </div>
                  <div>
                    {inCart ? (
                      <div className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2">
                        <button onClick={() => removeFromCart(item.id)} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          <Minus size={18} />
                        </button>
                        <span className="font-semibold text-blue-700">{inCart.qty}</span>
                        <button onClick={() => addToCart(item)} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          <Plus size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition cursor-pointer"
                      >
                        <Plus size={16} /> Ajouter
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">Cette catégorie est actuellement désactivée.</p>
        </div>
      )}

      {/* Cart drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCart(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Votre commande</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer text-2xl">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">Votre panier est vide</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.price === 0 ? "Gratuit" : `${item.price} € × ${item.qty}`}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800 text-sm">{item.price * item.qty} €</span>
                        <button onClick={() => deleteFromCart(item.id)} className="text-red-400 hover:text-red-600 cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {orderSuccess ? (
              <div className="p-6 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {orderMerged ? "Ajouté à votre commande !" : "Commande confirmée !"}
                </h3>
                <p className="text-gray-500 text-sm">
                  {orderMerged
                    ? `Les articles ont été ajoutés à votre commande chambre n°${roomNumber}`
                    : "Redirection vers vos commandes..."}
                </p>
              </div>
            ) : cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de chambre</label>
                  <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    placeholder="Ex: 412"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {orderError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                    {orderError}
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-blue-600">{cartTotal} €</span>
                </div>
                <button
                  onClick={handleOrder}
                  disabled={!roomNumber || orderLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {orderLoading ? "Envoi en cours..." : user ? "Confirmer la commande" : "Se connecter pour commander"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomService;
