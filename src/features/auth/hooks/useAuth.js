import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../";
import { getErrorDetails } from "../../../httpErrors";
import * as authService from "../services/authService";
import toast from "react-hot-toast";

const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async ({ username, password }) => {
    setIsLoading(true);
    setError(null);

    try {
      const user = await authService.login({ username, password });
      setAuth(user);
      navigate(-1, { replace: true });
      toast.success("Login successful");
    } catch (err) {
      setError(err.response);
      const error = getErrorDetails(err);
      toast.error(`${error.message} (${error.code})`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => setError(null);

  return { login, isLoading, error, resetError };
};

const useLogout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.logout();
      setAuth(null);
      navigate("/", { replace: true });
      toast.success("Logout successful");
    } catch (err) {
      setError(err);
      const error = getErrorDetails(err);
      toast.error(`${error.message} (${error.code})`);
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};

export { useLogin, useLogout };
