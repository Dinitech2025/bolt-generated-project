import React from 'react';
import Plateformes from './Streaming/Plateformes';
import Comptes from './Streaming/Comptes';
import Profils from './Streaming/Profils';
import Offres from './Streaming/Offres';
import Abonnements from './Streaming/Abonnements';

interface DashboardProps {
  activePage: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ activePage }) => {
  const renderPage = () => {
    switch (activePage) {
      case 'plateformes':
        return <Plateformes />;
      case 'comptes':
        return <Comptes />;
      case 'profils':
        return <Profils />;
      case 'offres':
        return <Offres />;
      case 'abonnements':
        return <Abonnements />;
      default:
        return <p>Bienvenue sur la page d'administration!</p>;
    }
  };

  return <div>{renderPage()}</div>;
};

export default Dashboard;
