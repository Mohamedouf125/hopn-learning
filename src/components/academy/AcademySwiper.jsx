import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

const AcademySwiper = ({ slides }) => {

  return (
    <header className="w-full ">
      <div class="w-full  ">
        <Swiper
          modules={[Pagination, A11y, Autoplay]}
          centeredSlides={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          dir="rtl"
          direction="horizontal"
          className="w-full max-w-[1060px] rounded-[clamp(15px,1.1979166666666667vw,23px)] academySwiper"
        >
          {slides &&
            slides.map((slide) => {
              return (
                <SwiperSlide key={slide.id}>
                  <a className="w-full  " href="#">
                    <img
                      src={
                        slide.url !== "https://api.sportiin.com0"
                          ? slide.url
                          : `https://via.assets.so/img.jpg?w=1060&h=339`
                      }
                      alt="academy slider slide"
                      loading="lazy"
                      className="w-full h-[clamp(150px,20.78125vw,399px)] "
                    />
                  </a>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </header>
  );
};

export default AcademySwiper;
