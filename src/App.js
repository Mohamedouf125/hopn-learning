import "./App.css";
import { Header } from "./components/header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import SignUpEmail from "./pages/signUp/SignUpEmail";
import SignUpEmail2 from "./pages/signUp/SignUpEmail2";

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
      </Routes>
    </div>
  );
}

export default App;
