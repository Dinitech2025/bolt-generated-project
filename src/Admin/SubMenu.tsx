import React from 'react';

interface SubMenuProps {
  isOpen: boolean;
  items: {
    label: string;
    page: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
  setActivePage: (page: string | null) => void;
  columns?: number;
}

const SubMenu: React.FC<SubMenuProps> = ({ isOpen, items, setActivePage, columns = 1 }) => {
  return isOpen ? (
    <div className="absolute left-64 top-0 bg-white border border-gray-200 rounded-md shadow-md z-10 w-64 max-h-[350px] overflow-y-auto submenu">
      <ul className="p-4">
        {items.map((item, index) => (
          <li className="mb-2" key={index}>
            <button
              onClick={() => setActivePage(item.page)}
              className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 w-full text-left"
            >
              <item.icon className="mr-3 h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default SubMenu;
