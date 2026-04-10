import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Politique de confidentialité</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
          <p className="text-gray-600">
            Le Sheraton Paris Airport Hotel & Conference Centre s'engage à protéger la vie privée de ses clients 
            et visiteurs. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons 
            vos informations personnelles lorsque vous utilisez notre site de réservation et nos services de conciergerie.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Données collectées</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Informations personnelles</h3>
              <p className="text-gray-600">
                Nom, prénom, adresse email, numéro de téléphone, adresse postale
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Informations de réservation</h3>
              <p className="text-gray-600">
                Dates de séjour, type de chambre, préférences spécifiques, informations de paiement
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Données techniques</h3>
              <p className="text-gray-600">
                Adresse IP, type de navigateur, données de navigation, cookies
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Utilisation des données</h2>
          <p className="text-gray-600 mb-4">
            Vos données sont utilisées pour :
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Traiter vos réservations et demandes de services</li>
            <li>Améliorer notre service et personnaliser votre expérience</li>
            <li>Communiquer avec vous concernant votre réservation</li>
            <li>Assurer la sécurité et la prévention des fraudes</li>
            <li>Respecter nos obligations légales et réglementaires</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Protection des données</h2>
          <p className="text-gray-600">
            Nous mettons en place des mesures de sécurité techniques et organisationnelles appropriées pour 
            protéger vos données personnelles contre la perte, l'utilisation abusive ou l'accès non autorisé. 
            Vos données sont cryptées lors de leur transmission et stockées sur des serveurs sécurisés.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vos droits</h2>
          <p className="text-gray-600 mb-4">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit de suppression de vos données</li>
            <li>Droit de limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition au traitement</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies</h2>
          <p className="text-gray-600">
            Notre site utilise des cookies essentiels à son fonctionnement et des cookies analytiques pour 
            améliorer nos services. Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact</h2>
          <p className="text-gray-600">
            Pour toute question concernant cette politique de confidentialité ou l'exercice de vos droits, 
            contactez notre délégué à la protection des données :<br />
            Email : dpo@sheraton-paris-airport.com
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

export default Privacy;
