import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(localStorage.getItem("userType") || null);
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);

  const login = (userData) => {
    setToken(userData.token);
    setUserType(userData.user.type);
    
    sessionStorage.setItem("token", userData.token);
    localStorage.setItem("userType", userData.user.type);
  };

  const logout = () => {
    setToken(null);
    setUserType(null);
    sessionStorage.removeItem("token");
    localStorage.removeItem("userType");
  };

  return (
    <AuthContext.Provider value={{ userType, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
