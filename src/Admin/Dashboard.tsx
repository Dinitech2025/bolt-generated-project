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
      default:
        return <p>Bienvenue sur la page d'administration!</p>;
    }
  };

  return <div>{renderPage()}</div>;
};

export default Dashboard;
