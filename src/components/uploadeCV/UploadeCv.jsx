import React, { useEffect, useState } from "react";
import { ar, en } from "../../assets/langs/translation";
import { useSelector } from "react-redux";
import { CvFormData } from "../../assets/helpers/formInputsData";
import server from "../../assets/axios/server";
import { toast } from "react-toastify";

const UploadeCv = ({ setOpenUploaderCv, setCvLoadedSuccess }) => {
  const { user } = useSelector((state) => state.user);
  const [countries, setCountries] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [cvData, setCvData] = useState({
    residence: "",
    about_you: "",
    age: "",
    type: "male",
    travel: "no",
    image: "",
    country_id: "3",
    whatsnumber: "",
    job: "",
  });


  const uploadeCV = () => {
    server
      .post("/save-cv", cvData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setOpenUploaderCv(false)
        setCvLoadedSuccess(true)

      })
      .catch((error) => {
        toast.error(error.response.data.message || currentLang.error)
      });
  };

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;

  // get countries
  useEffect(() => {
    server
      .get(`/countries-api`)
      .then((res) => {
        setCountries(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container mx-auto overflow-x-hidden overflow-y-auto p-5 mt-10 max-h-[90vh]  rounded-lg bg-white">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {currentLang.uploadeCVtitle}
        </h1>
        <span
          className="cursor-pointer w-[30px] h-[30px] rounded-full bg-[#D9D9D9] flex items-center justify-center "
          onClick={() => {
            setOpenUploaderCv(false);
          }}
        >
          <i class="fas fa-times"></i>
        </span>
      </div>
      {/* <div className="w-full md:w-[80%] mx-auto mt-10 bg-[#e74c3c] rounded-lg p-5 text-white font-[700] ">
        {currentLang.uploadeCVdesc}
      </div> */}
      <div className="mt-10">
        <div className="flex flex-col md:flex-row flex-wrap items-start justify-start w-full px-8 pb-5 gap-4">
          {CvFormData(user).map((input, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-start justify-start w-full md:w-[48%]"
              >
                <label
                  htmlFor={input.title}
                  className="text-[14px] font-[400] text-[#252525]"
                >
                  {input.placeholder}
                </label>
                <input
                  type="text"
                  name={input.title}
                  className="w-full border-[#E1E3EA] rounded bg-[#F9F9F9] text-[#A1A5B7]"
                  value={`${cvData[input.title] || ""}`}
                  onChange={(e) => {
                    const value = e.target.value;
                    const englishOnly = value.replace(
                      /[^a-zA-Z0-9\s.,?!]/g,
                      ""
                    );
                    setCvData((prev) => ({
                      ...prev,
                      [e.target.name]: englishOnly,
                    }));
                  }}
                />
              </div>
            );
          })}

          <div className="flex flex-col items-start justify-start w-full md:w-[48%] ">
            <label
              htmlFor={`country_id`}
              className="text-[14px] font-[400] text-[#252525]"
            >
              Country
            </label>
            <select
              name={"country_id"}
              className="w-full border-[#E1E3EA] rounded bg-[#F9F9F9] text-[#A1A5B7] "
              value={cvData.country || user.country_id}
              onChange={(e) =>
                setCvData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            >
              {countries.map((contry, index) => {
                return (
                  <option key={index} value={contry.id}>
                    {contry.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col items-start justify-start w-full md:w-[48%] ">
            <label
              htmlFor={`type`}
              className="text-[14px] font-[400] text-[#252525]"
            >
              Type
            </label>
            <select
              name={"type"}
              className="w-full border-[#E1E3EA] rounded bg-[#F9F9F9] text-[#A1A5B7] "
              value={cvData.type || "male"}
              onChange={(e) =>
                setCvData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="flex flex-col items-start justify-start w-full md:w-[48%] ">
            <label
              htmlFor={`travel`}
              className="text-[14px] font-[400] text-[#252525]"
            >
              Travel
            </label>
            <select
              name={"travel"}
              className="w-full border-[#E1E3EA] rounded bg-[#F9F9F9] text-[#A1A5B7] "
              value={cvData.country_id || "no"}
              onChange={(e) =>
                setCvData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="flex gap-5 flex-col md:flex-row items-center mt-4 justify-start w-full md:w-[48%]">
            <button
              alt="profileHeader"
              className=" bg-green-400 text-[clamp(10px,1.25vw,24px)] py-[clamp(3px,0.41667vw,8px)] px-[clamp(10px,1.25vw,24px)] text-white rounded-lg cursor-pointer"
              onClick={() => document.getElementById("cvImage").click()}
            >
              uploade CV image
            </button>

            {cvData.image !== "" && (
              <div className="flex flex-col md:flex-row items-center justify-start gap-3 ">
                <span>{cvData.image.name}</span>

                <button
                  onClick={() =>
                    window
                      .open()
                      .document.write(
                        `<img src="${imageUrl}" alt="Uploaded Image" />`
                      )
                  }
                  className="  text-[clamp(10px,1.25vw,24px)] py-[clamp(3px,0.41667vw,8px)] text-black rounded-lg"
                >
                  view image
                </button>
              </div>
            )}

            <input
              accept="image/*"
              type="file"
              id="cvImage"
              name="image"
              onChange={(event) => {
                setCvData((prev) => ({
                  ...prev,
                  [event.target.name]: event.target.files[0],
                }));
                const file = event.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImageUrl(reader.result);
                  };
                  reader.readAsDataURL(file); // Read the file as a data URL
                }else{
                    setImageUrl("")
                    setCvData((prev) => ({
                        ...prev,
                        [event.target.name]:"",
                      }));
                }
                // handelCvImageUrl();
              }}
              className={`hidden`}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center p-5">
        <button
          onClick={uploadeCV}
          className="border-none outline-none rounded-lg px-5 py-2 bg-[#075178] text-white"
        >
          {currentLang.uploadCV}
        </button>
      </div>
    </div>
  );
};

export default UploadeCv;
