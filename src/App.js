import "./App.css";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
// import SignUp from "./pages/signUp/SignUp";
// import SignUpEmail from "./pages/signUp/SignUpEmail";
// import SignUpEmail2 from "./pages/signUp/SignUpEmail2";
// import ForgotePasswordAddEmail from "./pages/forgotPassword/ForgotePasswordAddEmail";
// import ForgotePasswordAddOTP from "./pages/forgotPassword/ForgotePasswordAddOTP";
// import ForgotePasswordNewPassword from "./pages/forgotPassword/ForgotePasswordNewPassword";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
// import Gifts from "./pages/gifts/Gifts";
import Profile from "./pages/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRememberedUser } from "./store/slices/user/userSlice";
import Courses from "./pages/courses/Courses";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingWhatsapp from "./components/whatsappicon/FloatingWhatsapp";
import Course from "./pages/courses/Course";
// import Setting from "./pages/setting/Setting";
import { getCurrentLang } from "./store/slices/settings/settingsSlice";
// import UserProfile from "./pages/profile/UserProfile";
import About from "./pages/about/About";
import NotFound from "./pages/404/NotFound";
import Cvs from "./pages/cvs/Cvs";
import Trainers from "./pages/trainers/Trainers";
import Academy from "./pages/academy/Academy";
import AcademyDetails from "./pages/academy/AcademyDetails";
import Lecturers from "./pages/Lecturers/Lecturers";
import JobOpportunities from "./pages/JobOpportunities/JobOpportunities";

function App() {
  const dispatch = useDispatch();

  // Fetch the current language from Redux
  const { lang } = useSelector((state) => state.settings);

  // Load user data and language settings from local storage
  useEffect(() => {
    dispatch(getRememberedUser());
    dispatch(getCurrentLang());
  }, [dispatch]);



  return (
    <div
      className={`${
        lang === "ar" ? "rtl" : "ltr"
      } !font-["Poppins"] rtl:!font-["Tajawal"]`}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/gifts" element={<Gifts />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/course/:courseId" element={<Course />} />
        <Route path="/cvs" element={<Cvs />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/academy/:academyId" element={<AcademyDetails />} />
        <Route path="/lecturers" element={<Lecturers />} />
        <Route path="/jobOpportunities" element={<JobOpportunities />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/user/profile/:userId" element={<UserProfile />} /> */}
        {/* <Route path="/signUp" element={<SignUp />} /> */}
        {/* <Route path="/settings" element={<Setting />} /> */}
        {/* <Route path="/signUp-email" element={<SignUpEmail />} />
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
        /> */}
      </Routes>
      <FloatingWhatsapp />
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
