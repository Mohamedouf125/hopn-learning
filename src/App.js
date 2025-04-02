import "./App.css";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Profile from "./pages/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRememberedUser } from "./store/slices/user/userSlice";
import Courses from "./pages/courses/Courses";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingWhatsapp from "./components/whatsappicon/FloatingWhatsapp";
import Course from "./pages/courses/Course";
import { getCurrentLang } from "./store/slices/settings/settingsSlice";
import About from "./pages/about/About";
import NotFound from "./pages/404/NotFound";
import Cvs from "./pages/cvs/Cvs";
import Academy from "./pages/academy/Academy";
import AcademyDetails from "./pages/academy/AcademyDetails";
import Lecturers from "./pages/Lecturers/Lecturers";
import JobOpportunities from "./pages/JobOpportunities/JobOpportunities";
import Trainees from "./pages/trainees/Trainees";
import Trainers from "./pages/trainers/Trainers";
import Trainer from "./pages/trainers/Trainer";
import Setting from "./pages/setting/Setting";
import SignUpEmail2 from "./pages/signUp/SignUpEmail2";
import SignUpEmail from "./pages/signUp/SignUpEmail";
import SignUp from "./pages/signUp/SignUp";
import ForgotePasswordAddEmail from "./pages/forgotPassword/ForgotePasswordAddEmail";
import ForgotePasswordAddOTP from "./pages/forgotPassword/ForgotePasswordAddOTP";
import ForgotePasswordNewPassword from "./pages/forgotPassword/ForgotePasswordNewPassword";
import Lecture from "./pages/Lecturers/Lecture";
import JobSeekers from "./pages/jobSeekers/JobSeekers";

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
        <Route path="/trainees" element={<Trainees />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/course/:courseId" element={<Course />} />
        <Route path="/cvs" element={<Cvs />} />
        <Route path="/job-seekers" element={<JobSeekers />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/academy/:academyId" element={<AcademyDetails />} />
        <Route path="/lecturers" element={<Lecturers />} />
        <Route path="/lecture/:lectureId" element={<Lecture />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/trainers/trainer/:trainerID" element={<Trainer />} />
        <Route path="/jobOpportunities" element={<JobOpportunities />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/user/profile/:userId" element={<UserProfile />} /> */}
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/settings" element={<Setting />} />
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
      <FloatingWhatsapp />
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
