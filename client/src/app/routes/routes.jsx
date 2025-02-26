import React from 'react';
import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom';
import Home from '../../features/home/pages/home';
import Cart from '../../features/cart/pages/Cart';
import { Profile } from '../../features/profile/pages/Profile';
import AboutUs from "../../features/aboutUs/pages/abutUs";
import Policy from '../../features/polyci/pages/policy';

/* 
    Se debe importar cada pagina y agregarlo dentro de <routes>, 
*/

const AppRoutes = () => {
  return (

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/aboutUs' element={<AboutUs />}/>
        <Route path='/policy' element={<Policy />}/>
      </Routes>
  );
};

export default AppRoutes;