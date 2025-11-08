import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  // Estado para controlar qué componente mostrar
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="App">
      <h1>Sistema de Autenticación</h1>
      {showLogin ? (
        <Login onSwitchToRegister={() => setShowLogin(false)} />
      ) : (
        <Register onSwitchToLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default App;