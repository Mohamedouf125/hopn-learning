import React, { useState, useEffect, useRef } from "react";
import logoIcon from "../../assets/images/logo/logoIcon.png";
import logoTitle from "../../assets/images/logo/logoTitle.png";
import googleIcon from "../../assets/images/icons/googleIcon.png";
import img1 from "../../assets/images/authImages/authBg.png";
import img2 from "../../assets/images/authImages/authBg-2.jpg";
import img3 from "../../assets/images/authImages/authBg-3.jpg";
import img4 from "../../assets/images/authImages/authBg-4.jpg";
import img5 from "../../assets/images/authImages/authBg-5.jpg";
import { Link, useNavigate } from "react-router-dom";
import server from "../../assets/axios/server";
import { useDispatch } from "react-redux";
import { rememberUser, setUser } from "../../store/slices/user/userSlice";

const Login = () => {
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handelLgin = () => {
    server
      .post("/login-api", logindata)
      .then((data) => {
        dispatch(
          setUser({ user: data.data.data.user, token: data.data.data.token })
        );
        dispatch(
          rememberUser({
            user: data.data.data.user,
            token: data.data.data.token,
          })
        );
        setLoginData({
          email: "",
          password: "",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const welcomeSlides = [
    {
      header: "Welcome to Sports In!",
      description: "Unlock your potential. Start your sports journey today!",
      image: img1,
    },
    {
      header: "Join the Community!",
      description: "Connect with fellow sports enthusiasts and stay motivated.",
      image: img2,
    },
    {
      header: "Track Your Progress!",
      description: "Monitor your performance and achieve your fitness goals.",
      image: img3,
    },
    {
      header: "Get Expert Advice!",
      description: "Learn from the best with our curated sports articles.",
      image: img4,
    },
    {
      header: "Get Expert Advice!",
      description: "Learn from the best with our curated sports articles.",
      image: img5,
    },
  ];

  const [slider, setSlider] = useState(0);
  const overlayRref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => {
        setSlider((prevSlider) =>
          prevSlider >= welcomeSlides.length - 1 ? 0 : prevSlider + 1
        );
      }, 1000); // Duration of slide-out effect
    }, 5000);

    return () => clearInterval(interval);
  }, [welcomeSlides.length]);

  useEffect(() => {
    if (overlayRref.current) {
      overlayRref.current.style.backgroundImage = `url(${welcomeSlides[slider].image})`;
    }
  }, [slider]);

  return (
    <main className="container flex items-center justify-center mx-auto">
      <div
        className={`flex items-start justify-between flex-col md:flex-row py-0 md:px-[40px] container mx-auto mt-8 mb-20`}
      >
        <div
          className={`flex flex-col order-2 md:order-1 justify-start items-start p-10 pt-10 pb-0 w-full md1:w-[45%] max-w-[609px] min-h-[750px]`}
        >
          <div className={`w-full`}>
            <h4
              className={`font-[Poppins] text-[14px] md:text-[21px] font-normal leading-[31.5px] text-left text-black`}
            >
              Welcome to
              <span className={`font-semibold text-[#779341]`}> SPORTS IN</span>
            </h4>
            <h2
              className={`font-[Poppins] text-[20px] md;text-[55px] font-medium leading-[82.5px] text-left text-black`}
            >
              Sign in
            </h2>
          </div>
          <div
            className={`flex justify-center items-center w-full cursor-pointer py-6`}
          >
            <div
              className={`flex justify-center items-center gap-2 w-full mx-auto bg-[#e9f1ff] rounded-[20px] py-[15px]`}
            >
              <img
                className={`w-[26px] flex-shrink-0 flex-grow-0`}
                src={googleIcon}
                alt="Google"
              />
              <div
                className={`text-[#4285f4] text-[16px] font-[Poppins] font-normal`}
              >
                Sign in with Google
              </div>
            </div>
          </div>
          <div
            className={`flex justify-center items-center gap-2.5 w-full py-6`}
          >
            <div className={`w-[35%] border-b border-[#e6e6e6]`} />
            <div
              className={`text-center text-[#858494] text-[16px] font-[Poppins] font-normal`}
            >
              OR
            </div>
            <div className={`w-[35%] border-b border-[#e6e6e6]`} />
          </div>
          <div
            className={`flex flex-col justify-start items-start gap-2.5 w-full`}
          >
            <div
              className={`flex flex-col justify-start items-start gap-2.5 w-full`}
            >
              <div
                className={`flex justify-start items-center gap-4 w-full py-[13px] px-[16px] border-2 border-[#efeefc] rounded-[20px]`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_110_22)">
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="#075178"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="#075178"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_110_22">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) =>
                    setLoginData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className={`w-full border-none outline-none text-[16px] font-[Poppins] font-normal`}
                />
              </div>
              <div
                className={`flex justify-start items-center gap-4 w-full py-[13px] px-[16px] border-2 border-[#efeefc] rounded-[20px]`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_70_626)">
                    <path
                      d="M17 11H7C5.89543 11 5 11.8954 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8954 18.1046 11 17 11Z"
                      stroke="#075178"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                      stroke="#075178"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11"
                      stroke="#075178"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_70_626">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className={`w-full border-none outline-none text-[16px] font-[Poppins] font-normal`}
                />
              </div>
            </div>
            <div
              className={`self-stretch text-right text-[#075178] text-[14px] font-[Poppins] font-medium cursor-pointer`}
              onClick={() => navigate(`/forgotePassword-addEmail`)}
            >
              Forgot Password?
            </div>
          </div>
          <div
            className={`flex justify-center items-center w-full py-[16px] mt-[50px] bg-[#075178] rounded-[20px] cursor-pointer`}
          >
            <button
              onClick={handelLgin}
              className={`text-center border-none outline-none text-white text-[16px] font-[Poppins] font-medium leading-[24px] w-full`}
            >
              Login
            </button>
          </div>
          <div
            className={`w-full text-center mt-16 flex items-center justify-center`}
          >
            <span
              className={`text-[#858494] text-[14px] font-[Poppins] font-normal`}
            >
              Don’t have an account?
            </span>
            <Link to={`/signUp`}>
              <span className="text-[#075178] text-[14px] font-[Poppins] font-medium cursor-pointer">
                Sign up
              </span>
            </Link>
          </div>
        </div>

        {/* ///////// */}
        <div
          className={`flex flex-col justify-center items-center order-1 md:order-2 overflow-hidden rounded-[40px] w-full md:w-[45%] min-h-[190px] md:min-h-[750px] px-5 max-w-[597px]`}
        >
          <div
            ref={overlayRref}
            style={{
              backgroundImage: `url(${welcomeSlides[slider].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className={` flex flex-col justify-center items-center gap-2.5 overflow-hidden relative rounded-[20px] w-full min-h-[190px] md:min-h-[750px] bg-center bg-cover transition-all ease-in-out duration-1000 shadow-[0px_3px_4px_rgba(0,0,0,0.03)]`}
          >
            <div
              className={`flex justify-center items-center gap-5 w-full py-2 md:py-0`}
            >
              <img className="w-[25px] md:w-auto" src={logoIcon} alt="Logo" />
              <img className="w-[58px] md:w-auto" src={logoTitle} alt="Logo" />
            </div>
            <div className={`relative flex justify-center items-center w-full`}>
              {welcomeSlides.map((slide, index) => {
                return (
                  <div
                    key={index}
                    className={
                      slider === index
                        ? `flex flex-col justify-center items-center gap-2.5 bg-white/90 py-5 rounded-[20px] overflow-hidden w-[90%] md:w-[75%] mx-auto py-7.5 px-[30px] showWelcomeBox`
                        : `flex flex-col justify-center items-center gap-2.5 bg-white/90 py-5 rounded-[20px] overflow-hidden w-[90%] md:w-[75%] mx-auto py-7.5 px-[30px] hideWelcomeBox`
                    }
                  >
                    <h1
                      className={`font-[Tajawal] text-[15px] md:text-[19.45px] font-bold leading-[27px] tracking-[-0.98px] text-center text-[#212529]`}
                    >
                      {slide.header}
                    </h1>
                    <p
                      className={`font-[Tajawal] text-[10px] md:text-[14px] font-normal leading-[26px] text-center text-[#777777]`}
                    >
                      {slide.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <div
              className={`flex justify-center items-center gap-1.75 my-2 md:mt-5 w-full gap-2`}
            >
              {welcomeSlides.map((_, index) => (
                <div
                  key={index}
                  className={
                    slider === index
                      ? `cursor-pointer w-[20px] h-[10px] rounded-md bg-[#075178] transition-all ease duration-200`
                      : `cursor-pointer w-[10px] h-[10px] rounded-full bg-[#e0e0e0] transition-all ease duration-300`
                  }
                  onClick={() => setSlider(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
