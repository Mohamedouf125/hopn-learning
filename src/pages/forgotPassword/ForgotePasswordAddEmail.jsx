import img1 from "../../assets/images/authImages/Forgot password.png";

import { Link, useNavigate } from "react-router-dom";

const ForgotePasswordAddEmail = () => {
    const navigate = useNavigate()
  return (
    <div
      className={`flex items-center justify-between py-0 px-[40px] container mx-auto mt-8 mb-20`}
    >
      <div
        className={`flex flex-col justify-start items-start p-10 pt-10 pb-0 w-[45%] max-w-[609px] min-h-[750px]`}
      >
        <div className={`w-full`}>
          <h4
            className={`font-[Poppins] text-[21px] font-normal leading-[31.5px] text-left text-black`}
          >
            Welcome to
            <span className={`font-semibold text-[#779341]`}> SPORTS IN</span>
          </h4>
          <h2
            className={`font-[Poppins] text-[40px] font-medium leading-[82.5px] text-left text-black`}
          >
            Forgot your password
          </h2>
        </div>

        <div
          className={`flex flex-col justify-start items-start gap-2.5 w-full mt-20`}
        >
          <div
            className={`flex flex-col justify-start items-start gap-2.5 w-full`}
          >
            {/* email */}
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
                type="emial"
                placeholder="Enter your email address"
                className={`w-full border-none outline-none text-[16px] font-[Poppins] font-normal`}
              />
            </div>
          </div>
        </div>
        <div
          className={`flex justify-end items-center w-full py-[16px] mt-[50px] bg-[#075178] rounded-[20px] cursor-pointer`}
        >
          <div
            className={`text-center text-white text-[16px] font-[Poppins] font-medium leading-[24px] w-full`}
            onClick={()=> navigate(`/forgotePassword-addOTP`)}
          >
            Send Code
          </div>
        </div>
        <div
          className={`w-full text-center mt-16 flex items-center justify-center`}
        >
          <span
            className={`text-[#858494] text-[14px] font-[Poppins] font-normal`}
          >
            Already have an account?
          </span>
          <Link to={`/login`}>
            <span className="text-[#075178] text-[14px] font-[Poppins] font-medium cursor-pointer">
              Login
            </span>
          </Link>
        </div>
      </div>

      {/* ///////////// */}
      <div
        className={`flex justify-center items-center overflow-hidden w-[50%] min-h-[750px]`}
      >
        <div
          className={`w-full min-h-[750px] flex items-start justify-center`}
        >
          <img src={img1} alt="signUp" />
        </div>
      </div>
    </div>
  );
};

export default ForgotePasswordAddEmail;
