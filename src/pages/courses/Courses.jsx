import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { fetchHomeData } from "../../store/slices/home/homeDataSlice";
import { ar, en } from "../../assets/langs/translation";
import FullPagePopup from "../../components/popups/FullPagePopup";
import Course from "../../components/course/Course";

const Courses = () => {
  const dispatch = useDispatch();
  const [openMessage, setOpenMessage] = useState(false);

  // feach home data from backend
  useEffect(() => {
    dispatch(fetchHomeData());
  }, []);

  const { courses, status, error } = useSelector((state) => state.home);


  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang == "en" ? en : ar;

  return (
    <main className="container mx-auto mb-10">
      {openMessage && (
        <FullPagePopup>
          <div className="container mx-auto overflow-x-hidden overflow-y-auto p-5 mt-14 max-h-[90vh]  rounded-lg bg-white">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900"></h1>
              <span
                className="cursor-pointer w-[30px] h-[30px] rounded-full bg-[#D9D9D9] flex items-center justify-center "
                onClick={() => setOpenMessage(false)}
              >
                <i class="fas fa-times"></i>
              </span>
            </div>
            <div className="w-full flex flex-col items-center justify-start mt-10 px-5">
              <h2 className="mb-5">{currentLang.welcome}</h2>
              <p className="w-full md:w-[80%] mx-auto">
                {currentLang.popupMessage}{" "}
                <a
                  href="https://wa.me/971544066811"
                  target="_blank"
                  className="underline"
                >
                  {currentLang.pcustomerService}
                </a>
              </p>
            </div>
            <div className="w-full flex flex-col items-center justify-start mt-10">
              <button
                onClick={() => setOpenMessage(false)}
                className="px-5 text-white py-2 bg-[#0A142F] rounded-lg text-[18px] font-[600]"
              >
                {currentLang.close}
              </button>
            </div>
          </div>
        </FullPagePopup>
      )}
      <section className="w-full flex flex-col items-center justify-center mt-[clamp(10px,2.083333333333333vw,40px)]">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-[clamp(12px,1.0416666666666665vw,20px)] font-semibold mb-4 text-center w-full md:text-start px-20">
            {currentLang.allCourses}
          </h2>
        </div>
        <div className="flex items-center px-3 justify-center  gap-[clamp(5px,1.0416666666666665vw,20px)] flex-wrap w-full">
          {courses.map((course, index) => {
            return <Course course={course} key={index} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default Courses;
