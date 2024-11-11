import { useSelector } from "react-redux";
import cvImg from "../../assets/images/home/cvImg.png";
import { ar, en } from "../../assets/langs/translation";
import footerLogo from "../../assets/images/logo/footerLogo.png";
import qecode from "../../assets/images/logo/qecode.png";

const TraineeCard = ({ trainee }) => {
  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;

  return (
    <div className={` ${lang === "en" ? "ltr" : "rtl"}  flex-col w-[400px] h-[300px] border border-[#075178] max-w-[100%] rounded-lg overflow-hidden flex items-center justify-between `}>
      <div
        className="w-full p-[15px] flex items-center justify-end"
        style={{ background: "var(--blue-primary)" }}
      >
        <div className="border w-[50px] border-[#fff] rounded-full p-[10px] ">
          <img className="w-full " src={footerLogo} alt="logo" />
        </div>
      </div>

      <div className="flex px-[15px] items-stretch justify-between w-full" >
        <div className="flex gap-[10px] flex-col items-center justify-start mt-[-80px] w-[35%] ">
          <h2 className="text-[16px ] text-white w-full text-nowrap">{trainee.name}</h2>
          <div className="border-4 border-[#ed7778] rounded-lg bg-[#fff] w-[100%]">
            <img className="rounded-lg w-full h-[116px] " src={trainee.image || cvImg} alt="trainee" />
          </div>
          <span>{trainee.code}</span>
        </div>
        <div className="w-[60%] mt-[-40px] flex flex-col items-start justify-between">
          <div className="bg-[#ed7778] w-fit py-[5px] px-[15px] text-white rounded-lg ">{currentLang.program}:</div>
          <ul className="mt-[15px]  h-[75px]">
            {trainee.courses.map((cource, index) => {
              return <li key={index} className="text-[10px] ">{cource.title}</li>;
            })}
          </ul>
          <div className="flex w-full items-center justify-end  ">
            <img className="w-[50px] mt[5px]" src={qecode} alt="qecode" />
          </div>
        </div>
      </div>
      <div className="w-full flex font-extrabold items-center justify-center text-[#075178] py-[5px] bg-[#ed7778] text-[18px] ">
        {trainee.country}
      </div>
      {/* <a target="_blank" href={trainee.image}>
        <img
          src={trainee.image || cvImg}
          alt="cv image"
          className="w-[130px] h-[150px] rounded  "
        />
      </a> */}
      {/* <div className="flex items-start justify-start flex-col gap-1">
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
      </div> */}
    </div>
  );
};

export default TraineeCard;
