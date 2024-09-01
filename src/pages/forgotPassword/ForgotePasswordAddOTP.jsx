import OTPInput from "react-otp-input";
import img1 from "../../assets/images/authImages/Forgot password.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotePasswordAddOTP = () => {
  const [code, setCode] = useState("");
  const Navigate = useNavigate()

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
              Forgot your password
            </h2>
          </div>

          <div
            className={`flex flex-col justify-start items-start gap-2.5 w-full mt-14`}
          >
            <div
              className={`flex flex-col justify-center items-center gap-2.5 w-full`}
            >
              {/* OTP */}
              <h1 className={`text-[20px] text-black font-[600]`}>Enter OTP</h1>
              <span className={`text-[13px] text-[#575757] font-[500] mb-5`}>
                A 4-digit code has been sent to your email
              </span>
              <OTPInput
                value={code}
                onChange={(code) => setCode(code)}
                numInputs={4}
                renderInput={(props) => <input {...props} />}
                renderSeparator={<span style={{ width: "15px" }}></span>}
                isInputNum={true}
                shouldAutoFocus={true}
                inputStyle={{
                  borderRadius: "8px",
                  backgroundColor: "#E3E3E3",
                  width: "54px",
                  height: "54px",
                  fontSize: "12px",
                  color: "#000",
                  fontWeight: "400",
                  caretColor: "blue",
                  outline: "none",
                }}
                focusStyle={{
                  outline: "none",
                }}
              />
            </div>
          </div>
          <div
            className={`flex justify-end items-center w-full py-[16px] mt-[50px] bg-[#075178] rounded-[20px] cursor-pointer`}
          >
            <div
              className={`text-center text-white text-[16px] font-[Poppins] font-medium leading-[24px] w-full`}
              onClick={() => {
                Navigate(`/forgotePassword-newPassword`);
              }}
            >
              Send Code
            </div>
          </div>
          <div
            className={`w-full text-center mt-10 flex items-center justify-center`}
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
          className={`flex flex-col justify-center order-1 md:order-2 items-center overflow-hidden rounded-[40px] w-full md:w-[45%] min-h-[190px] md:min-h-[750px] px-5 max-w-[597px]`}
        >
          <div
            className={`w-full min-h-[190px] md:min-h-[750px] flex items-center justify-center`}
          >
            <img src={img1} alt="signUp" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotePasswordAddOTP;
