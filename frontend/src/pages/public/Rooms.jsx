import { Link } from "react-router-dom";
import { hotel, rooms } from "../../data/hotel";
import { MapPin, Star, Users, Maximize2 } from "lucide-react";

const Rooms = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Nos chambres</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {hotel.name}
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-yellow-400" /> {hotel.rating} ({hotel.reviewCount} avis)
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Link
            key={room.id}
            to={`/hotel/rooms/${room.id}`}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={room.photo}
                alt={room.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{room.name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{room.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <span className="flex items-center gap-1"><Maximize2 size={14} /> {room.surface} m²</span>
                <span className="flex items-center gap-1"><Users size={14} /> {room.maxGuests} pers.</span>
                <span>{room.beds}</span>
              </div>
              <div>
                <span className="text-lg font-bold text-blue-600">{room.pricePerHour} €</span>
                <span className="text-sm text-gray-400">/h</span>
                <span className="text-gray-300 mx-2">·</span>
                <span className="text-lg font-bold text-blue-600">{room.pricePerNight} €</span>
                <span className="text-sm text-gray-400">/nuit</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/hotel" className="text-blue-600 hover:underline font-medium">
          ← Retour à l'hôtel
        </Link>
      </div>
    </div>
  );
};

export default Rooms;
