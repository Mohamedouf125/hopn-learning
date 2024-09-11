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
      .catch((error) => console.log(error));
  }, []);
  return (
    <main className="container mx-auto overflow-hidden p-5 flex flex-col items-start justify-start">
      <p
        className="font-[400] text-[12px] mt-10"
        dangerouslySetInnerHTML={{ __html: terms?.privacy }}
      />
      <p
        className="font-[400] text-[12px] mt-10"
        dangerouslySetInnerHTML={{ __html: terms?.certificates }}
      />
      <p
        className="font-[400] text-[12px] mt-10"
        dangerouslySetInnerHTML={{ __html: terms?.training_programs }}
      />
    </main>
  );
};

export default About;
