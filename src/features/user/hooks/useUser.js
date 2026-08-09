import * as userService from "../services/userService";
import toast from "react-hot-toast";
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
      const errDetails = getErrorDetails(err);
      setError(errDetails);
      toast.error(
        `${errDetails?.message} ${errDetails?.code ? `(${errDetails?.code})` : ""}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => setError(null);

  return { createUser, isLoading, error, resetError };
};

export { useCreateUser };
