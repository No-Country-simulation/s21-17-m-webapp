import React from 'react';
import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom';
import Auth from '../../features/auth/pages/home';

/* 
    Se debe importar cada pagina y agregarlo dentro de <routes>, 
*/

const AppRoutes = () => {
  return (

      <Routes>
        <Route path='/' element={<Auth />} />
        
      </Routes>
  );
};

export default AppRoutes;