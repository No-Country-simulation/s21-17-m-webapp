import React from 'react';
import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom';
import Auth from '../../features/auth/pages/home';
import Cart from '../../features/cart/pages/Cart';
import { Profile } from '../../features/profile/pages/Profile';

/* 
    Se debe importar cada pagina y agregarlo dentro de <routes>, 
*/

const AppRoutes = () => {
  return (

      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/cart' element={<Cart />}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
  );
};

export default AppRoutes;