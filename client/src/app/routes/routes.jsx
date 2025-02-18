import React from 'react';
import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom';
import Home from '../../features/auth/pages/home';

/* 
    Se debe importar cada pagina y agregarlo dentro de <routes>, 
*/

const AppRoutes = () => {
  return (

      <Routes>
        <Route path='/' element={<Home />} />
        
      </Routes>
  );
};

export default AppRoutes;