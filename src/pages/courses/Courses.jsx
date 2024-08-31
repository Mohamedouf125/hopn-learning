import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import courseImg from "../../assets/images/home/courceImg.png";
import ReactStars from "react-rating-stars-component";
import { useEffect } from "react";
import { fetchHomeData } from "../../store/slices/home/homeDataSlice";

const Courses = () => {
  const dispatch = useDispatch();

  // feach home data from backend
  useEffect(() => {
    dispatch(fetchHomeData());
  }, []);

  const { courses, status, error } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const { defaultStars } = useSelector((state) => state.ratingStars);

  return (
    <main className="container mx-auto mb-10">
      <section className="w-full flex flex-col items-center justify-center mt-10">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            Based on your interest
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
