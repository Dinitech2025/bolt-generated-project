import React from 'react';
import { Home, Tv, Monitor, Users2, User2, CreditCard, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../AuthContext';

interface SidebarProps {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
  setActivePage: (page: string | null) => void;
  toggleStreamingVOD: () => void;
  isStreamingVODOpen: boolean;
  streamingVODRef: React.RefObject<HTMLDivElement>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarExpanded,
  toggleSidebar,
  setActivePage,
  toggleStreamingVOD,
  isStreamingVODOpen,
  streamingVODRef,
}) => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col border-r border-gray-200 w-64 bg-white h-screen bg-gray-100">
      <div className="flex-shrink-0 bg-white border-r border-gray-200 w-64 transition-width duration-300 transform">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <span className="text-2xl font-semibold text-blue-500">DINITECH</span>
        </div>

        <nav className="p-4">
          <ul>
            <li className="mb-2">
              <button
                onClick={() => setActivePage(null)}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <Home className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Tableau de Bord</span>
              </button>
            </li>
            <li className="mb-2 relative" ref={streamingVODRef}>
              <button
                onClick={toggleStreamingVOD}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <Tv className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Streaming VOD</span>
              </button>
              {isStreamingVODOpen ? (
                <div className="absolute left-64 top-0 bg-white border border-gray-200 rounded-md shadow-md z-10">
                  <ul>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('plateformes')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Monitor className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Plateformes</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('comptes')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Users2 className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Comptes</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('profils')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <User2 className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Profils</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('offres')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <CreditCard className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Offres</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('abonnements')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <FileText className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Abonnements</span>
                      </button>
                    </li>
                  </ul>
                </div>
              ) : null}
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <button
          onClick={logout}
          className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
        >
          <LogOut className="mr-3 h-5 w-5 text-red-500" />
          <span className="text-sm font-medium text-red-700">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
