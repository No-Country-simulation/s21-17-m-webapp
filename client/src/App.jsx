import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './app/routes/routes';

function App() {
  return (
    <Router >
      <AppRoutes />      
    </Router>
  );
};

export default App;

