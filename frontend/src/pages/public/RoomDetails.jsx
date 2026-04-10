import { useParams, Link, useNavigate } from "react-router-dom";
import { hotel, rooms } from "../../data/hotel";
import { ArrowLeft, Maximize2, Users, BedDouble, Euro, Check, Clock, Moon } from "lucide-react";
import { useState } from "react";

const RoomDetails = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = rooms.find((r) => r.id === roomId);

  const [bookingType, setBookingType] = useState("hour");
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  if (!room) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chambre introuvable</h2>
        <Link to="/hotel" className="text-blue-600 hover:underline">Retour à l'hôtel</Link>
      </div>
    );
  }

  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

  const calculateDuration = () => {
    let duration = 0;
    if (bookingType === "hour") {
      if (!startTime || !endTime) return 0;
      const startHour = parseInt(startTime);
      const endHour = parseInt(endTime);
      duration = endHour > startHour ? endHour - startHour : 0;
    } else {
      if (!date || !endDate) return 0;
      const d1 = new Date(date);
      const d2 = new Date(endDate);
      duration = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    }
    return duration;
  };

  const calculatePrice = () => {
    const duration = calculateDuration();
    if (bookingType === "hour") {
      return duration * room.pricePerHour;
    } else {
      return duration * room.pricePerNight;
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleBooking = () => {
    const params = new URLSearchParams();
    params.set("room", room.id);
    params.set("type", bookingType);
    
    if (bookingType === "hour") {
      params.set("date", date);
      params.set("start", startTime);
      params.set("end", endTime);
    } else {
      params.set("date", date);
      params.set("endDate", endDate);
    }
    
    navigate(`/hotel/reservation?${params.toString()}`);
  };

  const isValid = () => {
    if (bookingType === "hour") {
      return date && startTime && endTime && calculateDuration() > 0;
    } else {
      return date && endDate && calculateDuration() > 0;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/hotel/rooms"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          Retour aux chambres
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Photo */}
          <div className="lg:w-1/2">
            <div className="h-96 lg:h-full rounded-2xl overflow-hidden">
              <img
                src={room.photo}
                alt={room.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:w-1/2">
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">{hotel.name}</p>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{room.name}</h1>
              <p className="text-gray-600 mb-6">{room.description}</p>
            </div>

            {/* Caractéristiques */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Maximize2 size={18} />
                <span>{room.surface} m²</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users size={18} />
                <span>{room.maxGuests} pers.</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <BedDouble size={18} />
                <span>{room.beds}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Euro size={18} />
                <span>{room.pricePerHour} /h</span>
              </div>
            </div>

            {/* Équipements */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3">Équipements</h3>
              <div className="grid grid-cols-2 gap-2">
                {room.equipment.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <Check size={16} className="text-green-500" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tarifs */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Tarifs</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setBookingType("hour")}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      bookingType === "hour"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    <Clock size={16} className="inline mr-1" />
                    À l'heure
                  </button>
                  <button
                    onClick={() => setBookingType("night")}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      bookingType === "night"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    <Moon size={16} className="inline mr-1" />
                    À la nuit
                  </button>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-600">
                  {bookingType === "hour" ? room.pricePerHour : room.pricePerNight} <span className="text-lg">/ {bookingType === "hour" ? "heure" : "nuit"}</span>
                </div>
              </div>
            </div>

            {/* Réservation */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Réserver</h3>
              
              {bookingType === "hour" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Heure de début</label>
                      <select
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                      >
                        <option value="">Choisir</option>
                        {hours.map((hour) => (
                          <option key={hour} value={hour}>{hour}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Heure de fin</label>
                      <select
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                      >
                        <option value="">Choisir</option>
                        {hours.map((hour) => (
                          <option key={hour} value={hour}>{hour}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date d'arrivée</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de départ</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={date || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>
              )}

              {isValid() && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">
                      {calculateDuration()} {bookingType === "hour" ? "heure(s)" : "nuit(s)"}
                    </span>
                    <span className="text-xl font-bold text-blue-600">{calculatePrice()} {calculatePrice() > 0 && "EUR"}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBooking}
                disabled={!isValid()}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isValid() ? "Continuer" : "Sélectionnez les dates"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
