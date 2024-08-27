import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import courceImg from "../../assets/images/home/courceImg.png";
import ReactStars from "react-rating-stars-component";

const Courses = () => {
  const { sliders, cvs, courses, status, users, error } = useSelector(
    (state) => state.home
  );
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
          {courses.map((cource, index) => {
            return (
              <div
                key={index}
                className="rounded-3xl border overflow-hidden min-h-[285px] border-[#D9D9D9] w-[260px]"
              >
                <div>
                  <img
                    src={cource.image || courceImg}
                    alt="cv image"
                    className="w-full"
                  />
                </div>
                <div className=" w-full  p-3 flex flex-col items-start justify-start">
                  <h3 className="font-[600] line-clamp-2 overflow-hidden text-ellipsis whitespace-normal ">
                    {cource.title}
                  </h3>
                  <p
                    className="font-[400] text-[12px] line-clamp-2 overflow-hidden text-ellipsis whitespace-normal"
                    dangerouslySetInnerHTML={{ __html: cource.description }}
                  />
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
      </section>
    </main>
  );
};

export default Courses;
