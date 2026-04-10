import { useState } from "react";
import { Link } from "react-router-dom";
import { hotel, rooms } from "../../data/hotel";
import { Star, MapPin, Clock, ChevronLeft, ChevronRight, Wifi, Car, Utensils, Waves } from "lucide-react";

const Hotel = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const nextPhoto = () => setCurrentPhoto((prev) => (prev + 1) % hotel.photos.length);
  const prevPhoto = () => setCurrentPhoto((prev) => (prev - 1 + hotel.photos.length) % hotel.photos.length);

  return (
    <div>
      {/* Hero Gallery */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <img
          src={hotel.photos[currentPhoto].url}
          alt={hotel.photos[currentPhoto].alt}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

        <button onClick={prevPhoto} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition cursor-pointer">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextPhoto} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition cursor-pointer">
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {hotel.photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPhoto(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${i === currentPhoto ? "w-8 bg-white" : "w-2 bg-white/50"}`}
            />
          ))}
        </div>

        <div className="absolute bottom-6 left-6">
          <span className="bg-green-500 text-white text-sm font-medium px-3 py-1 rounded-full">
            Disponible maintenant
          </span>
        </div>
      </section>

      {/* Info */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{hotel.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {hotel.address}
              </span>
              <span className="flex items-center gap-1">
                <Star size={16} className="text-yellow-400 fill-yellow-400" /> {hotel.rating} ({hotel.reviewCount} avis)
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} /> Réservation à l'heure
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{hotel.description}</p>

            {/* Photos grid */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">Galerie photos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {hotel.photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo.url}
                  alt={photo.alt}
                  onClick={() => setCurrentPhoto(i)}
                  className="rounded-xl h-36 w-full object-cover cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>

            {/* Amenities */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">Équipements & services</h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {hotel.amenities.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    {i % 4 === 0 && <Wifi size={16} />}
                    {i % 4 === 1 && <Car size={16} />}
                    {i % 4 === 2 && <Utensils size={16} />}
                    {i % 4 === 3 && <Waves size={16} />}
                  </div>
                  <span className="text-sm text-gray-700">{a}</span>
                </div>
              ))}
            </div>

            {/* Location */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">Localisation</h2>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-10">
              <iframe
                title="Localisation de l'hôtel"
                src={`https://www.google.com/maps?q=${hotel.coordinates.lat},${hotel.coordinates.lng}&z=15&output=embed`}
                className="w-full h-64"
                loading="lazy"
              />
              <div className="p-4">
                <p className="font-medium text-gray-800">{hotel.address}</p>
                <p className="text-sm text-gray-500">{hotel.city}, {hotel.country}</p>
              </div>
            </div>
          </div>

          {/* Sidebar - pricing */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-20">
              <p className="text-sm text-gray-500 mb-1">À partir de</p>
              <p className="text-3xl font-bold text-blue-600 mb-1">{hotel.pricePerHour} € <span className="text-base font-normal text-gray-400">/ heure</span></p>
              <p className="text-sm text-gray-500 mb-1">ou <span className="font-semibold text-gray-800">{hotel.pricePerNight} €</span> / nuit</p>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                {hotel.rating} · {hotel.reviewCount} avis
              </div>
              <Link
                to="/hotel/rooms"
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Voir les chambres
              </Link>
              <Link
                to="/room-service"
                className="block w-full text-center border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition mt-3"
              >
                Room Service
              </Link>
              <p className="text-xs text-gray-400 text-center mt-3">Réservation à l'heure ou à la nuitée</p>
            </div>
          </div>
        </div>

        {/* Rooms preview */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos chambres</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <Link
                key={room.id}
                to={`/hotel/rooms/${room.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group"
              >
                <div className="h-40 overflow-hidden">
                  <img src={room.photo} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{room.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{room.surface} m² · {room.maxGuests} pers.</p>
                  <p className="text-lg font-bold text-blue-600">{room.pricePerHour} €<span className="text-sm font-normal text-gray-400">/h</span> · {room.pricePerNight} €<span className="text-sm font-normal text-gray-400">/nuit</span></p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Hotel;
