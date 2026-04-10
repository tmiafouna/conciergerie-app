import { Link } from "react-router-dom";

const Legal = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mentions légales</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Édition du site</h2>
          <p className="text-gray-600 mb-2">
            Le site conciergerie-app est édité par :
          </p>
          <address className="not-italic text-gray-600">
            Sheraton Paris Airport Hotel & Conference Centre<br />
            Avenue du Général de Gaulle<br />
            95700 Roissy-en-France<br />
            France
          </address>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact</h2>
          <p className="text-gray-600">
            Email : contact@sheraton-paris-airport.com<br />
            Téléphone : +33 1 49 19 67 67<br />
            Directeur de la publication : Le Directeur de l'établissement
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hébergement</h2>
          <p className="text-gray-600">
            Ce site est hébergé par :<br />
            Sheraton Hotels & Resorts<br />
            Marriott International, Inc.<br />
            10400 Fernwood Road<br />
            Bethesda, Maryland 20817, USA
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Propriété intellectuelle</h2>
          <p className="text-gray-600">
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
            et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les 
            documents téléchargeables et les représentations iconographiques et photographiques.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies</h2>
          <p className="text-gray-600">
            Ce site utilise des cookies nécessaires à son bon fonctionnement. En poursuivant votre navigation, 
            vous acceptez l'utilisation de ces cookies.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Legal;
