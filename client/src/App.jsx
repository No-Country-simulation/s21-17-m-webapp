import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './app/routes/routes';
import NavBar from './features/auth/components/navBar';
import { Toaster } from './shared/components/toaster';
import Footer from './shared/components/Footer';

function App() {
  return (
    <Router >
      <NavBar />
      <AppRoutes />  
      <Toaster />
      <footer>
        <Footer />
      </footer>    
    </Router>
  );
};

export default App;

