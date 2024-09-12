import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import courseImg from "../../assets/images/home/courceImg.png";
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import { fetchHomeData } from "../../store/slices/home/homeDataSlice";
import { ar, en } from "../../assets/langs/translation";
import FullPagePopup from "../../components/popups/FullPagePopup";

const Courses = () => {
  const dispatch = useDispatch();
  const [openMessage, setOpenMessage] = useState(true);

  // feach home data from backend
  useEffect(() => {
    dispatch(fetchHomeData());
  }, []);

  const { courses, status, error } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const { defaultStars } = useSelector((state) => state.ratingStars);

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang == "en" ? en : ar;

  return (
    <main className="container mx-auto mb-10">
      {openMessage && (
        <FullPagePopup>
          <div className="container mx-auto overflow-x-hidden overflow-y-auto p-5 mt-10 max-h-[90vh]  rounded-lg bg-white">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                {currentLang.editProfile}
              </h1>
              <span
                className="cursor-pointer w-[30px] h-[30px] rounded-full bg-[#D9D9D9] flex items-center justify-center "
                onClick={() => setOpenMessage(false)}
              >
                <i class="fas fa-times"></i>
              </span>
            </div>
          </div>
        </FullPagePopup>
      )}
      <section className="w-full flex flex-col items-center justify-center mt-10">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            {currentLang.allCourses}
          </h2>
        </div>
        <div className="flex items-center justify-center gap-10 flex-wrap w-full">
          {courses.map((course, index) => {
            return (
              <div
                key={index}
                onClick={() => navigate(`/courses/course/${course.id}`)}
                className="rounded-3xl border overflow-hidden cursor-pointer min-h-[285px] border-[#D9D9D9] w-[260px]"
              >
                <div>
                  <img
                    src={course.image || courseImg}
                    alt="cv image"
                    className="w-full"
                  />
                </div>
                <div className=" w-full  p-3 flex flex-col items-start justify-start">
                  <h3 className="font-[600] line-clamp-2 overflow-hidden text-ellipsis whitespace-normal ">
                    {course.title}
                  </h3>
                  <p
                    className="font-[400] text-[12px] line-clamp-2 overflow-hidden text-ellipsis whitespace-normal"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                  <div className="flex w-full items-center justify-start gap-1">
                    <ReactStars {...defaultStars} />
                    <span className="font-[400] text-[14px] text-[#1B1B1B99] ">
                      {`(${
                        Math.floor(Math.random() * (10000 - 100 + 1)) + 100
                      })`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Courses;
