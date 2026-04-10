import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Conditions générales de vente</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Objet</h2>
          <p className="text-gray-600">
            Les présentes conditions générales de vente (CGV) régissent les réservations de chambres 
            et les services de conciergerie proposés par le Sheraton Paris Airport Hotel & Conference Centre 
            via son site web et ses applications mobiles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Réservation</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Modalités de réservation</h3>
              <p className="text-gray-600">
                Toute réservation doit être accompagnée des informations suivantes : nom complet, 
                adresse email, numéro de téléphone, et informations de paiement valides.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Confirmation</h3>
              <p className="text-gray-600">
                La réservation est confirmée dès réception du paiement ou de la garantie bancaire. 
                Une confirmation par email vous sera adressée dans les 24 heures.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tarifs et paiement</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Tarifs</h3>
              <p className="text-gray-600">
                Les tarifs affichés sont en euros et incluent toutes taxes. Les tarifs peuvent varier 
                selon la période, le type de chambre et les disponibilités.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Paiement</h3>
              <p className="text-gray-600">
                Le paiement s'effectue par carte bancaire sécurisée au moment de la réservation 
                ou à l'arrivée pour les réservations avec garantie.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Annulation et modification</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Politique d'annulation</h3>
              <p className="text-gray-600">
                - Annulation gratuite jusqu'à 48h avant l'arrivée<br />
                - 50% de pénalité entre 48h et 24h avant l'arrivée<br />
                - 100% de pénalité moins de 24h avant l'arrivée<br />
                - Non-présentation : 100% de pénalité
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Modification</h3>
              <p className="text-gray-600">
                Les modifications de réservation sont possibles sous réserve de disponibilité 
                et peuvent entraîner des frais de changement.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Services de conciergerie</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Room Service</h3>
              <p className="text-gray-600">
                Service disponible 24h/24. Les commandes sont livrées dans votre chambre 
                sous 30 minutes en moyenne. Paiement à la livraison ou ajout à votre note de frais.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Services additionnels</h3>
              <p className="text-gray-600">
                Ménage, blanchisserie, transport, réservations restaurant, etc. 
                Les tarifs des services additionnels sont disponibles sur demande.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Responsabilité</h2>
          <p className="text-gray-600">
            Le Sheraton Paris Airport Hotel décline toute responsabilité en cas de force majeure, 
            de grève, ou d'événements indépendants de sa volonté. La responsabilité de l'hôtel 
            est limitée aux dommages directs et prévisibles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Litiges</h2>
          <p className="text-gray-600">
            Tout litige sera soumis à une tentative de médiation amiable. En cas d'échec, 
            les tribunaux français seront seuls compétents.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact service client</h2>
          <p className="text-gray-600">
            Pour toute question relative à vos réservations ou à ces CGV :<br />
            Email : reservations@sheraton-paris-airport.com<br />
            Téléphone : +33 1 49 19 67 67<br />
            Disponible 24h/24 et 7j/7
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

export default Terms;
