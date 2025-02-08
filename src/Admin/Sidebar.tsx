import React from 'react';
import {
  Home,
  Tv,
  Monitor,
  Users2,
  User2,
  CreditCard,
  FileText,
  LogOut,
  ShoppingCart,
  DollarSign,
  User,
  Image,
  BarChart,
  Settings,
  Package,
  Wrench,
  ShoppingBag,
  Users,
  ListChecks,
  MessageSquare,
  Globe,
  Shield,
  Database,
  Truck,
  Gift,
  Gear,
} from 'lucide-react';
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

  const [isBoutiqueOpen, setIsBoutiqueOpen] = React.useState(false);
  const [isFinanceOpen, setIsFinanceOpen] = React.useState(false);
  const [isGestionOpen, setIsGestionOpen] = React.useState(false);
  const [isMédiasOpen, setIsMédiasOpen] = React.useState(false);
  const [isRapportsOpen, setIsRapportsOpen] = React.useState(false);
  const [isParamètresOpen, setIsParamètresOpen] = React.useState(false);

  const toggleBoutique = () => {
    setIsBoutiqueOpen(!isBoutiqueOpen);
  };

  const toggleFinance = () => {
    setIsFinanceOpen(!isFinanceOpen);
  };

  const toggleGestion = () => {
    setIsGestionOpen(!isGestionOpen);
  };

  const toggleMédias = () => {
    setIsMédiasOpen(!isMédiasOpen);
  };

  const toggleRapports = () => {
    setIsRapportsOpen(!isRapportsOpen);
  };

  const toggleParamètres = () => {
    setIsParamètresOpen(!isParamètresOpen);
  };

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
                        onClick={() => setActivePage('Streaming/Plateformes')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Monitor className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Plateformes</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Streaming/Comptes')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Users2 className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Comptes</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Streaming/Profils')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <User2 className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Profils</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Streaming/Offres')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <CreditCard className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Offres</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Streaming/Abonnements')}
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
            <li className="mb-2 relative">
              <button
                onClick={toggleBoutique}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <ShoppingCart className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Boutique</span>
              </button>
              {isBoutiqueOpen ? (
                <div className="absolute left-64 top-0 bg-white border border-gray-200 rounded-md shadow-md z-10">
                  <ul>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Boutique/Produits')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Package className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Produits</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Boutique/Services')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Wrench className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Services</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Boutique/Commandes')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <ShoppingBag className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Commandes</span>
                      </button>
                    </li>
                  </ul>
                </div>
              ) : null}
            </li>
            <li className="mb-2 relative">
              <button
                onClick={toggleFinance}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <DollarSign className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Finance</span>
              </button>
              {isFinanceOpen ? (
                <div className="absolute left-64 top-0 bg-white border border-gray-200 rounded-md shadow-md z-10">
                  <ul>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Finance/Factures')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <FileText className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Factures</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Finance/Dépenses')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <CreditCard className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Dépenses</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Finance/RecettesCyber')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <ShoppingCart className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Recettes Cyber</span>
                      </button>
                    </li>
                  </ul>
                </div>
              ) : null}
            </li>
            <li className="mb-2 relative">
              <button
                onClick={toggleGestion}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <User className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Gestion</span>
              </button>
              {isGestionOpen ? (
                <div className="absolute left-64 top-0 bg-white border border-gray-200 rounded-md shadow-md z-10">
                  <ul>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Gestion/Clients')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Users className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Clients</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Gestion/Employés')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Users2 className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Employés</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Gestion/Tâches')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <ListChecks className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Tâches</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Gestion/Messages')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <MessageSquare className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Messages</span>
                      </button>
                    </li>
                  </ul>
                </div>
              ) : null}
            </li>
            <li className="mb-2 relative">
              <button
                onClick={toggleMédias}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <Image className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Médias</span>
              </button>
              {isMédiasOpen ? (
                <div className="absolute left-64 top-0 bg-white border border-gray-200 rounded-md shadow-md z-10">
                  <ul>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Médias/Images')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Image className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Images</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Médias/Vidéos')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Tv className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Vidéos</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Médias/Fichiers')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <FileText className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Fichiers</span>
                      </button>
                    </li>
                  </ul>
                </div>
              ) : null}
            </li>
            <li className="mb-2 relative">
              <button
                onClick={toggleRapports}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <BarChart className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Rapports</span>
              </button>
              {isRapportsOpen ? (
                <div className="absolute left-64 top-0 bg-white border border-gray-200 rounded-md shadow-md z-10">
                  <ul>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Rapports/Journalier')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <BarChart className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Journalier</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Rapports/Hebdomadaire')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <BarChart className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Hebdomadaire</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Rapports/Mensuel')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <BarChart className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Mensuel</span>
                      </button>
                    </li>
                  </ul>
                </div>
              ) : null}
            </li>
            <li className="mb-2 relative">
              <button
                onClick={toggleParamètres}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <Settings className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Paramètres</span>
              </button>
              {isParamètresOpen ? (
                <div className="absolute left-64 top-0 bg-white border border-gray-200 rounded-md shadow-md z-10">
                  <ul>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Paramètres/Général')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Gear className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Général</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Paramètres/Boutique')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <ShoppingCart className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Boutique</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Paramètres/Paiement')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <CreditCard className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Paiement</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Paramètres/Livraison')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Truck className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Livraison</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Paramètres/Marketing')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Gift className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Marketing</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Paramètres/SEO')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Globe className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">SEO</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Paramètres/Intégrations')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Settings className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Intégrations</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Paramètres/Système')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Gear className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Système</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Paramètres/Sécurité')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Shield className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Sécurité</span>
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => setActivePage('Paramètres/Sauvegarde')}
                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
                      >
                        <Database className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Sauvegarde</span>
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
