import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHomeData } from "../../store/slices/home/homeDataSlice";
import { ar, en } from "../../assets/langs/translation";

import Cv from "../../components/cv/Cv";
import FullPagePopup from "../../components/popups/FullPagePopup";
import Cvpopup from "../../components/cv/Cvpopup";

const Cvs = () => {
  const dispatch = useDispatch();
  const [opencvpopup, setopencvpopup] = useState(false);
  const [chosedCv, setchosedCv] = useState({});

  // feach home data from backendz
  useEffect(() => {
    dispatch(fetchHomeData());
  }, []);

  const { cvs, status, error } = useSelector((state) => state.home);

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;

  return (
    <main className="container mx-auto mb-10 flex items-center justify-center ">
      {opencvpopup && <FullPagePopup>
        <Cvpopup setopencvpopup={setopencvpopup} cv={chosedCv} />
      </FullPagePopup>}
      <section className="w-full flex flex-col items-center justify-center mt-10">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            {currentLang.cvSectoinTitle}
          </h2>
        </div>
        <div className="flex items-start px-3 justify-center gap-[clamp(5px,1.0416666666666665vw,20px)] flex-wrap w-full">
          {cvs.map((cv, index) => {
            return <Cv setchosedCv={setchosedCv} setopencvpopup={setopencvpopup} cv={cv} key={index} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default Cvs;
