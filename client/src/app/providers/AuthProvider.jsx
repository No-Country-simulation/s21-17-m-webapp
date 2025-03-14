import { createContext, useContext, useState, useEffect } from "react";
import { useArtisanContext } from "../../features/profile/store/ArtisanContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [userType, setUserType] = useState(
    localStorage.getItem("userType") || null
  );
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const { resetArtisan } = useArtisanContext();

  useEffect(() => {
    if (!user || !userType || !token) {
      logout();
    }
  }, [token, user, userType]);

  const login = (userData) => {
    setToken(userData.token);
    setUser(userData.user);
    setUserType(userData.user.artisan ? "artisan" : "common");

    sessionStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem(
      "userType",
      userData.user.artisan ? "artisan" : "common"
    );
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserType(null);
    resetArtisan();
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
  };

  return (
    <AuthContext.Provider value={{ user, userType, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
