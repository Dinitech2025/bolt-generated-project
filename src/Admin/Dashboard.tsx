import React from 'react';
import Plateformes from './Streaming/Plateformes';
import Comptes from './Streaming/Comptes';
import Profils from './Streaming/Profils';
import Offres from './Streaming/Offres';
import Abonnements from './Streaming/Abonnements';
import Produits from './Boutique/Produits';
import Services from './Boutique/Services';
import Commandes from './Boutique/Commandes';
import Factures from './Finance/Factures';
import Dépenses from './Finance/Dépenses';
import RecettesCyber from './Finance/RecettesCyber';
import Clients from './Gestion/Clients';
import Employés from './Gestion/Employés';
import Tâches from './Gestion/Tâches';
import Messages from './Gestion/Messages';
import Images from './Médias/Images';
import Vidéos from './Médias/Vidéos';
import Fichiers from './Médias/Fichiers';
import Journalier from './Rapports/Journalier';
import Hebdomadaire from './Rapports/Hebdomadaire';
import Mensuel from './Rapports/Mensuel';
import Général from './Paramètres/Général';
import BoutiqueParams from './Paramètres/Boutique';
import Paiement from './Paramètres/Paiement';
import Livraison from './Paramètres/Livraison';
import Marketing from './Paramètres/Marketing';
import SEO from './Paramètres/SEO';
import Intégrations from './Paramètres/Intégrations';
import Système from './Paramètres/Système';
import Sécurité from './Paramètres/Sécurité';
import Sauvegarde from './Paramètres/Sauvegarde';

interface DashboardProps {
  activePage: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ activePage }) => {
  const renderPage = () => {
    switch (activePage) {
      case 'Streaming/Plateformes':
        return <Plateformes />;
      case 'Streaming/Comptes':
        return <Comptes />;
      case 'Streaming/Profils':
        return <Profils />;
      case 'Streaming/Offres':
        return <Offres />;
      case 'Streaming/Abonnements':
        return <Abonnements />;
      case 'Boutique/Produits':
        return <Produits />;
      case 'Boutique/Services':
        return <Services />;
      case 'Boutique/Commandes':
        return <Commandes />;
      case 'Finance/Factures':
        return <Factures />;
      case 'Finance/Dépenses':
        return <Dépenses />;
      case 'Finance/RecettesCyber':
        return <RecettesCyber />;
      case 'Gestion/Clients':
        return <Clients />;
      case 'Gestion/Employés':
        return <Employés />;
      case 'Gestion/Tâches':
        return <Tâches />;
      case 'Gestion/Messages':
        return <Messages />;
      case 'Médias/Images':
        return <Images />;
      case 'Médias/Vidéos':
        return <Vidéos />;
      case 'Médias/Fichiers':
        return <Fichiers />;
      case 'Rapports/Journalier':
        return <Journalier />;
      case 'Rapports/Hebdomadaire':
        return <Hebdomadaire />;
      case 'Rapports/Mensuel':
        return <Mensuel />;
      case 'Paramètres/Général':
        return <Général />;
      case 'Paramètres/Boutique':
        return <BoutiqueParams />;
      case 'Paramètres/Paiement':
        return <Paiement />;
      case 'Paramètres/Livraison':
        return <Livraison />;
      case 'Paramètres/Marketing':
        return <Marketing />;
      case 'Paramètres/SEO':
        return <SEO />;
      case 'Paramètres/Intégrations':
        return <Intégrations />;
      case 'Paramètres/Système':
        return <Système />;
      case 'Paramètres/Sécurité':
        return <Sécurité />;
      case 'Paramètres/Sauvegarde':
        return <Sauvegarde />;
      default:
        return <p>Bienvenue sur la page d'administration!</p>;
    }
  };

  return <div>{renderPage()}</div>;
};

export default Dashboard;
