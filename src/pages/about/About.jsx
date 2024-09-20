import { useEffect, useState } from "react";
import server from "../../assets/axios/server";

const About = () => {
  const [terms, setTerms] = useState(null);
  // featch data from backend
  useEffect(() => {
    server
      .get(`/settings`)
      .then((res) => {
        console.log(res.data);
        setTerms(res.data);
      })
      .catch((error) => console.log()); 
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  return (
    <main className="container mx-auto overflow-hidden p-5 flex flex-col items-start justify-start">
      <p
        className="font-[400] text-[12px] mt-10"
        id="privacy"
        dangerouslySetInnerHTML={{ __html: terms?.privacy }}
      />
      <p
      id="rulesCertificates"
        className="font-[400] text-[12px] mt-10"
        dangerouslySetInnerHTML={{ __html: terms?.certificates }}
      />
      <p
      id="rulesCourse"
        className="font-[400] text-[12px] mt-10"
        dangerouslySetInnerHTML={{ __html: terms?.training_programs }}
      />
    </main>
  );
};

export default About;
