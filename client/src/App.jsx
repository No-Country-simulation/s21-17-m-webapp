import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './app/routes/routes';
import NavBar from './features/auth/components/navBar';

function App() {
  return (
    <Router >
      <NavBar />
      <AppRoutes />      
    </Router>
  );
};

export default App;

