import "./trainers.css";

import { ar, en } from "../../assets/langs/translation";
import { useSelector } from "react-redux";
import TrainersFilters from "../../components/trainers/TrainersFilters";
import { useEffect, useState } from "react";
import server from "../../assets/axios/server";
import TrainersCard from "../../components/trainers/TrainersCard";
import TrainerForm from "../../components/profile/TrainerForm";

const Trainers = () => {
  const [filters, setfilters] = useState({
    type: "trainers",
  });
  const [trainers, setTrainers] = useState([]);

  // featch trainers form backend
  useEffect(() => {
    server
      .get("/trainer-requests/status/done")
      .then((res) => {
        setTrainers(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;

  return (
    <div className="container mx-auto max-w-[1060px] flex flex-col items-center justify-center px-[5px] sm:px-0 mb-[50px]">
      {/* trianers modal */}
      <TrainerForm />

      {/* join now section */}
      <div className="flex w-full max-w-[1060px]  items-center justify-between bg-[#0751781A] border border-[#0751784D] rounded-[12px] p-[12px] mt-[20px] ">
        <h2 className="font-[Cairo] text-[clamp(10px,0.625vw,12px)] font-[700] leading-[clamp(15px,1.1458333333333333vw,22px)] text-[#075178] ">
          {currentLang.joinInstitutions}
        </h2>
        <a
          onClick={() => document.getElementById("trainerForm").showModal()}
          target="_blank"
          className="font-[Cairo] text-[clamp(10px,0.625vw,12px)] text-nowrap font-[400] leading-[clamp(15px,1.1458333333333333vw,22px)] text-[#fff] rounded-[8px] bg-[#075178] py-[clamp(5px,0.46875vw,9px)] px-[clamp(10px,2.604166666666667vw,50px)] "
        >
          {currentLang.joinNow}
        </a>
      </div>

      {/* filters section */}
      {/* <TrainersFilters setfilters={setfilters} filters={filters} /> */}

      {/* cards */}
      <div className="w-full flex flex-wrap gap-[clamp(5px,1.0416666666666665vw,20px)] items-stretch justify-center mt-[20px] ">
        {trainers.length === 0 ? (
          <div className="w-full  min-h-[500px] font-[cairo] font-extrabold text-[#0000009f] text-[25px] flex items-center justify-center">
            {currentLang.noInstitutions}
          </div>
        ) : (
          trainers.map((cardData, index) => {
            return <TrainersCard key={index} cardData={cardData} />;
          })
        )}
      </div>
    </div>
  );
};

export default Trainers;
