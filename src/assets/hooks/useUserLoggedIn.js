import React from "react";
import { useSelector } from "react-redux";

const useUserLoggedIn = () => {
  const user = useSelector((state) => state.user);
  if (user.isLoggedIn && user.token !== "") {
    return true;
  } else {
    return false;
  }
};

export default useUserLoggedIn;
