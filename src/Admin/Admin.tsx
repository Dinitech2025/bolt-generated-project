import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Home, Tv, ShoppingCart, DollarSign, Users, Image, BarChart2, Settings, Menu, Monitor, Users2, User2, CreditCard, FileText } from 'lucide-react';
import Plateformes from './Plateformes';
import Comptes from './Comptes';
import Profils from './Profils';
import Offres from './Offres';
import Abonnements from './Abonnements';

const Admin: React.FC = () => {
  const { logout } = useAuth();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isStreamingVODOpen, setIsStreamingVODOpen] = useState(false);
  const [activePage, setActivePage] = useState<string | null>(null);

  const streamingVODRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (streamingVODRef.current && !streamingVODRef.current.contains(event.target as Node)) {
        setIsStreamingVODOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [streamingVODRef]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleStreamingVOD = () => {
    setIsStreamingVODOpen(!isStreamingVODOpen);
  };

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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Toggle Button */}
      <button
        className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none absolute top-4 left-4 z-10"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 flex-shrink-0 bg-white border-r border-gray-200 transition-transform duration-300 transform ${
          isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          {isSidebarVisible ? (
            <span className="text-2xl font-semibold text-gray-800">DINITECH</span>
          ) : (
            <span className="text-2xl font-semibold text-gray-800">DINITECH</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul>
            <li className="mb-2">
              <button
                onClick={() => setActivePage(null)}
                className="flex items-center p-2 rounded-md hover:bg-gray-100 w-full text-left"
              >
                <Home className="mr-2 h-5 w-5 text-gray-500" />
                Tableau de Bord
              </button>
            </li>
            <li className="mb-2 relative" ref={streamingVODRef}>
              <button
                onClick={toggleStreamingVOD}
                className="flex items-center p-2 rounded-md hover:bg-gray-100 w-full text-left"
              >
                <Tv className="mr-2 h-5 w-5 text-gray-500" />
                Streaming VOD
              </button>
              {/* Streaming VOD Submenu */}
              {isStreamingVODOpen && (
                <div className="absolute left-64 top-0 bg-white border border-gray-200 rounded-md shadow-md z-10">
                  <ul>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('plateformes')}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 w-full text-left"
                      >
                        <Monitor className="mr-2 h-5 w-5 text-gray-500" />
                        Plateformes
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('comptes')}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 w-full text-left"
                      >
                        <Users2 className="mr-2 h-5 w-5 text-gray-500" />
                        Comptes
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('profils')}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 w-full text-left"
                      >
                        <User2 className="mr-2 h-5 w-5 text-gray-500" />
                        Profils
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('offres')}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 w-full text-left"
                      >
                        <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
                        Offres
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('abonnements')}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 w-full text-left"
                      >
                        <FileText className="mr-2 h-5 w-5 text-gray-500" />
                        Abonnements
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <ShoppingCart className="mr-2 h-5 w-5 text-gray-500" />
                Boutique
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <DollarSign className="mr-2 h-5 w-5 text-gray-500" />
                Finance
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <Users className="mr-2 h-5 w-5 text-gray-500" />
                Gestion
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <Image className="mr-2 h-5 w-5 text-gray-500" />
                Médias
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <BarChart2 className="mr-2 h-5 w-5 text-gray-500" />
                Rapports
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <Settings className="mr-2 h-5 w-5 text-gray-500" />
                Paramètres
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4 mt-auto">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={logout}
          >
            Se Déconnecter
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-4 ${isSidebarVisible ? '' : 'w-full'}`}>
        <h1 className="text-2xl font-semibold mb-4">Tableau de Bord</h1>
        {renderPage()}
      </div>
    </div>
  );
};

export default Admin;
