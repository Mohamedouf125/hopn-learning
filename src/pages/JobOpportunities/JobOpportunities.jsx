import React from "react";
import JobCard from "../../components/jobOpportunity/JobCard";
import { Helmet } from "react-helmet";
import { ar, en } from "../../assets/langs/translation";
import { useSelector } from "react-redux";

const JobOpportunities = () => {
  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;
  return (
    <main className="container mx-auto mb-10">
    {/* helmet to change page head */}
    <Helmet>
      <title>SportsIn - Jobs</title>
    </Helmet>

    <section className="w-full flex flex-col items-center justify-center mt-10">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4 text-left">
          {currentLang.JobOpportunities}
        </h2>
      </div>
      <div className="flex items-start w-full mx-auto justify-center gap-[clamp(10px,1.0416666666666665vw,15px)] flex-wrap ">
        {[1,2,3,4]?.map((lecture, index) => {
          return <JobCard key={index} lecture={lecture} />;
        })}
      </div>
    </section>
  </main>
  );
}; 

export default JobOpportunities;
