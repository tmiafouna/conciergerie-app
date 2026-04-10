import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { hotel, rooms } from "../../data/hotel";
import { useAuth } from "../../context/AuthContext";
import { createOrder } from "../../services/api";
import { CalendarDays, Clock, Euro, MapPin, BedDouble, LogIn, Moon, CheckCircle } from "lucide-react";

const Reservation = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [assignedRoom, setAssignedRoom] = useState("");
  const [error, setError] = useState("");

  const roomId = searchParams.get("room");
  const date = searchParams.get("date");
  const type = searchParams.get("type") || "hour";
  const startTime = searchParams.get("start");
  const endTime = searchParams.get("end");
  const endDate = searchParams.get("endDate");

  const room = rooms.find((r) => r.id === roomId);

  const isHour = type === "hour";
  const isValid = room && date && (isHour ? startTime && endTime : endDate);

  if (!isValid) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Réservation invalide</h2>
        <Link to="/hotel" className="text-blue-600 hover:underline">Retour à l'hôtel</Link>
      </div>
    );
  }

  let duration, totalPrice;
  if (isHour) {
    const startHour = parseInt(startTime);
    const endHour = parseInt(endTime);
    duration = endHour > startHour ? endHour - startHour : 0;
    totalPrice = duration * room.pricePerHour;
  } else {
    const d1 = new Date(date);
    const d2 = new Date(endDate);
    duration = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    totalPrice = duration * room.pricePerNight;
  }

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const handlePay = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await createOrder({
        type: "hotel",
        roomId: room.id,
        roomName: room.name,
        bookingDate: date,
        bookingEndDate: isHour ? date : endDate,
        bookingType: type,
        startTime: isHour ? startTime : null,
        endTime: isHour ? endTime : null,
        duration,
        total: totalPrice,
        items: [{ name: room.name, quantity: 1, price: totalPrice }],
      });
      setAssignedRoom(res.data.roomNumber || "");
      setSuccess(true);
      setTimeout(() => navigate("/orders"), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Récapitulatif de réservation</h1>

      {/* Hotel & Room info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="flex flex-col sm:flex-row">
          <img src={room.photo} alt={room.name} className="w-full sm:w-48 h-48 object-cover" />
          <div className="p-5 flex-1">
            <p className="text-sm text-gray-400">{hotel.name}</p>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{room.name}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <MapPin size={14} /> {hotel.address}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <BedDouble size={14} /> {room.beds} · {room.surface} m²
            </div>
          </div>
        </div>
      </div>

      {/* Booking details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="font-bold text-gray-800 mb-4">Détails de la réservation</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="flex items-center gap-2 text-gray-600">
              <CalendarDays size={18} className="text-blue-600" /> {isHour ? "Date" : "Check-in"}
            </span>
            <span className="font-medium text-gray-800 capitalize">{formatDate(date)}</span>
          </div>

          {isHour ? (
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="flex items-center gap-2 text-gray-600">
                <Clock size={18} className="text-blue-600" /> Horaires
              </span>
              <span className="font-medium text-gray-800">{startTime} — {endTime} ({duration}h)</span>
            </div>
          ) : (
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="flex items-center gap-2 text-gray-600">
                <Moon size={18} className="text-blue-600" /> Check-out
              </span>
              <span className="font-medium text-gray-800 capitalize">{formatDate(endDate)}</span>
            </div>
          )}

          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="flex items-center gap-2 text-gray-600">
              <Euro size={18} className="text-blue-600" /> {isHour ? "Tarif horaire" : "Tarif / nuit"}
            </span>
            <span className="font-medium text-gray-800">
              {isHour ? `${room.pricePerHour} € / heure` : `${room.pricePerNight} € / nuit`}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-gray-600">Durée</span>
            <span className="font-medium text-gray-800">
              {isHour ? `${duration} heure${duration > 1 ? "s" : ""}` : `${duration} nuit${duration > 1 ? "s" : ""}`}
            </span>
          </div>
          <div className="flex items-center justify-between pt-3">
            <span className="text-lg font-bold text-gray-800">Total</span>
            <span className="text-2xl font-bold text-blue-600">{totalPrice} €</span>
          </div>
        </div>
      </div>

      {/* Payment / Login */}
      {success ? (
        <div className="text-center py-10">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Réservation confirmée !</h2>
          {assignedRoom && (
            <p className="text-lg font-semibold text-indigo-600 mb-2">Chambre n°{assignedRoom}</p>
          )}
          <p className="text-gray-500">Vous allez être redirigé vers vos commandes...</p>
        </div>
      ) : user ? (
        <div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-6 text-sm">
            Paiement simulé — aucune carte bancaire ne sera débitée.
          </div>
          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Traitement en cours..." : `Payer ${totalPrice} €`}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <LogIn size={40} className="text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800 mb-2">Connectez-vous pour finaliser</h3>
          <p className="text-sm text-gray-500 mb-6">Vous devez être connecté pour confirmer et payer votre réservation.</p>
          <div className="flex gap-3 justify-center">
            <Link
              to={`/login?redirect=${encodeURIComponent(`/hotel/reservation?${searchParams.toString()}`)}`}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Se connecter
            </Link>
            <Link
              to={`/register?redirect=${encodeURIComponent(`/hotel/reservation?${searchParams.toString()}`)}`}
              className="border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;
