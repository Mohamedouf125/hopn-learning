import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseBanner,
  fetchCourseData,
} from "../../store/slices/courses/courceSlice";
import { useParams } from "react-router-dom";
import { ar, en } from "../../assets/langs/translation";
import useCopyToClipboard from "../../assets/hooks/useCopyToClipboard";
import { toast } from "react-toastify";
import useUserLoggedIn from "../../assets/hooks/useUserLoggedIn";

const Course = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { copyToClipboard } = useCopyToClipboard();
  const loggedIn = useUserLoggedIn();

  useEffect(() => {
    dispatch(fetchCourseData(params.courseId));
    dispatch(fetchCourseBanner());
  }, [dispatch]);

  const { course, courseBanner } = useSelector((state) => state.course);

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang == "en" ? en : ar;

  return (
    <main>
      <div className="container mx-auto my-10">
        <section className="w-full flex items-center justify-center flex-col p-5">
          <h2 className="w-full text-start my-5 text-[18px] md:text-[30px] font-[700] font-['Cairo'] ">
            {course.title}
          </h2>
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0 ">
            <div className="flex items-center justify-center w-full md:w-[60%]  rounded-2xl overflow-hidden">
              <img
                className="rounded-2xl w-full"
                src={course.image}
                alt="course image"
              />
            </div>
            <div className="flex items-center justify-center w-full md:w-[30%] overflow-hidden bg-[#F1F1F2] rounded-2xl">
              <img className="w-full" src={courseBanner[1]?.url} alt="Banner" />
            </div>
          </div>
          <div className="w-full flex items-center justify-between flex-col md:flex-row mt-10">
            <div className="flex items-center justify-center w-full md:w-[60%]  rounded-2xl overflow-hidden">
              <p
                className="text-[16px] font-[400] font-['Cairo']"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </div>

            <div className="flex items-start justify-start overflow-hidden flex-col rounded-2xl w-full mt-10 md:mt-0 md:w-[30%] min-h-[500px] bg-[#0A142F] text-white relative">
              <img className="w-full" src={courseBanner[0]?.url} alt="Banner" />
              {/* <img
                src={courseAdBg}
                alt="courseAdBg"
                className="absolute bottom-0 right-0 rtl:scale-x-[-1]"
              />
              <h3 className="text-[30px] font-[700] font-['Cairo']">
                {currentLang.courseBannerTitle}
              </h3>
              <p className="text-[15px] font-[600] font-['Cairo'] py-8 ">
                {currentLang.courseBannerDesc}
              </p>
              <button className="text-[12px] font-[700] z-10 px-5 py-2 font-['Cairo'] text-[#FFD130] bg-none border border-[#FFD130]">
                {currentLang.learnMore}
              </button> */}
            </div>
          </div>
          <div className="w-full flex items-center justify-center flex-col md:flex-row mt-10 gap-5">
            <button
              className="flex items-center justify-center gap-2 px-5 text-white py-2 bg-[#0A142F] rounded text-[18px] font-[600]"
              disabled={!loggedIn}
            >
              {currentLang.enrollNow}
            </button>
            <button
              onClick={() => {
                copyToClipboard(window.location.href);
                toast.success("Link copied to clipboard");
              }}
              className="flex items-center justify-center gap-2 px-5 py-2 bg-[#25d366] text-white rounded text-[18px] font-[600]"
            >
              {currentLang.shareCourse}
              <i className="fas fa-share text-white"></i>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Course;
