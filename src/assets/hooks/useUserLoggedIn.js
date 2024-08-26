import Cookies from "universal-cookie";

const useUserLoggedIn = () => {
  const cookies = new Cookies(null, { path: "/" });
  if (localStorage.getItem("user") && cookies.get("token")) {
    return true;
  } else {
    return false;
  }
};

export default useUserLoggedIn;
