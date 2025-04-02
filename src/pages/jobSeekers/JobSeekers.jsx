import { useDispatch, useSelector } from "react-redux";
import { ar, en } from "../../assets/langs/translation";

import JobSeeker from "./JobSeeker";
import { useEffect, useState } from "react";
import server from "../../assets/axios/server";

const JobSeekers = () => {
  const [jobSeekers, setjobSeekers] = useState([]);
  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;

  //   get data from api
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await server.get("/applications-api");
        setjobSeekers(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <main className="container mx-auto mb-10 flex items-center justify-center ">
      <section className="w-full flex flex-col items-center justify-center mt-10">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            {currentLang.JobSeeker}
          </h2>
        </div>
        <div className="flex items-start px-3 justify-center gap-[clamp(5px,1.0416666666666665vw,20px)] flex-wrap w-full">
          {jobSeekers?.map((cv, index) => {
            return <JobSeeker cv={cv} key={index} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default JobSeekers;
