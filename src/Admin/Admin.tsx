import React from 'react';
import { useAuth } from '../AuthContext';
import { Home, Tv, ShoppingCart, DollarSign, Users, Image, BarChart2, Settings, ChevronRight } from 'lucide-react';

const Admin: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <span className="text-2xl font-semibold text-gray-800">DINITECH</span>
        </div>
        <nav className="p-4">
          <ul>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <Home className="mr-2 h-5 w-5 text-gray-500" />
                Tableau de Bord
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <Tv className="mr-2 h-5 w-5 text-gray-500" />
                Streaming VOD
                <ChevronRight className="ml-auto h-4 w-4 text-gray-500" />
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <ShoppingCart className="mr-2 h-5 w-5 text-gray-500" />
                Boutique
                <ChevronRight className="ml-auto h-4 w-4 text-gray-500" />
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <DollarSign className="mr-2 h-5 w-5 text-gray-500" />
                Finance
                <ChevronRight className="ml-auto h-4 w-4 text-gray-500" />
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <Users className="mr-2 h-5 w-5 text-gray-500" />
                Gestion
                <ChevronRight className="ml-auto h-4 w-4 text-gray-500" />
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <Image className="mr-2 h-5 w-5 text-gray-500" />
                Médias
                <ChevronRight className="ml-auto h-4 w-4 text-gray-500" />
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <BarChart2 className="mr-2 h-5 w-5 text-gray-500" />
                Rapports
                <ChevronRight className="ml-auto h-4 w-4 text-gray-500" />
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <Settings className="mr-2 h-5 w-5 text-gray-500" />
                Paramètres
                <ChevronRight className="ml-auto h-4 w-4 text-gray-500" />
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
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-semibold mb-4">Tableau de Bord</h1>
        <p>Bienvenue sur la page d'administration!</p>
      </div>
    </div>
  );
};

export default Admin;
