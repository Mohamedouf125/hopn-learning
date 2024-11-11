import React from "react";
import { ar, en } from "../../assets/langs/translation";
import { useSelector } from "react-redux";

const Cvpopup = ({ cv, setopencvpopup }) => {
  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang == "en" ? en : ar;

  return (
    <div
      style={{ direction: "ltr" }}
      className="absolute top-[5%] rounded-xl bg-white left-[50%] h-[90vh] w-full max-w-md flex-col overflow-auto translate-x-[-50%]  flex items-start justify-start z-50"
    >
      <div className="relative rounded-lg shadow-2xl flex items-center justify-center flex-col py-5 p-6 w-full max-w-md">
        <div className="flex justify-start items-start flex-col">
          <button
            className="absolute p-2 text-[18px] top-3 right-3 text-white w-[24px] h-[24px] bg-red-600 flex items-center justify-center rounded-[50%] "
            onClick={() => {
              setopencvpopup(false);
            }}
          >
            &times;
          </button>
          <h2 className="text-2xl font-semibold w-full text-center text-gray-800">
            User Information
          </h2>

          <a className="w-full mt-6" target="_blank" href={cv.image}>
            <img
              src={cv.image}
              alt="User"
              className=" border-4 w-[250px] h-[200px] rounded-xl mx-auto shadow-md"
            />
          </a>

          <div className="text-left w-full flex items-start justify-start flex-col gap-4 mt-4">
            <p className="text-gray-600 w-full text-center">
              <strong>Job: </strong>
              <span className="text-gray-800">{cv.job}</span>
            </p>
            <p className="text-gray-600 mt-2">
              <strong>About: </strong>
              <span className="text-gray-800">{cv.about_you}</span>
            </p>
            <p className="text-gray-600">
              <strong>Country: </strong>
              <span className="text-gray-800">{cv.country}</span>
            </p>
            <p className="text-gray-600">
              <strong>Can Travel: </strong>
              <span className="text-gray-800">{cv.travel}</span>
            </p>
            <p className="text-gray-600">
              <strong>Address: </strong>
              <span className="text-gray-800">{cv.residence}</span>
            </p>
            <p className="text-gray-600">
              <strong>Age: </strong>
              <span className="text-gray-800">{cv.age}</span>
            </p>
            <p className="text-gray-600">
              <strong>Type: </strong>
              <span className="text-gray-800">{cv.type}</span>
            </p>
            <p className="text-gray-600 w-full">
              <a
                target="_blank"
                href={`https://wa.me/${cv.whatsnumber}`}
                className="font-[400] rounded-lg block text-center text-white px-5 py-2 w-full bg-[#25d366] text-[14px] mt-2 "
              >
                {currentLang.whatsapp}
              </a>
            </p>
          </div>

          <button
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
            onClick={() => {
              setopencvpopup(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cvpopup;
