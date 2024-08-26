import { useNavigate } from "react-router-dom";
import useUserLoggedIn from "./useUserLoggedIn";
import { useEffect } from "react";

const useProtectedRoute = () => {
  const userLoggedIn = useUserLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [userLoggedIn, navigate]);

  return;
};

export default useProtectedRoute;
