import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';

const Admin: React.FC = () => {
  const { logout } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isStreamingVODOpen, setIsStreamingVODOpen] = useState(false);
  const [activePage, setActivePage] = useState<string | null>(null);

  const streamingVODRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (streamingVODRef.current?.contains(event.target as Node) !== true) {
        setIsStreamingVODOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [streamingVODRef]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const toggleStreamingVOD = () => {
    setIsStreamingVODOpen(!isStreamingVODOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Header isSidebarExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />

      {isSidebarExpanded ? (
        <Sidebar
          isSidebarExpanded={isSidebarExpanded}
          toggleSidebar={toggleSidebar}
          setActivePage={setActivePage}
          toggleStreamingVOD={toggleStreamingVOD}
          isStreamingVODOpen={isStreamingVODOpen}
          streamingVODRef={streamingVODRef}
        />
      ) : null}

      <div className={`flex-1 p-4 ${!isSidebarExpanded ? 'w-full' : ''}`}>
        <Dashboard activePage={activePage} />
      </div>
    </div>
  );
};

export default Admin;
