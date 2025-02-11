import React from 'react';
import { useAuth } from './AuthContext';
import Store from './Store/Store';
import Admin from './Admin/Admin';

const App: React.FC = () => {
  const { user } = useAuth();
  console.log("Current user in App:", user);

  return (
    <div className="App">
      {user && (user.role === 'admin' || user.role === 'staff') ? ( // Keep role check for now, adjust role logic later
        <Admin />
      ) : (
        <Store />
      )}
    </div>
  );
};

export default App;
