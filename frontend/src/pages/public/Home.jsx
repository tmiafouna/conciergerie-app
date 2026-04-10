import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Clock, Star } from "lucide-react";
import { hotel } from "../../data/hotel";

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-linear-to-br from-blue-400 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Votre conciergerie immobilière de confiance
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Restaurant, bar, petit-déjeuner, articles de luxe - profitez de notre room service 24h/24 directement depuis votre chambre.
            </p>
            <div className="flex gap-4">
              <Link
                to="/room-service"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Room Service <ArrowRight size={18} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Notre établissement</h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          Découvrez notre hôtel partenaire et réservez une chambre à l'heure ou à la nuitée.
        </p>
        <div className="relative max-w-4xl mx-auto group">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src={hotel.photos[0].url}
              alt={hotel.name}
              className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            {/* Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-green-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg animate-pulse">
                Disponible maintenant
              </span>
            </div>

            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{hotel.name}</h3>
              <p className="text-white/80 text-sm mb-3">{hotel.tagline}</p>
              <div className="flex items-center gap-4 text-sm text-white/70 mb-5">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  {hotel.rating} ({hotel.reviewCount} avis)
                </span>
                <span>{hotel.city}, {hotel.country}</span>
                <span>À partir de <strong className="text-white">{hotel.pricePerHour} €/h</strong></span>
              </div>
              <Link
                to="/hotel"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
              >
                Réserver maintenant <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Pourquoi nous choisir ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center h-14 w-14 bg-blue-100 text-blue-600 rounded-xl mb-4">
              <Sparkles size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Qualité premium</h3>
            <p className="text-gray-500">Des prestations haut de gamme pour garantir la satisfaction de vos voyageurs.</p>
          </div>
          <div className="text-center p-8 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center h-14 w-14 bg-green-100 text-green-600 rounded-xl mb-4">
              <Clock size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Réactivité 24/7</h3>
            <p className="text-gray-500">Une équipe disponible à tout moment pour répondre aux urgences.</p>
          </div>
          <div className="text-center p-8 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center h-14 w-14 bg-purple-100 text-purple-600 rounded-xl mb-4">
              <Shield size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fiabilité</h3>
            <p className="text-gray-500">Des professionnels vérifiés et assurés pour chaque intervention.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Prêt à profiter de votre séjour ?</h2>
          <p className="text-gray-500 mb-8">Inscrivez-vous gratuitement et commandez vos premiers services en quelques clics.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Commencer maintenant <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
