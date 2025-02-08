import React from 'react';
import { useAuth } from './AuthContext';
import Store from './Store/Store';
import Admin from './Admin/Admin';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="App">
      {user && (user.role === 'admin' || user.role === 'staff') ? (
        <Admin />
      ) : (
        <Store />
      )}
    </div>
  );
};

export default App;
