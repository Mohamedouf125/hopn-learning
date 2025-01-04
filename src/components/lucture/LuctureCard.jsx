import { useSelector } from "react-redux";
import cvImg from "../../assets/images/home/cvImg.png";
import { ar, en } from "../../assets/langs/translation";
import lectureBanner from "../../assets/images/luctures/lectureBanner.png";

const LuctureCard = ({ trainee }) => {
  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;

  return (
    <div
      className={` ${
        lang === "en" ? "ltr" : "rtl"
      }  flex-col w-[238px] border border-[#F1F1F2] rounded-[8px] max-w-[100%] overflow-hidden flex items-center justify-between `}
    >
      <div class="relative block !h-[74px] w-full">
        <img
          src={lectureBanner}
          alt="Background"
          class=" rounded-[8px] w-full !h-[74px] z-0"
        />
      </div>

      <div className="flex px-[10px] bg-white rounded-[12px] items-stretch justify-between w-full flex-col z-20 mt-[-15px]">
        <div className="flex gap-[7px]  items-center justify-start w-full ">
          <div className="border-4 ms-[10px] border-[#fff] rounded-full bg-[#fff] mt-[-50px] !w-[70px] !h-[70px] flex items-center justify-center">
            <img
              className="rounded-full !w-full !h-full "
              src={trainee.image || cvImg}
              alt="trainee"
            />
          </div>
          <div className="flex flex-col items-start justify-start">
            <h2 className="text-[12px] font-[600] font-[Cairo] text-[#000] w-full text-nowrap">
              {trainee.name}
            </h2>
            <span className="text-[6px] font-[600] font-[Cairo] text-[#898989]">
              {trainee.code}
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col items-start justify-start">
          <ul className="flex flex-col items-start justify-start">
            {trainee.courses.map((cource, index) => {
              if (index > 1) {
                return null;
              }

              if (index === 1) {
                return (
                  <li key={index} className="text-[8px] text-[#263238] font-[500] font-[inter] ">
                    - {cource.title}....{currentLang.SeeMore}
                  </li>
                );
              }
              return (
                <li key={index} className="text-[8px] text-[#263238] font-[500] font-[inter] ">
                  - {cource.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LuctureCard;
