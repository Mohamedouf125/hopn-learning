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
      {/* {openUploaderCv && (
        <FullPagePopup>
          <UploadeCv
            setOpenUploaderCv={setOpenUploaderCv}
            setCvLoadedSuccess={setCvLoadedSuccess}
          />
        </FullPagePopup>
      )} */}
      {/* {cvLoadedSuccess && (
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
                className="border-none outline-none rounded-lg px-5 mx-auto py-2 bg-orange-primary text-white"
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
      )} */}

      {/* home content */}
      <div className="container mx-auto px-4 py-8">
        {/* banner */}
        <section className="mb-8 w-full ">
          <div className="w-full">
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
              className="w-full h-[clamp(100px,18.47222222222222vw,266px)]"
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
              className="trainers-swiper-button-next border border-[#F1F1F2] text-orange-primary bg-white rounded-full p-2 absolute top-[50%] z-50 left-0 translate-y-[-50%] md:translate-x-[-50%] "
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
              className="trainers-swiper-button-prev border border-[#F1F1F2] text-orange-primary bg-white rounded-full p-2 absolute top-[50%] z-50 right-0 translate-y-[-50%] md:translate-x-[50%]"
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
              className="text-yellow-secondary font-[500] cursor-pointer "
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
              className="text-yellow-secondary text-[clamp(8px,0.625vw,12px)] font-[500] cursor-pointer  "
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
                  className={`rounded-[12px] border border-[#F1F1F2] overflow-hidden cursor-pointer w-[48%] h-[200px] md:w-[138px] relative hover:border-orange-primary transition-colors `}
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
                      className="w-full  rounded-full border border-[#F1F1F2] hover:border-orange-primary transition-colors "
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
        {/* appended Hopn sections */}
        <section className="w-full mt-10">
          {/* hero - Hopn Students */}
          <div className="w-full bg-black text-white rounded-[clamp(8px,1.597222222222222vw,23px)] overflow-hidden mb-8">
            <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-gradient-to-br from-black via-black to-black">
              <div className="inline-flex flex-col items-center justify-center gap-2 bg-white/5 border-2 border-white/20 rounded-full px-6 py-4 mb-6 animate-glow">
                <div className="text-yellow-secondary font-semibold text-[clamp(14px,1.111111vw,18px)]">
                  {lang === "ar"
                    ? "شركة Hopn ug - ألمانيا"
                    : "Hopn ug Company - Germany"}
                </div>
                <div className="text-white/80 text-[clamp(12px,0.972222vw,16px)]">
                  {lang === "ar"
                    ? "خبرة مثبتة في 25+ مدرسة خاصة عربية"
                    : "Proven experience in 25+ Arab private schools"}
                </div>
              </div>
              <h1 className="text-[clamp(24px,3.333333vw,48px)] font-bold mb-3 bg-gradient-to-r from-white via-yellow-secondary to-orange-primary bg-clip-text text-transparent animate-text-glow">
                {lang === "ar"
                  ? "🚀 كورس البرمجة المتكامل"
                  : "🚀 Complete Programming Course"}
              </h1>
              <p className="text-[clamp(14px,1.25vw,20px)] mb-4 text-white/90">
                {lang === "ar"
                  ? "من الصفر للاحتراف – Full Stack Development"
                  : "From Zero to Professional – Full Stack Development"}
              </p>
              <p className="text-[clamp(14px,1.111111vw,18px)] font-semibold text-yellow-secondary mb-6">
                {lang === "ar"
                  ? "🎯 مخصص للمدارس الخاصة في السعودية والإمارات 🇸🇦🇦🇪"
                  : "🎯 Designed for Private Schools in Saudi Arabia & UAE 🇸🇦🇦🇪"}
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById("contact-hopn");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-orange-primary via-yellow-secondary to-orange-primary text-white font-bold rounded-full px-8 py-4 shadow-lg hover:shadow-2xl transition-transform duration-200 hover:-translate-y-1 animate-pulse-hopn"
              >
                {lang === "ar"
                  ? "⚡ احصل على عرضك المخصص الآن"
                  : "⚡ Get Your Custom Quote Now"}
              </button>
            </div>
          </div>

          {/* experience - countries */}
          <div className="w-full text-white rounded-[clamp(8px,1.597222222222222vw,23px)] overflow-hidden bg-gradient-to-br from-black to-[#0a0a0a] p-6 mb-8">
            <h2 className="text-center text-[clamp(20px,2.5vw,36px)] font-semibold mb-8">
              {lang === "ar"
                ? "🌍 خبرتنا الواسعة في البلدان العربية"
                : "🌍 Our Extensive Experience in Arab Countries"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { flag: "🇪🇬", ar: "مصر", en: "Egypt", count: "12+" },
                { flag: "🇹🇳", ar: "تونس", en: "Tunisia", count: "8+" },
                { flag: "🇯🇴", ar: "الأردن", en: "Jordan", count: "3+" },
                { flag: "🇮🇶", ar: "العراق", en: "Iraq", count: "2+" },
              ].map((c, i) => (
                <div
                  key={i}
                  className="bg-white/10 border-2 border-white/20 rounded-2xl p-5 text-center backdrop-blur hover:-translate-y-1 transition-all glass animate-floating"
                >
                  <div className="text-4xl mb-2">{c.flag}</div>
                  <div className="text-yellow-secondary font-semibold text-lg mb-1">
                    {lang === "ar" ? c.ar : c.en}
                  </div>
                  <div className="text-orange-primary text-2xl font-bold">
                    {c.count} {lang === "ar" ? "مدرسة" : "Schools"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* curriculum - 4 tracks */}
          <div className="w-full rounded-[clamp(8px,1.597222222222222vw,23px)] overflow-hidden bg-gradient-to-br from-black to-[#0a0a0a] p-6 text-white mb-8">
            <h2 className="text-center text-[clamp(20px,2.5vw,36px)] font-semibold">
              {lang === "ar"
                ? "💎 منهج البرمجة الشامل - 4 مسارات متخصصة"
                : "💎 Comprehensive Programming Curriculum - 4 Specialized Tracks"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
              {[
                {
                  icon: "🎨",
                  title: "UI/UX Design",
                  ar: "تعلم فن تصميم واجهات المستخدم وتجربة المستخدم من الصفر...",
                  en: "Learn the art of UI/UX from scratch with modern tools...",
                  skills: [
                    { ar: "Figma و Adobe XD", en: "Figma & Adobe XD" },
                    { ar: "أساسيات أبحاث المستخدم", en: "UX Research" },
                    { ar: "تصميم متجاوب", en: "Responsive Design" },
                  ],
                },
                {
                  icon: "⚙️",
                  title: "Backend Development",
                  ar: "بناء خدمات قوية باستخدام PHP و Laravel وإدارة قواعد البيانات...",
                  en: "Build robust services with PHP & Laravel and databases...",
                  skills: [
                    { ar: "PHP متقدم و OOP", en: "Advanced PHP & OOP" },
                    {
                      ar: "Laravel للتطوير السريع",
                      en: "Laravel for Rapid Dev",
                    },
                    { ar: "تصميم قواعد البيانات", en: "Database Design" },
                  ],
                },
                {
                  icon: "⚡",
                  title: "Frontend Development",
                  ar: "واجهات ويب تفاعلية سريعة باستخدام React و Next.js...",
                  en: "Interactive, fast web apps with React & Next.js...",
                  skills: [
                    { ar: "HTML/CSS/JS حديث", en: "Modern HTML/CSS/JS" },
                    { ar: "React لبناء الواجهات", en: "React for UIs" },
                    { ar: "تحسين الأداء", en: "Performance" },
                  ],
                },
                {
                  icon: "📱",
                  title: "Flutter Mobile",
                  ar: "تطبيقات موبايل احترافية لـ Android و iOS من كود واحد...",
                  en: "Pro mobile apps for Android/iOS from one codebase...",
                  skills: [
                    { ar: "Dart و Flutter", en: "Dart & Flutter" },
                    { ar: "إدارة الحالة", en: "State Management" },
                    { ar: "النشر على المتاجر", en: "Store Publishing" },
                  ],
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="relative bg-white/10 border-2 border-white/20 rounded-2xl p-6 backdrop-blur group glass animate-floating"
                >
                  <div className="text-4xl mb-3 bg-gradient-to-r from-yellow-secondary to-orange-primary bg-clip-text text-transparent">
                    {card.icon}
                  </div>
                  <h3 className="text-yellow-secondary text-2xl font-bold mb-2">
                    {card.title}
                  </h3>
                  <p className="text-white/90 mb-3 text-sm">
                    {lang === "ar" ? card.ar : card.en}
                  </p>
                  <ul className="text-white/80 text-sm list-disc rtl:list-disc pl-5 rtl:pr-5">
                    {card.skills.map((s, i) => (
                      <li key={i}>{lang === "ar" ? s.ar : s.en}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* stats */}
          <div className="w-full rounded-[clamp(8px,1.597222222222222vw,23px)] overflow-hidden bg-gradient-to-r from-black to-[#0a0a0a] p-6 text-white mb-8">
            <h2 className="text-center text-[clamp(20px,2.5vw,36px)] font-semibold">
              {lang === "ar"
                ? "📊 إنجازاتنا وخبرتنا"
                : "📊 Our Achievements & Experience"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {[
                {
                  n: "25+",
                  ar: "مدرسة خاصة عربية",
                  en: "Arab Private Schools",
                },
                { n: "10K+", ar: "طالب تم تدريبهم", en: "Students Trained" },
                { n: "200+", ar: "معلم تم تأهيله", en: "Teachers Certified" },
                {
                  n: "99%",
                  ar: "نسبة رضا المدارس",
                  en: "School Satisfaction Rate",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center glass animate-floating"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-yellow-secondary to-white bg-clip-text text-transparent mb-2">
                    {s.n}
                  </div>
                  <div className="text-white/90 text-sm">
                    {lang === "ar" ? s.ar : s.en}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* schools focus */}
          <div className="w-full rounded-[clamp(8px,1.597222222222222vw,23px)] overflow-hidden bg-gradient-to-br from-black to-[#0a0a0a] p-6 text-white mb-8">
            <h2 className="text-center text-[clamp(20px,2.5vw,36px)] font-semibold">
              {lang === "ar"
                ? "🎯 شريك التميز للمدارس الخاصة"
                : "🎯 Excellence Partner for Private Schools"}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              {["sa", "ae"].map((k, i) => (
                <div
                  key={i}
                  className="bg-white/10 border-2 border-white/20 rounded-2xl p-6 glass animate-floating"
                >
                  <h3 className="text-yellow-secondary text-2xl font-bold text-center mb-4">
                    {k === "sa"
                      ? lang === "ar"
                        ? "🇸🇦 المملكة العربية السعودية"
                        : "🇸🇦 Kingdom of Saudi Arabia"
                      : lang === "ar"
                      ? "🇦🇪 دولة الإمارات العربية المتحدة"
                      : "🇦🇪 United Arab Emirates"}
                  </h3>
                  <div className="text-[clamp(12px,1.111111vw,18px)] text-white/90">
                    {k === "sa"
                      ? lang === "ar"
                        ? "نقدم حلول تعليمية متطورة تواكب رؤية 2030 وتساهم في بناء جيل مبرمجي المستقبل في المملكة"
                        : "We provide advanced educational solutions aligned with Vision 2030 to build the next generation of programmers"
                      : lang === "ar"
                      ? "برامج تعليمية تدعم استراتيجية الإمارات 2071 والاستعداد للثورة الصناعية الرابعة"
                      : "Programs supporting UAE Strategy 2071 and the Fourth Industrial Revolution"}
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 mt-4">
                    <h4 className="text-yellow-secondary mb-2 font-semibold">
                      {lang === "ar"
                        ? "✨ المميزات الخاصة:"
                        : "✨ Special Features:"}
                    </h4>
                    <ul className="list-disc pl-5 rtl:pr-5 text-white/90 text-sm space-y-1">
                      {(k === "sa"
                        ? [
                            {
                              ar: "متوافق مع معايير وزارة التعليم السعودية",
                              en: "Compliant with Saudi Ministry standards",
                            },
                            {
                              ar: "يدعم التحول الرقمي والذكاء الاصطناعي",
                              en: "Supports digital transformation and AI",
                            },
                            {
                              ar: "يساهم في تحقيق أهداف رؤية 2030",
                              en: "Contributes to Vision 2030 goals",
                            },
                            {
                              ar: "مناهج بالعربية مع مصطلحات دولية",
                              en: "Arabic curriculum with global terminology",
                            },
                          ]
                        : [
                            {
                              ar: "يواكب مئوية الإمارات 2071",
                              en: "Aligned with UAE Centennial 2071",
                            },
                            {
                              ar: "يدعم مبادرة مليون مبرمج عربي",
                              en: "Supports One Million Arab Coders",
                            },
                            {
                              ar: "متوافق مع معايير التعليم الإماراتية",
                              en: "Compliant with UAE standards",
                            },
                            {
                              ar: "إعداد الطلاب للاقتصاد الرقمي",
                              en: "Preparing students for digital economy",
                            },
                          ]
                      ).map((f, idx) => (
                        <li key={idx}>{lang === "ar" ? f.ar : f.en}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* guarantees */}
          <div className="w-full rounded-[clamp(8px,1.597222222222222vw,23px)] overflow-hidden bg-gradient-to-br from-black to-[#0a0a0a] p-6 text-white mb-8">
            <h2 className="text-center text-[clamp(20px,2.5vw,36px)] font-semibold">
              {lang === "ar"
                ? "🎓 ضمانات الجودة والتميز"
                : "🎓 Quality & Excellence Guarantees"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                {
                  arT: "🏆 جودة التعليم",
                  enT: "🏆 Education Quality",
                  ar: "معايير أوروبية + منهج متدرج + مشاريع عملية",
                  en: "European standards + progressive curriculum + real projects",
                },
                {
                  arT: "👨‍🏫 دعم المعلمين",
                  enT: "👨‍🏫 Teacher Support",
                  ar: "تدريب شامل + دعم فني مستمر + ورش دورية",
                  en: "Comprehensive training + continuous support + workshops",
                },
                {
                  arT: "📊 متابعة التقدم",
                  enT: "📊 Progress Tracking",
                  ar: "تقارير دورية + تقييم مستمر + شهادات معتمدة",
                  en: "Regular reports + continuous assessment + accredited certificates",
                },
              ].map((b, i) => (
                <div
                  key={i}
                  className="bg-white/10 rounded-2xl p-6 backdrop-blur border border-white/20 text-center glass animate-floating"
                >
                  <h4 className="text-yellow-secondary text-xl font-semibold mb-2">
                    {lang === "ar" ? b.arT : b.enT}
                  </h4>
                  <p className="text-white/90 text-sm">
                    {lang === "ar" ? b.ar : b.en}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* contact cta anchor for smooth scroll */}
          <div id="contact-hopn" />
        </section>
      </div>
    </main>
  );
};

export default Home;
