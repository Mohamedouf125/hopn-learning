import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchHomeData } from "../../store/slices/home/homeDataSlice";
import { ar, en } from "../../assets/langs/translation";
import TraineeCard from "../../components/trainee/TraineeCard";
import { Helmet } from "react-helmet";

const Trainees = () => {
  const dispatch = useDispatch();

  // feach home data from backend
  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const { trainers} = useSelector((state) => state.home);

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;

  return (
    <main className="container mx-auto mb-10">
      {/* helmet to change page head */}
       <Helmet>
        <title>SportsIn - Trainers</title>
      </Helmet>

      <section className="w-full flex flex-col items-center justify-center mt-10">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            {currentLang.trainersTitle}
          </h2>
        </div>
        <div className="flex items-start w-full mx-auto justify-center gap-[clamp(10px,1.0416666666666665vw,15px)] flex-wrap ">
          {trainers.map((trainee, index) => {
            return (
              <TraineeCard key={index} trainee={trainee} />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Trainees;
