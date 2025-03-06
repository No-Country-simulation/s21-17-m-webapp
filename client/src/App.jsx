import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './app/routes/routes';
import NavBar from './features/auth/components/navBar';
import { Toaster } from './shared/components/toaster';

function App() {
  return (
    <Router >
      <NavBar />
      <AppRoutes />  
      <Toaster />    
    </Router>
  );
};

export default App;

