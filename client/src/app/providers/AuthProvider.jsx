import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(localStorage.getItem("userType") || null);

  const login = (userData) => {
    setUserType(userData.user.type);
    
    localStorage.setItem("userType", userData.user.type);
  };

  const logout = () => {
    setUserType(null);
    localStorage.removeItem("userType");
  };

  return (
    <AuthContext.Provider value={{ userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
