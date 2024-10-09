import { useSelector } from "react-redux";
import cvImg from "../../assets/images/home/cvImg.png";
import { ar, en } from "../../assets/langs/translation";

const TraineeCard = ({ trainee }) => {
  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;

  return (
    <div className="bg-[#D9D9D9] gap-3 p-3 w-[400px] max-w-[100%] rounded-lg relative border border-[#D9D9D9] flex items-center justify-start ">
      <a target="_blank" href={trainee.image}>
        <img
          src={trainee.image || cvImg}
          alt="cv image"
          className="w-[130px] h-[150px] rounded  "
        />
      </a>
      <div className="flex items-start justify-start flex-col gap-1">
        <h3 className="text-[13px] ">
          <span className=" font-[600]">{currentLang.name}</span> : {trainee.name}
        </h3>
        <h3 className="text-[12px] font-[500] ">
          <span className=" font-[600]">{currentLang.Nationality}</span> : {trainee.country}
        </h3>
        <h3 className="text-[12px] font-[500] ">
          <span className=" font-[600]">{currentLang.code}</span> : {trainee.code}
        </h3>
        <h3 className="text-[12px] font-[500] ">
          <span className=" font-[600]">{currentLang.program}</span> :
          <ul className="inline-flex flex-col">
            {trainee.courses.map((cource, index) => {
              return <li key={index}>{cource.title}</li> ;
            })}
          </ul>
        </h3>
        <p
          className="font-[400] text-[14px] mt-2 "
          dangerouslySetInnerHTML={{ __html: trainee.description }}
        />
      </div>
    </div>
  );
};

export default TraineeCard;
