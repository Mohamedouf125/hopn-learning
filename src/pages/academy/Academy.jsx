import { useEffect, useState } from "react";
import server from "../../assets/axios/server";
import AcademyCard from "../../components/academy/AcademyCard";
import AcademyFilters from "../../components/academy/AcademyFilters";
import AcademySwiper from "../../components/academy/AcademySwiper";
import "./academy.css";

const Academy = () => {
  const [academias, setAcademias] = useState([])
  const [sliders, setSliders] = useState([])
  // get data form backend
  useEffect(() => {
    server.get("/academias-api").then((data) => {
      console.log(data.data);
      setAcademias(data.data.academias)
      setSliders(data.data.sliders)
    }).catch((error) => {console.log(error);
    })
  }, [server]);

  return (
    <div className="container mx-auto lg:max-w-[1140px] flex flex-col items-center justify-center px-[5px] sm:px-0 mb-[50px]">
      {/* swiper */}
      <AcademySwiper slides={sliders} />

      {/* join now section */}
      <div className="flex w-full max-w-[1060px]  items-center justify-between bg-[#0751781A] border border-[#0751784D] rounded-[12px] p-[12px] mt-[20px] ">
        <h2 className="font-[Cairo] text-[clamp(10px,0.625vw,12px)] font-[700] leading-[clamp(15px,1.1458333333333333vw,22px)] text-[#075178] ">
          انضم الينا الان واعرض اكاديميتك لفتح لك فرص لمتدربين اكتر مع اسبوررتس
          ان
        </h2>
        <button className="font-[Cairo] text-[clamp(10px,0.625vw,12px)] text-nowrap font-[400] leading-[clamp(15px,1.1458333333333333vw,22px)] text-[#fff] rounded-[8px] bg-[#075178] py-[clamp(5px,0.46875vw,9px)] px-[clamp(10px,2.604166666666667vw,50px)] ">
          انضم الان
        </button>
      </div>

      {/* filters section */}
      <AcademyFilters />

      {/* cards */}
      <div className="w-full flex flex-wrap gap-[clamp(5px,1.0416666666666665vw,20px)] items-stretch justify-center sm:justify-start mt-[20px] ">
        {academias.map((cardData, index) => {
          return <AcademyCard key={index} cardData={cardData} />;
        })}
      </div>
    </div>
  );
};

export default Academy;