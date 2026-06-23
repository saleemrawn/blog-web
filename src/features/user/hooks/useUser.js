import * as userService from "../services/userService";
import { useState } from "react";
import { useNavigate } from "react-router";

const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const createUser = async ({ firstName, lastName, username, password }) => {
    setIsLoading(true);
    setError(null);

    try {
      await userService.createUser({ firstName, lastName, username, password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response);
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => setError(null);

  return { createUser, isLoading, error, resetError };
};

export { useCreateUser };
