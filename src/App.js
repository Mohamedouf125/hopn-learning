import "./App.css";
import  Header  from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import SignUpEmail from "./pages/signUp/SignUpEmail";
import SignUpEmail2 from "./pages/signUp/SignUpEmail2";
import ForgotePasswordAddEmail from "./pages/forgotPassword/ForgotePasswordAddEmail";
import ForgotePasswordAddOTP from "./pages/forgotPassword/ForgotePasswordAddOTP";
import ForgotePasswordNewPassword from "./pages/forgotPassword/ForgotePasswordNewPassword";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Gifts from "./pages/gifts/Gifts";
import Profile from "./pages/profile/Profile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRememberedUser } from "./store/slices/user/userSlice";
import Courses from "./pages/courses/Courses";

function App() {
  const dispatch = useDispatch();

  // get user data from localstorage
  useEffect(() => {
    dispatch(getRememberedUser());
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signUp-email" element={<SignUpEmail />} />
        <Route path="/signUp-email-2" element={<SignUpEmail2 />} />
        <Route
          path="/forgotePassword-addEmail"
          element={<ForgotePasswordAddEmail />}
        />
        <Route
          path="/forgotePassword-addOTP"
          element={<ForgotePasswordAddOTP />}
        />
        <Route
          path="/forgotePassword-newPassword"
          element={<ForgotePasswordNewPassword />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
