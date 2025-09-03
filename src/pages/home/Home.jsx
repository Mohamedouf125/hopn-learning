import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { A11y, Navigation, Autoplay } from "swiper/modules";
import bigAvatar from "../../assets/images/home/bigAvatar.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../../store/slices/home/homeDataSlice";
import { useNavigate } from "react-router-dom";
import { fetchPlayersData } from "../../store/slices/players/playersSlice";
import { ar, en } from "../../assets/langs/translation";
import Cv from "../../components/cv/Cv";
import TraineeCard from "../../components/trainee/TraineeCard";
import Course from "../../components/course/Course";
import FullPagePopup from "../../components/popups/FullPagePopup";
import UploadeCv from "../../components/uploadeCV/UploadeCv";
import Cvpopup from "../../components/cv/Cvpopup";

import banimg from "../../assets/images/home/banimg.svg";
import banimgmob from "../../assets/images/home/banimgmob.svg";

const Home = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openUploaderCv, setOpenUploaderCv] = useState(false);
  const [cvLoadedSuccess, setCvLoadedSuccess] = useState(false);
  const [opencvpopup, setopencvpopup] = useState(false);
  const [chosedCv, setchosedCv] = useState({});

  // feach home data from backend
  useEffect(() => {
    dispatch(fetchHomeData(token));
    dispatch(fetchPlayersData());
  }, [dispatch, token]);

  const { sliders, cvs, courses, trainers, voted_player } = useSelector(
    (state) => state.home
  );

  const { players } = useSelector((state) => state.players);

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;

  return (
    <main>
      {/* uploade CV form */}
      {openUploaderCv && (
        <FullPagePopup>
          <UploadeCv
            setOpenUploaderCv={setOpenUploaderCv}
            setCvLoadedSuccess={setCvLoadedSuccess}
          />
        </FullPagePopup>
      )}
      {cvLoadedSuccess && (
        <FullPagePopup>
          <div className="container mx-auto overflow-x-hidden overflow-y-auto p-5 mt-10 max-h-[90vh]  rounded-lg bg-white">
            <div className="flex w-full items-center justify-between">
              <span
                className="cursor-pointer w-[30px] h-[30px] rounded-full bg-[#D9D9D9] flex items-center justify-center "
                onClick={() => {
                  setCvLoadedSuccess(false);
                }}
              >
                <i class="fas fa-times"></i>
              </span>
            </div>

            <p className="mt-10 text-center text-green-500 text-[clamp(10px,1.0416666666666665vw,20px)]">
              {currentLang.uploadeCVdesc}
            </p>
            <div className="w-full flex items-center justify-center mt-5">
              <button
                onClick={() => setCvLoadedSuccess(false)}
                className="border-none outline-none rounded-lg px-5 mx-auto py-2 bg-[#075178] text-white"
              >
                {currentLang.ok}
              </button>
            </div>
          </div>
        </FullPagePopup>
      )}
      {opencvpopup && (
        <FullPagePopup>
          <Cvpopup setopencvpopup={setopencvpopup} cv={chosedCv} />
        </FullPagePopup>
      )}

      {/* home content */}
      <div className="container mx-auto px-4 py-8">
        {/* banner */}
        <section className="mb-8 w-full ">
          <div className="flex flex-col md:flex-row w-full gap-[clamp(10px,1.6666666666666667vw,24px)] ">
            <Swiper
              modules={[A11y, Autoplay]}
              centeredSlides={true}
              autoplay={{ delay: 6500, disableOnInteraction: false }}
              dir="rtl"
              loop={true}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 5,
                },
              }}
              className="w-full h-[clamp(100px,18.47222222222222vw,266px)] md:w-[clamp(300px,55.55555555555556vw,800px)]"
            >
              {sliders.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  className="flex h-full w-full rounded-[clamp(8px,1.597222222222222vw,23px)] overflow-hidden items-center justify-center bg-gray-100 shadow-md"
                >
                  <img className="w-full h-full" src={slide.url} alt="banner" />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex h-[75px] md:h-[clamp(100px,18.47222222222222vw,266px)] w-full md:w-[clamp(300px,16.73611111111111vw,241px)] items-center justify-center">
              <img
                onClick={() => setOpenUploaderCv(true)}
                className="w-full h-full cursor-pointer hidden md:block"
                src={banimg}
                alt=""
              />
              <img
                onClick={() => setOpenUploaderCv(true)}
                className="w-full h-full cursor-pointer md:hidden"
                src={banimgmob}
                alt=""
              />
            </div>
          </div>
        </section>

        <div className="w-full h-[0px] border-t border-[#F1F1F2]"></div>
        {/* trainers */}
        <section className="w-full flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4 w-full text-start">
            {currentLang.trainersTitle}
          </h2>
          <div className="w-full relative">
            <Swiper
              modules={[Navigation, A11y, Autoplay]}
              centeredSlides={true}
              navigation={{
                nextEl: ".trainers-swiper-button-next",
                prevEl: ".trainers-swiper-button-prev",
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              dir="rtl"
              direction="horizontal"
              breakpoints={{
                320: {
                  slidesPerView: "auto",
                  spaceBetween: 5,
                },
                480: {
                  slidesPerView: "auto",
                  spaceBetween: 8,
                },
                640: {
                  slidesPerView: "auto",
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: "auto",
                  spaceBetween: 15,
                },
              }}
              className="w-full"
            >
              {trainers.map((trainee, index) => {
                return (
                  <SwiperSlide className="!w-[238px]">
                    <TraineeCard key={index} trainee={trainee} />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div
              style={{ boxShadow: "0px 3px 4px 0px #00000008" }}
              className="trainers-swiper-button-next border border-[#F1F1F2] text-black bg-white rounded-full p-2 absolute top-[50%] z-50 left-0 translate-y-[-50%] md:translate-x-[-50%] "
            >
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
            <div
              style={{ boxShadow: "0px 3px 4px 0px #00000008" }}
              className="trainers-swiper-button-prev border border-[#F1F1F2] text-black bg-white rounded-full p-2 absolute top-[50%] z-50 right-0 translate-y-[-50%] md:translate-x-[50%]"
            >
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
        {/* <section className="w-full flex flex-col items-center justify-center mt-10">
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
          <div className="flex items-start justify-center gap-[clamp(5px,1.0416666666666665vw,20px)] flex-wrap w-full">
            {cvs.length === 0 ? (
              <div>{currentLang.NoCvs}</div>
            ) : (
              cvs.slice(0, 4).map((cv, index) => {
                return (
                  <Cv
                    setchosedCv={setchosedCv}
                    setopencvpopup={setopencvpopup}
                    cv={cv}
                    key={index}
                  />
                );
              })
            )}
          </div>
        </section> */}
        {/* <div className="w-full h-[0px] border-t my-[clamp(20px,2.083333333333333vw,40px)] border-[#F1F1F2]"></div> */}
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
              return <Course course={course} key={index} />;
            })}
          </div> 
        </section>
        {/* <div className="w-full h-[0px] border-t my-[clamp(20px,2.083333333333333vw,40px)] border-[#F1F1F2]"></div> */}
        {/* Vote for the best player */}
        {/* <section className="w-full flex flex-col items-center justify-center mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-center w-full">
            {currentLang.voteTitle}
          </h2>

          <div className="flex items-center justify-center mt-[20px] gap-2 md:gap-[16px] flex-wrap w-full">
            {players.map((player, index) => {
              return (
                <div
                  key={index}
                  className={`rounded-[12px] border border-[#F1F1F2] overflow-hidden cursor-pointer w-[48%] h-[200px] md:w-[138px] relative  `}
                >
                  <div className="w-full relative z-10 h-[78px] overflow-hidden">
                    <img
                      className="w-full h-full rounded-[4px]  "
                      src={player.team.image}
                      alt="club"
                    />
                  </div>
                  <div className=" border-[4px] relative z-20 border-[#fff] mt-[-40px] rounded-full mx-auto flex items-center justify-center overflow-hidden w-[90px] h-[90px] ">
                    <img
                      src={player.image || bigAvatar}
                      alt="personal-img"
                      className="w-full  rounded-full border border-[#F1F1F2] "
                    />
                  </div>
                  <div className=" w-full  p-3 flex flex-col items-start justify-start">
                    <h3 className=" font-[500] text-[12px] w-full text-center ">
                      {player.name}
                    </h3>
                    <div className="flex items-center justify-center gap-[2px] w-full mt-[5px]">
                      <span className="text-[10px] font-[400] ">
                        {currentLang.playIn}
                      </span>
                      <span className="text-[10px] font-[500]">
                        {player.team.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section> */}
      </div>
    </main>
  );
};

export default Home;
