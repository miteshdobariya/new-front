import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("loginnn"));

  useEffect(() => {
    // setIsLoggedIn(!!localStorage.getItem("loginnn"));
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const login = () => {
    localStorage.setItem("loginnn", "done");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("loginnn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;




