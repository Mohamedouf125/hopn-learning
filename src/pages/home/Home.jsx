import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReactStars from "react-rating-stars-component";
import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
} from "swiper/modules";
// import avatar from "../../assets/images/profile/profileAvatar.png";
import bigAvatar from "../../assets/images/home/bigAvatar.png";
// import cover from "../../assets/images/profile/COVER.png";
import cvImg from "../../assets/images/home/cvImg.png";
import courseImg from "../../assets/images/home/courceImg.png";
import { useDispatch, useSelector } from "react-redux";
// import RegistrationGifts from "../../components/gifts/RegistrationGifts";
// import ExceptionalGifts from "../../components/gifts/ExceptionalGifts";
// import DepositGifts from "../../components/gifts/DepositGifts";
// import useUserLoggedIn from "../../assets/hooks/useUserLoggedIn";
import { oldAccount } from "../../store/slices/user/userSlice";
import { fetchHomeData } from "../../store/slices/home/homeDataSlice";
import { useNavigate } from "react-router-dom";
import balanceBg from "../../assets/images/home/Subtract.png";
import {
  fetchPlayersData,
  voteForPlayer,
} from "../../store/slices/players/playersSlice";
import { ar, en } from "../../assets/langs/translation";
import { toast } from "react-toastify";
import Cv from "../../components/cv/Cv";
import TraineeCard from "../../components/trainee/TraineeCard";
import Course from "../../components/course/Course";

