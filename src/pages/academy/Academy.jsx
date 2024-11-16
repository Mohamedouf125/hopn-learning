import { useEffect, useState } from "react";
import server from "../../assets/axios/server";
import AcademyCard from "../../components/academy/AcademyCard";
import AcademyFilters from "../../components/academy/AcademyFilters";
import AcademySwiper from "../../components/academy/AcademySwiper";
import "./academy.css";
import { useSelector } from "react-redux";
import { ar, en } from "../../assets/langs/translation";

const Academy = () => {
  const [academias, setAcademias] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [filters, setfilters] = useState({ country: "all", type: "all" });

  // get data form backend
  useEffect(() => {
    server
      .get("/academias-api")
      .then((data) => {
        console.log(data.data);
        setSliders(data.data.sliders);

        // filter logic
        if (filters.country === "all") {
          setAcademias(data.data.academias);
        } else {
          const filteredAcademias = data.data.academias.filter(
            (academia) => academia.country === filters.country
          );
          setAcademias(filteredAcademias);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [server, filters]);

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;

  return (
    <div className="container mx-auto lg:max-w-[1140px] flex flex-col items-center justify-center px-[5px] sm:px-0 mb-[50px]">
      {/* swiper */}
      <AcademySwiper slides={sliders} />

      {/* filters section */}
      <AcademyFilters setfilters={setfilters} filters={filters} />

      {/* cards */}
      <div className="w-full flex flex-wrap gap-[clamp(5px,1.0416666666666665vw,20px)] items-stretch justify-center sm:justify-start mt-[20px] ">
        {academias.length === 0 ? (
          <div className="w-full  min-h-[500px] font-[cairo] font-extrabold text-[#0000009f] text-[25px] flex items-center justify-center">{currentLang.noInstitutions}</div>
        ) : (
          academias.map((cardData, index) => {
            return <AcademyCard key={index} cardData={cardData} />;
          })
        )}
      </div>
    </div>
  );
};

export default Academy;
