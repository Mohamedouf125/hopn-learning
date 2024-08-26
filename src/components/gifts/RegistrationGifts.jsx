import { useDispatch, useSelector } from "react-redux";
import FullPagePopup from "../popups/FullPagePopup";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import courceImg from "../../assets/images/home/courceImg.png";
import avatar from "../../assets/images/icons/avatar.png";
import { useEffect, useState } from "react";
import server from "../../assets/axios/server";
import { oldAccount } from "../../store/slices/user/userSlice";

const RegistrationGifts = () => {
  const user = useSelector((state) => state.user);
  const { defaultStars } = useSelector((state) => state.ratingStars);
  const dispatch = useDispatch();
  const [phase, setPhase] = useState(1);
  const [gifts, setGifts] = useState([]);
  const [choosedGift, setChooosedGift] = useState(1);

  useEffect(() => {
    server
      .get("/courses-api/registrationdgf")
      .then((data) => {
        setGifts(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(gifts);

  return (
    <>
      <FullPagePopup>
        <div className="bg-white mt-20 rounded-lg overflow-auto max-h-[80vh] scrollbar-hide">
          <h2 className="w-full text-center bg-[#075178] text-white py-3 font-[600] text-[20px] ">
            Registration gifts
          </h2>
          {/* choose cource */}
          {phase === 1 && (
            <>
              <div className="flex items-center justify-start gap-2 w-[75%] mx-auto bg-[#0751784D] rounded-xl my-5 p-2 ">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_466_1348)">
                    <path
                      d="M13.4996 6.49992C13.4996 6.89775 13.3415 7.27928 13.0602 7.56058C12.7789 7.84189 12.3974 7.99992 11.9996 7.99992C11.6017 7.99992 11.2202 7.84189 10.9389 7.56058C10.6576 7.27928 10.4996 6.89775 10.4996 6.49992C10.4996 6.1021 10.6576 5.72057 10.9389 5.43926C11.2202 5.15796 11.6017 4.99992 11.9996 4.99992C12.3974 4.99992 12.7789 5.15796 13.0602 5.43926C13.3415 5.72057 13.4996 6.1021 13.4996 6.49992ZM23.9996 18.9999V12.3399C24.0369 9.25737 22.9067 6.27482 20.8359 3.99109C18.7651 1.70737 15.9071 0.291558 12.8356 0.0279206C11.1212 -0.0920218 9.4011 0.15766 7.7916 0.760073C6.1821 1.36249 4.72077 2.30358 3.50648 3.51967C2.29219 4.73576 1.35327 6.19849 0.75324 7.80888C0.153213 9.41927 -0.0939187 11.1398 0.028565 12.8539C0.470565 19.2079 6.08157 23.9999 13.0826 23.9999H18.9996C20.3252 23.9983 21.596 23.471 22.5333 22.5337C23.4707 21.5964 23.998 20.3255 23.9996 18.9999ZM12.6996 2.02392C15.266 2.25096 17.6515 3.44083 19.3767 5.35448C21.1018 7.26812 22.0389 9.76374 21.9996 12.3399V18.9999C21.9996 19.7956 21.6835 20.5586 21.1209 21.1212C20.5583 21.6839 19.7952 21.9999 18.9996 21.9999H13.0826C7.04857 21.9999 2.39957 18.0999 2.02457 12.7159C1.92612 11.3445 2.11154 9.96752 2.56925 8.67099C3.02696 7.37446 3.74712 6.18625 4.68474 5.18059C5.62236 4.17493 6.75729 3.37343 8.01863 2.82617C9.27997 2.2789 10.6406 1.99763 12.0156 1.99992C12.2426 1.99992 12.4716 2.00892 12.6996 2.02392ZM13.9996 17.9999V11.9999C13.9996 11.4695 13.7889 10.9608 13.4138 10.5857C13.0387 10.2106 12.53 9.99992 11.9996 9.99992H10.9996C10.7344 9.99992 10.48 10.1053 10.2925 10.2928C10.1049 10.4804 9.99957 10.7347 9.99957 10.9999C9.99957 11.2651 10.1049 11.5195 10.2925 11.707C10.48 11.8946 10.7344 11.9999 10.9996 11.9999H11.9996V17.9999C11.9996 18.2651 12.1049 18.5195 12.2925 18.707C12.48 18.8946 12.7344 18.9999 12.9996 18.9999C13.2648 18.9999 13.5191 18.8946 13.7067 18.707C13.8942 18.5195 13.9996 18.2651 13.9996 17.9999Z"
                      fill="#075178"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_466_1348">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p className="text-[12px] font-[400] ">
                  Congratulations, you have received free training program for
                  registering. Choose the program you would like to receive, for
                  free.
                </p>
              </div>
              <div className="flex items-center justify-center gap-10 flex-wrap w-full">
                {gifts.map((gift, index) => {
                  return (
                    <div
                      key={index}
                      className={`rounded-3xl border w-[260px] ${
                        choosedGift === index + 1
                          ? "border-[]"
                          : "border-[#D9D9D9]"
                      } `}
                      onClick={() => setChooosedGift(index + 1)}
                    >
                      <div>
                        <img
                          src={gift.image}
                          alt="cv image"
                          className="w-full"
                        />
                      </div>
                      <div className=" w-full  p-3 flex flex-col items-start justify-start">
                        <h3 className="font-[600] ">{gift.title}</h3>
                        <p className="font-[400] text-[12px]">
                          {gift.description}
                        </p>
                        <div className="flex w-full items-center justify-start gap-1">
                          <ReactStars {...defaultStars} />
                          <span className="font-[400] text-[14px] text-[#1B1B1B99] ">
                            (1.2K)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-end gap-2 my-5 w-[95%] mx-0  ">
                <span className="font-[500] text-[12px]">
                  To register for the free course you have chosen
                </span>
                <button
                  onClick={() => setPhase(2)}
                  className="border-none outline-0 flex items-center justify-center gap-1 bg-[#075178] text-[14px] font-[500] text-white rounded py-2 px-4 "
                >
                  Next <i class="fas fa-angle-double-right"></i>
                </button>
              </div>
            </>
          )}

          {/* enter information */}
          {phase === 2 && (
            <>
              <div className="w-full items-center justify-start m-5   ">
                <h3 className="border-b border-[#28AF60] w-fit text-[20px] font-[500] text-[#0B274B] pb-2">
                  Please enter the following data
                </h3>
              </div>

              <div className="w-[70%] mx-auto border border-[#F1F1F2] rounded my-5 ">
                <div className="w-full items-center justify-start m-5   ">
                  <h3 className="border-b border-[#28AF60] w-fit text-[16px] font-[400] text-[#0B274B] pb-2 flex items-center justify-start gap-2 ">
                    <svg
                      width="22"
                      height="24"
                      viewBox="0 0 22 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.4805 12.0001C8.15234 12.0001 5.48047 9.32819 5.48047 6.00006C5.48047 2.71881 8.15234 6.10352e-05 11.4805 6.10352e-05C14.7617 6.10352e-05 17.4805 2.71881 17.4805 6.00006C17.4805 9.32819 14.7617 12.0001 11.4805 12.0001ZM15.9336 13.5469C19.3086 13.6876 21.9805 16.4532 21.9805 19.8282V21.7501C21.9805 23.0157 20.9492 24.0001 19.7305 24.0001H3.23047C1.96484 24.0001 0.980469 23.0157 0.980469 21.7501V19.8282C0.980469 16.4532 3.60547 13.6876 6.98047 13.5469L9.23047 22.5001L10.7305 16.1251L9.23047 13.5001H13.7305L12.2305 16.1251L13.7305 22.5001L15.9336 13.5469Z"
                        fill="#0B274B"
                      />
                    </svg>
                    Trainee data
                  </h3>
                </div>
                <div className="flex flex-col items-start justify-start w-full px-8 pb-5 gap-4">
                  <div className="flex w-full items-center justify-between ">
                    <div className="flex flex-col items-start justify-start w-[48%] ">
                      <label
                        htmlFor="name"
                        className="text-[14px] font-[400] text-[#252525]"
                      >
                        Full Name <span className="text-[#FF0000]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="w-full border-[#E1E3EA] rounded bg-[#F9F9F9] text-[#A1A5B7] "
                        placeholder="Name..."
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start w-[48%] ">
                      <label
                        htmlFor="Nationality"
                        className="text-[14px] font-[400] text-[#252525]"
                      >
                        Nationality <span className="text-[#FF0000]">*</span>
                      </label>
                      <select
                        type="text"
                        name="Nationality"
                        className="w-full border-[#E1E3EA] rounded bg-[#F9F9F9] text-[#A1A5B7] "
                      >
                        <option value="egypt">Nationality</option>
                        <option value="egypt">Egypt</option>
                        <option value="egypt">Egypt</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-between w">
                    <div className="flex flex-col items-start justify-start w-[48%] ">
                      <label
                        htmlFor="Email"
                        className="text-[14px] font-[400] text-[#252525]"
                      >
                        Email <span className="text-[#FF0000]">*</span>
                      </label>
                      <input
                        type="text"
                        name="Email"
                        className="w-full border-[#E1E3EA] rounded bg-[#F9F9F9] text-[#A1A5B7] "
                        placeholder="Email..."
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start w-[48%] ">
                      <label
                        htmlFor="Phone"
                        className="text-[14px] font-[400] text-[#252525]"
                      >
                        Phone <span className="text-[#FF0000]">*</span>
                      </label>
                      <input
                        type="text"
                        name="Phone"
                        className="w-full border-[#E1E3EA] rounded bg-[#F9F9F9] text-[#A1A5B7] "
                        placeholder="Phone..."
                      />
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-between w">
                    <div className="flex flex-col items-start justify-start w-[48%] ">
                      <label
                        htmlFor="job"
                        className="text-[14px] font-[400] text-[#252525]"
                      >
                        Current job/position
                      </label>
                      <input
                        type="text"
                        name="job"
                        className="w-full border-[#E1E3EA] rounded bg-[#F9F9F9] text-[#A1A5B7] "
                        placeholder="job..."
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start w-[48%] ">
                      <label
                        htmlFor="WhatsApp number"
                        className="text-[14px] font-[400] text-[#252525]"
                      >
                        WhatsApp number
                      </label>
                      <input
                        type="text"
                        name="WhatsApp number"
                        className="w-full border-[#E1E3EA] rounded bg-[#F9F9F9] text-[#A1A5B7] "
                        placeholder="WhatsApp number..."
                      />
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-between w">
                    <div className="flex flex-col items-start justify-start w-full ">
                      <label
                        htmlFor="job"
                        className="text-[14px] font-[400] text-[#252525]"
                      >
                        Your expectations from the training program
                      </label>
                      <textarea
                        type="text"
                        name="job"
                        className="w-full border-[#E1E3EA] rounded bg-[#F9F9F9] text-[#A1A5B7] "
                        placeholder="expectations..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[70%] mx-auto border border-[#F1F1F2] rounded my-5 ">
                <div className="flex items-center justify-start gap-2 px-8 py-5 ">
                  <input
                    type="checkbox"
                    className="w-[25px] h-[25px] rounded focus:ring-offset-0 focus:outline-0 ring-0 focus:ring-0 focus:shadow-none   "
                  />
                  <span className="text-[14px] font-[400] text-[#252525] ">
                    By clicking this box, I acknowledge that I have read and
                    agree to all the terms and conditions for registering for
                    the training courses provided by the IBS Training Academy.
                    <Link to={`/terms`} className="text-[#28AF60]">
                      Click here to view the terms and conditions
                    </Link>
                  </span>
                </div>
                <div className="flex items-center justify-start gap-2 px-8 py-5 ">
                  <input
                    type="checkbox"
                    className="w-[25px] h-[25px] rounded focus:ring-offset-0 focus:outline-0 ring-0 focus:ring-0 focus:shadow-none   "
                  />
                  <span className="text-[14px] font-[400] text-[#252525] ">
                    Receive emails about offers and discounts on training
                    courses and programs.
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2 my-5 w-[95%] mx-0  ">
                  <button
                    onClick={() => dispatch(oldAccount())}
                    className="border-none outline-0 flex items-center justify-center gap-1 bg-[#075178] text-[14px] font-[500] text-white rounded py-2 px-4 "
                  >
                    Confirm <i class="fas fa-angle-double-right"></i>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </FullPagePopup>
    </>
  );
};

export default RegistrationGifts;
