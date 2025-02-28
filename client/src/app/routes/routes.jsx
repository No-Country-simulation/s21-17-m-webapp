import React from 'react';
import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom';
import Home from '../../features/home/pages/home';
import Cart from '../../features/cart/pages/Cart';
import AboutUs from "../../features/aboutUs/pages/abutUs";
import Policy from '../../features/polyci/pages/policy';
import { Artisans } from '../../features/artisans/pages/Artisans';
import Product from '../../features/products/pages/product';

/* 
    Se debe importar cada pagina y agregarlo dentro de <routes>, 
*/

const AppRoutes = () => {
  return (
    <ProductProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />}/>
        <Route path='/aboutUs' element={<AboutUs />}/>
        <Route path='/policy' element={<Policy />}/>
        <Route path='/artisans' element={<Artisans />} />
        <Route path='/product/:id' element={<Product />}/>
      </Routes>
    </ProductProvider>
  );
};

export default AppRoutes;