import React from 'react';
import { useAuth } from '../AuthContext';

const Admin: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-3xl font-bold mb-4">Page d'Administration</h1>
      <p>Bienvenue sur la page d'administration!</p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={logout}
      >
        Se Déconnecter
      </button>
    </div>
  );
};

export default Admin;
