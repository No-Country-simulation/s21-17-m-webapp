import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../features/home/pages/home";
import Cart from "../../features/cart/pages/Cart";
import AboutUs from "../../features/aboutUs/pages/abutUs";
import Policy from "../../features/polyci/pages/policy";
import { Artisans } from "../../features/artisans/pages/Artisans";
import Product from "../../features/products/pages/product";
import { Artisan } from "../../features/artisans/pages/Artisan";
import { Profile } from "../../features/profile/pages/Profile";
import PrivateRoute from "../providers/PrivateRoute";
import Favorites from "../../features/products/pages/favorites";
import { Sales } from "../../features/orders/pages/Sales";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/artisans" element={<Artisans />} />
      <Route path="/artisan/:id" element={<Artisan />} />
      <Route path="/product/:id" element={<Product />} />
      {/* Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        {/* Aquí se agregan el resto de rutas privadas */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/sales" element={<Sales />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
