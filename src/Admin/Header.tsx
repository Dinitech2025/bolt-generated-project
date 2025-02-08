import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarExpanded, toggleSidebar }) => {
  return (
    <>
      <button
        className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none absolute top-4 left-4 z-10"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>
      {!isSidebarExpanded ? (
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <span className="text-2xl font-bold text-blue-500">DINITECH</span>
        </div>
      ) : null}
    </>
  );
};

export default Header;