const Home = () => {
  const { token } = useSelector((state) => state.user);
  const { defaultStars } = useSelector((state) => state.ratingStars);
  // const userLoggedIn = useUserLoggedIn();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVoted, setiIsVoted] = useState(false);

  // to check if first login or not
  useEffect(() => {
    const newAccount = localStorage.getItem("newAccount");
    if (newAccount === "false") {
      dispatch(oldAccount());
    }
  }, []);

  // feach home data from backend
  useEffect(() => {
    dispatch(fetchHomeData(token));
    dispatch(fetchPlayersData());
  }, [dispatch, token]);

  const {
    sliders,
    cvs,
    courses,
    trainers,
    status,
    users,
    error,
    voted_player,
  } = useSelector((state) => state.home);

  const { players } = useSelector((state) => state.players);

  const choosePlayer = (id) => {
    // if (voted_player) {
    //   toast.success(currentLang.alreadyotVed)
    //   return;
    // }

    // if (!userLoggedIn) {
    //   toast.error(currentLang.loginToVote)
    //   // navigate("/login")
    //   return;
    // }
    dispatch(voteForPlayer({ id, token }));
    dispatch(fetchHomeData(token));
    toast.success(currentLang.VotedSuccessfully);
    setiIsVoted(true);
  };

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;

  return (
    <main>
      {/* {newAccount && userLoggedIn && <RegistrationGifts />} */}
      {/* <ExceptionalGifts /> */}
      {/* <DepositGifts /> */}

      {/* home content */}
      <div className="container mx-auto px-4 py-8">
        {/* banner */}
        <section className="mb-8 w-full ">
          <div className="flex flex-col md:flex-row w-full gap-10 md:gap-0 ">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              centeredSlides={true}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              autoplay={{ delay: 6500, disableOnInteraction: false }}
              dir="rtl"
              loop={true}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 5,
                },
              }}
              className="w-full md:w-[60%]"
            >
              {sliders.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  className="flex rounded-3xl overflow-hidden items-center justify-center bg-gray-100 shadow-md"
                >
                  <img src={slide.url} alt="banner" />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="hidden md:flex w-full md:w-[30%] items-center justify-center md:justify-end ">
              <div className="w-[240px] h-[180px] rounded-3xl relative">
                <img
                  src={balanceBg}
                  alt="balanceBg"
                  className="w-[240px] h-[180px]"
                />
                <div className="absolute border-white bottom-0 cursor-pointer right-1 bg-[#28AF60] rounded-2xl w-[65px] h-[55px] flex items-center justify-center ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5098 6.87999C16.3896 6.82875 16.2605 6.80157 16.1298 6.79999H7.73978C7.47456 6.79999 7.22021 6.90534 7.03267 7.09288C6.84513 7.28042 6.73978 7.53477 6.73978 7.79999C6.73978 8.0652 6.84513 8.31956 7.03267 8.50709C7.22021 8.69463 7.47456 8.79999 7.73978 8.79999H13.7398L6.99978 15.49C6.81353 15.6774 6.70898 15.9308 6.70898 16.195C6.70898 16.4592 6.81353 16.7126 6.99978 16.9C7.18714 17.0862 7.44059 17.1908 7.70478 17.1908C7.96896 17.1908 8.22241 17.0862 8.40978 16.9L15.0998 10.22V16.22C15.0998 16.4852 15.2051 16.7396 15.3927 16.9271C15.5802 17.1146 15.8346 17.22 16.0998 17.22C16.365 17.22 16.6193 17.1146 16.8069 16.9271C16.9944 16.7396 17.0998 16.4852 17.0998 16.22V7.79999C17.0988 7.60256 17.0394 7.40985 16.9291 7.24613C16.8187 7.08241 16.6624 6.95501 16.4798 6.87999H16.5098Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full h-[0px] border-t my-[clamp(20px,2.083333333333333vw,40px)] border-[#F1F1F2]"></div>
        {/* trainers */}
        <section className="w-full flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4 w-full text-start">
            {currentLang.trainersTitle}
          </h2>
          <div className="w-full relative">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              centeredSlides={true}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              dir="rtl"
              direction="horizontal"
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 5,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 8,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3.5,
                  spaceBetween: 30,
                },
              }}
              className="w-full"
            >
              {trainers.map((trainee, index) => {
                return (
                  <SwiperSlide>
                    <TraineeCard key={index} trainee={trainee} />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div className="swiper-button-next border border-[#F1F1F2] text-black bg-white rounded-full p-2 absolute top-[50%] z-50 left-0 translate-y-[-50%] md:translate-x-[-50%] ">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_301_338)">
                  <path
                    d="M15.5 6L9.5 12L15.5 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_301_338">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="matrix(-1 0 0 1 24.5 0)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="swiper-button-prev border border-[#F1F1F2] text-black bg-white rounded-full p-2 absolute top-[50%] z-50 right-0 translate-y-[-50%] md:translate-x-[50%]">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_301_332)">
                  <path
                    d="M9.5 6L15.5 12L9.5 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_301_332">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </section>
        <div className="w-full h-[0px] border-t my-[clamp(20px,2.083333333333333vw,40px)] border-[#F1F1F2]"></div>

        {/* cv */}
        <section className="w-full flex flex-col items-center justify-center mt-10">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-2xl font-semibold mb-4 text-left">
              {currentLang.cvSectoinTitle}
            </h2>
            <span
              onClick={() => navigate("/cvs")}
              className="text-[#F39C12] font-[500] cursor-pointer "
            >
              {currentLang.SeeMore}
            </span>
          </div>
          <div className="flex items-start justify-center gap-10 flex-wrap w-full">
            {cvs.length === 0 ? (
              <div>{currentLang.NoCvs}</div>
            ) : (
              cvs.slice(0, 4).map((slide, index) => {
                return (
                  <Cv cv={slide} key={index} />
                );
              })
            )}
          </div>
        </section>
        <div className="w-full h-[0px] border-t my-[clamp(20px,2.083333333333333vw,40px)] border-[#F1F1F2]"></div>
        {/* courses */}
        <section className="w-full flex flex-col items-center justify-center mt-[clamp(10px,2.083333333333333vw,40px)]">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-[clamp(12px,1.0416666666666665vw,20px)] font-semibold mb-4 text-left">
              {currentLang.freeCourses}
            </h2>
            <span
              onClick={() => navigate("/courses")}
              className="text-[#F39C12] text-[clamp(8px,0.625vw,12px)] font-[500] cursor-pointer  "
            >
              {currentLang.SeeMore}
            </span>
          </div>
          <div className="flex items-center justify-center gap-[clamp(5px,1.0416666666666665vw,20px)] flex-wrap w-full">
            {courses.slice(0, 4).map((course, index) => {
              return (
                <Course course={course} key={index} />
              );
            })}
          </div>
        </section>
        <div className="w-full h-[0px] border-t my-[clamp(20px,2.083333333333333vw,40px)] border-[#F1F1F2]"></div>
        {/* Vote for the best player */}
        <section className="w-full flex flex-col items-center justify-center mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-center w-full">
            {currentLang.voteTitle}
          </h2>

          <div className="flex items-center justify-center gap-2 md:gap-10 flex-wrap w-full">
            {players.map((player, index) => {
              return (
                <div
                  key={index}
                  className={`rounded-xl border p-5 overflow-hidden cursor-pointer w-[48%] h-[300px] md:w-[260px] relative ${
                    voted_player?.id === player.id
                      ? "border-none bg-[#D9D9D9] "
                      : "border-[#D9D9D9]"
                  }  `}
                  onClick={() => {
                    choosePlayer(player.id);
                  }}
                >
                  <div className=" rounded-full mx-auto flex items-center justify-center overflow-hidden w-[100px] h-[100px] md:w-[150px] md:h-[150px]">
                    <img
                      src={player.image || bigAvatar}
                      alt="personal image"
                      className="w-full  rounded-full "
                    />
                  </div>
                  <div className=" w-full  p-3 flex flex-col items-start justify-start">
                    <h3 className=" font-[500] text-[14px] md:font-[600] md:text-[18px] w-full text-center ">
                      {player.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <div className=" w-[30px] h-[30px] md:w-[40px] md:h-[40px] ">
                        <img
                          className="w-full"
                          src={player.team.image}
                          alt="club"
                        />
                      </div>
                      <div className="flex items-center justify-center flex-col ">
                        <span className="text-[12px] font-[400] ">
                          {currentLang.playIn}
                        </span>
                        <span className="text-[12px] font-[500] md:text-[16px] md:font-[700] ">
                          {player.team.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isVoted && (
                    <div className="absolute top-0 left-0 p-2 bg-[#C0C0C0] rounded-br-xl ">
                      {player.count} {currentLang.Vote}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
