import React from "react";
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
import avatar from "../../assets/images/icons/avatar.png";
import bigAvatar from "../../assets/images/home/bigAvatar.png";
import slideHead from "../../assets/images/home/slideHeader.png";
import cvImg from "../../assets/images/home/cvImg.png";
import courceImg from "../../assets/images/home/courceImg.png";
import ahlyClub from "../../assets/images/home/ahlyClub.png";

const Home = () => {
  const Celebrities = [
    {
      name: "ibrahim mohamed",
      job: "frontend",
      image: avatar,
    },
    {
      name: "ahmed mohamed",
      job: "frontend",
      image: avatar,
    },
    {
      name: "mahnoud ibrahim",
      job: "frontend",
      image: avatar,
    },
    {
      name: "amir mohamed",
      job: "frontend",
      image: avatar,
    },
    {
      name: "mohamed ahmed",
      job: "frontend",
      image: avatar,
    },
    {
      name: "mohamed ahmed",
      job: "frontend",
      image: avatar,
    },
    {
      name: "mohamed ahmed",
      job: "frontend",
      image: avatar,
    },
    {
      name: "mohamed ahmed",
      job: "frontend",
      image: avatar,
    },
  ];

  const stars = {
    count: 5,
    size: 20,
    activeColor: "#FFD130",
    edit: false,
    value: 4.5,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-center">Banner</h1>
        </section>
        {/* profiles slide */}
        <section className="w-full flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4 w-full text-left">
            Celebrities in sports
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
                  slidesPerView: 4,
                  spaceBetween: 16,
                },
              }}
              className="w-full"
            >
              {Celebrities.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center bg-gray-100 rounded-lg shadow-md"
                >
                  <div className="text-center">
                    <div className="w-full  ">
                      <img
                        className="w-full  "
                        src={slideHead}
                        alt="slideHead"
                      />
                    </div>
                    <div className="w-full mt-[-30px] ">
                      <img
                        src={slide.image}
                        alt={slide.name}
                        className="w-16 h-16 rounded-full mx-auto mb-2"
                      />
                      <h3 className="text-lg font-[600] ">{slide.name}</h3>
                      <p className="font-[400]">{slide.job}</p>
                    </div>
                    <div className="flex items-center justify-center gap-6 py-3">
                      <button className="text-[#EB4335] font-[600] ">
                        REMOVE
                      </button>
                      <button className="text-white bg-[#075178] px-9 py-2 rounded-xl ">
                        FOLOW
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Arrows */}
            <div className="swiper-button-next border border-[#F1F1F2] text-black bg-white rounded-full p-2 absolute top-[50%] z-50 left-0 translate-y-[-50%] translate-x-[-50%] ">
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
            <div className="swiper-button-prev border border-[#F1F1F2] text-black bg-white rounded-full p-2 absolute top-[50%] z-50 right-0 translate-y-[-50%] translate-x-[50%]">
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
        {/* cv */}
        <section className="w-full flex flex-col items-center justify-center mt-10">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-2xl font-semibold mb-4 text-left">
              Employment proposals
            </h2>
            <span className="text-[#F39C12] font-[500] cursor-pointer ">
              See More
            </span>
          </div>
          <div className="flex items-center justify-center gap-10 flex-wrap w-full">
            {Celebrities.slice(0, 4).map((slide, index) => {
              return (
                <div
                  key={index}
                  className="bg-[#D9D9D9] p-10 rounded-lg relative border border-[#D9D9D9] w-[260px]"
                >
                  <div>
                    <img src={cvImg} alt="cv image" className="w-full" />
                  </div>
                  <div className="bg-white w-full absolute bottom-0 left-0 rounded-lg p-3 flex items-center justify-center gap-2">
                    <img
                      src={slide.image}
                      alt={slide.image}
                      className="mt-[-60px] "
                    />
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="font-[600] ">{slide.name}</h3>
                      <p className="font-[400]">{slide.job}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* cources */}
        <section className="w-full flex flex-col items-center justify-center mt-10">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-2xl font-semibold mb-4 text-left">
              Free courses
            </h2>
            <span className="text-[#F39C12] font-[500] cursor-pointer ">
              View ALL
            </span>
          </div>
          <div className="flex items-center justify-center gap-10 flex-wrap w-full">
            {Celebrities.slice(0, 4).map((slide, index) => {
              return (
                <div
                  key={index}
                  className="rounded-3xl border border-[#D9D9D9] w-[260px]"
                >
                  <div>
                    <img src={courceImg} alt="cv image" className="w-full" />
                  </div>
                  <div className=" w-full  p-3 flex flex-col items-start justify-start">
                    <h3 className="font-[600] ">
                      Sports Injuries and Sports Rehabilitation
                    </h3>
                    <p className="font-[400] text-[12px]">
                      More than 8yr Experience as Illustrator. Learn how to
                      becoming professional Illustrator Now...
                    </p>
                    <div className="flex w-full items-center justify-start gap-1">
                      <ReactStars {...stars} />
                      <span className="font-[400] text-[14px] text-[#1B1B1B99] ">
                        (1.2K)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Vote for the best player */}
        <section className="w-full flex flex-col items-center justify-center mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-center w-full">
            Vote for the best player
          </h2>

          <div className="flex items-center justify-center gap-10 flex-wrap w-full">
            {Celebrities.map((_, index) => {
              return (
                <div
                  key={index}
                  className="rounded-xl border p-5 border-[#D9D9D9] min-w-[260px]"
                >
                  <div className="p-5">
                    <img
                      src={bigAvatar}
                      alt="personal image"
                      className="w-full "
                    />
                  </div>
                  <div className=" w-full  p-3 flex flex-col items-start justify-start">
                    <h3 className="font-[600] text-[18px] w-full text-center ">
                      Mohamed Aboelyazed
                    </h3>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <div>
                        <img src={ahlyClub} alt="club" />
                      </div>
                      <div className="flex items-center justify-center flex-col ">
                        <span className="text-[12px] font-[400] ">
                          Football Player in
                        </span>
                        <span className="text-[16px] font-[700] ">Alahly</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
