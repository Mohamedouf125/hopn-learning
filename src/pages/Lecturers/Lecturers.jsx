import {  useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ar, en } from "../../assets/langs/translation";
import { Helmet } from "react-helmet";
import LuctureCard from "../../components/lucture/LuctureCard";
import server from "../../assets/axios/server";

const Lecturers = () => {
  const [lectures, setLectures] = useState([]);

  // feach lectures data from backend
  useEffect(() => {
    server.get(`/lecture-requests/status/done`).then((res) => {
      setLectures(res.data.data);
      console.log(res.data.data);
    })
  }, []);


  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;

  return (
    <main className="container mx-auto mb-10">
      {/* helmet to change page head */}
       <Helmet>
        <title>SportsIn - Lectures</title>
      </Helmet>

      <section className="w-full flex flex-col items-center justify-center mt-10">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            {currentLang.Lecturers}
          </h2>
        </div>
        <div className="flex items-start w-full mx-auto justify-center gap-[clamp(10px,1.0416666666666665vw,15px)] flex-wrap ">
          {lectures?.map((lecture, index) => {
            return (
              <LuctureCard key={index} lecture={lecture} />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Lecturers;
