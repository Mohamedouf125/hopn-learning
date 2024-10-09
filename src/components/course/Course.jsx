import { useNavigate } from "react-router-dom";
import courseImg from "../../assets/images/home/courceImg.png";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { starSize} from "../../store/slices/ratingStars/ratingStarsSlice";

const Course = ({ course }) => {
  const navigate = useNavigate();
  const { defaultStars } = useSelector((state) => state.ratingStars);
  const dispatch = useDispatch()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 567) {
        dispatch(starSize(12)) 
      } else {
        dispatch(starSize(20)) 
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      onClick={() => navigate(`/courses/course/${course.id}`)}
      className="rounded-[clamp(8px,0.625vw,12px)] border overflow-hidden cursor-pointer min-h-[215px] md:min-h-[260px] border-[#D9D9D9] w-[49%] md:w-[260px]"
    >
      <div>
        <img
          src={course.image || courseImg}
          alt="cv image"
          className="w-full"
        />
      </div>
      <div className=" w-full  p-3 flex flex-col items-start justify-start">
        <h3 className="font-[600] text-[clamp(10px,0.7291666666666666vw,14px)] line-clamp-2 overflow-hidden text-ellipsis whitespace-normal ">
          {course.title}
        </h3>
        <p
          className="font-[400] text-[clamp(8px,0.625vw,12px)] line-clamp-2 overflow-hidden text-ellipsis whitespace-normal"
          dangerouslySetInnerHTML={{ __html: course.description }}
        />
        <div className="flex w-full items-center justify-start gap-1">
          <ReactStars {...defaultStars} />
          <span className="font-[400] text-[clamp(10px,0.7291666666666666vw,14px)] text-[#1B1B1B99] ">
            {`(${Math.floor(Math.random() * (10000 - 100 + 1)) + 100})`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Course;
