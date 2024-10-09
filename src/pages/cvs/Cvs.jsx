import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchHomeData } from "../../store/slices/home/homeDataSlice";
import { ar, en } from "../../assets/langs/translation";

import Cv from "../../components/cv/Cv";

const Cvs = () => {
  const dispatch = useDispatch();

  // feach home data from backendz
  useEffect(() => {
    dispatch(fetchHomeData());
  }, []);

  const { cvs, status, error } = useSelector((state) => state.home);

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;

  return (
    <main className="container mx-auto mb-10">
      <section className="w-full flex flex-col items-center justify-center mt-10">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            {currentLang.cvSectoinTitle}
          </h2>
        </div>
        <div className="flex items-start px-3  justify-center gap-10 flex-wrap w-full">
          {cvs.map((cv, index) => {
            return <Cv cv={cv} key={index} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default Cvs;
