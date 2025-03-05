import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "AuthProvider.jsx"; 

const PrivateRoute = ({ element, ...rest }) => {
  const { token } = useAuth(); 

  return (
    <Route
      {...rest}
      element={
        token ? (
          element 
        ) : (
          <Navigate to="/" /> 
        )
      }
    />
  );
};

export default PrivateRoute;
