import React, { useRef, useEffect } from 'react';
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
  Cog
} from 'lucide-react';
import { useAuth } from '../AuthContext';
import SubMenu from './SubMenu';

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

  const [openSubMenu, setOpenSubMenu] = React.useState<string | null>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);

  const toggleSubMenu = (menuName: string) => {
    setOpenSubMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (subMenuRef.current && !subMenuRef.current.contains(event.target as Node)) {
      setOpenSubMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const streamingVODItems = [
    { label: 'Plateformes', page: 'Streaming/Plateformes', icon: Monitor },
    { label: 'Comptes', page: 'Streaming/Comptes', icon: Users2 },
    { label: 'Profils', page: 'Streaming/Profils', icon: User2 },
    { label: 'Offres', page: 'Streaming/Offres', icon: CreditCard },
    { label: 'Abonnements', page: 'Streaming/Abonnements', icon: FileText },
  ];

  const boutiqueItems = [
    { label: 'Produits', page: 'Boutique/Produits', icon: Package },
    { label: 'Services', page: 'Boutique/Services', icon: Wrench },
    { label: 'Commandes', page: 'Boutique/Commandes', icon: ShoppingBag },
  ];

  const financeItems = [
    { label: 'Factures', page: 'Finance/Factures', icon: FileText },
    { label: 'Dépenses', page: 'Finance/Dépenses', icon: CreditCard },
    { label: 'Recettes Cyber', page: 'Finance/RecettesCyber', icon: ShoppingCart },
  ];

  const gestionItems = [
    { label: 'Clients', page: 'Gestion/Clients', icon: Users },
    { label: 'Employés', page: 'Gestion/Employés', icon: Users2 },
    { label: 'Tâches', page: 'Gestion/Tâches', icon: ListChecks },
    { label: 'Messages', page: 'Gestion/Messages', icon: MessageSquare },
  ];

  const médiasItems = [
    { label: 'Images', page: 'Médias/Images', icon: Image },
    { label: 'Vidéos', page: 'Médias/Vidéos', icon: Tv },
    { label: 'Fichiers', page: 'Médias/Fichiers', icon: FileText },
  ];

  const rapportsItems = [
    { label: 'Journalier', page: 'Rapports/Journalier', icon: BarChart },
    { label: 'Hebdomadaire', page: 'Rapports/Hebdomadaire', icon: BarChart },
    { label: 'Mensuel', page: 'Rapports/Mensuel', icon: BarChart },
  ];

  const paramètresItems = [
    { label: 'Général', page: 'Paramètres/Général', icon: Cog },
    { label: 'Boutique', page: 'Paramètres/Boutique', icon: ShoppingCart },
    { label: 'Paiement', page: 'Paramètres/Paiement', icon: CreditCard },
    { label: 'Livraison', page: 'Paramètres/Livraison', icon: Truck },
    { label: 'Marketing', page: 'Paramètres/Marketing', icon: Gift },
    { label: 'SEO', page: 'Paramètres/SEO', icon: Globe },
    { label: 'Intégrations', page: 'Paramètres/Intégrations', icon: Settings },
    { label: 'Système', page: 'Paramètres/Système', icon: Cog },
    { label: 'Sécurité', page: 'Paramètres/Sécurité', icon: Shield },
    { label: 'Sauvegarde', page: 'Paramètres/Sauvegarde', icon: Database },
  ];

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
                onClick={() => toggleSubMenu('streamingVOD')}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <Tv className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Streaming VOD</span>
              </button>
              <SubMenu
                isOpen={openSubMenu === 'streamingVOD'}
                items={streamingVODItems}
                setActivePage={setActivePage}
              />
            </li>
            <li className="mb-2 relative" ref={subMenuRef}>
              <button
                onClick={() => toggleSubMenu('boutique')}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <ShoppingCart className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Boutique</span>
              </button>
              <SubMenu
                isOpen={openSubMenu === 'boutique'}
                items={boutiqueItems}
                setActivePage={setActivePage}
              />
            </li>
            <li className="mb-2 relative">
              <button
                onClick={() => toggleSubMenu('finance')}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <DollarSign className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Finance</span>
              </button>
              <SubMenu
                isOpen={openSubMenu === 'finance'}
                items={financeItems}
                setActivePage={setActivePage}
              />
            </li>
            <li className="mb-2 relative">
              <button
                onClick={() => toggleSubMenu('gestion')}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <User className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Gestion</span>
              </button>
              <SubMenu
                isOpen={openSubMenu === 'gestion'}
                items={gestionItems}
                setActivePage={setActivePage}
              />
            </li>
            <li className="mb-2 relative">
              <button
                onClick={() => toggleSubMenu('médias')}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <Image className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Médias</span>
              </button>
              <SubMenu
                isOpen={openSubMenu === 'médias'}
                items={médiasItems}
                setActivePage={setActivePage}
              />
            </li>
            <li className="mb-2 relative">
              <button
                onClick={() => toggleSubMenu('rapports')}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <BarChart className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Rapports</span>
              </button>
              <SubMenu
                isOpen={openSubMenu === 'rapports'}
                items={rapportsItems}
                setActivePage={setActivePage}
              />
            </li>
            <li className="mb-2 relative">
              <button
                onClick={() => toggleSubMenu('paramètres')}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
              >
                <Settings className="mr-3 h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Paramètres</span>
              </button>
              <SubMenu
                isOpen={openSubMenu === 'paramètres'}
                items={paramètresItems}
                setActivePage={setActivePage}
                columns={2}
              />
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
