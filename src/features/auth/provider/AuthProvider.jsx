import * as authService from "../services/authService";
import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const setAuth = (user) => {
    setUser(user);
    setIsLoggedIn(!!user);
  };

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await authService.status();
        setAuth(res.data.user);
      } catch {
        setAuth(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
  }, [isLoggedIn]);

  const contextValue = useMemo(
    () => ({ isLoggedIn, isLoading, user, setAuth, setIsLoading }),
    [isLoggedIn, isLoading, user],
  );
  return <AuthContext value={contextValue}>{children}</AuthContext>;
};

export { AuthProvider };
