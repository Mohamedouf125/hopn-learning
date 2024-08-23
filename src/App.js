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

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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
