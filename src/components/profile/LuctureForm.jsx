import { useSelector } from "react-redux";
import { ar, en } from "../../assets/langs/translation";
import { useEffect, useRef, useState } from "react";
import server from "../../assets/axios/server";
import { toast } from "react-toastify";
import userAvatar from "../../assets/images/icons/userAvatar.png";

const LuctureForm = () => {
  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;
  const [currentPage, setCurrentPage] = useState(1);
  const [expInputs, setExpInputs] = useState([{ value: null, file: null }]);
  const [achivementInputs, setAchivementInputs] = useState([
    { value: null, file: null },
  ]);
  const [chosedContact, setChosedContact] = useState(1);
  const [workExp, setWorkExp] = useState([
    { job_title: null, work_place: null, num_of_work_years: null },
  ]);
  const [servicesInputs, setServicesInputs] = useState([{ value: null }]);
  const [luctureFormInputs, setLuctureFormInputs] = useState({
    country_id: 17,
    how_to_communicate: "whatsapp",
  });
  const [countries, setCountries] = useState([]);
  const [luctureImage, setLuctureImage] = useState(null);

  const fileInputRef = useRef(null);

  const { token } = useSelector((state) => state.user);

  // get countries
  useEffect(() => {
    server
      .get(`/countries-api`)
      .then((res) => {
        setCountries(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handelNextNavigation = () => {
    currentPage === 1 && setCurrentPage(2);
    currentPage === 2 && setCurrentPage(3);
    currentPage === 3 && setCurrentPage(4);
    currentPage === 4 &&
      server
        .post("/lecture-api", luctureFormInputs, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setCurrentPage(5);
        })
        .catch((error) => {
          toast.error(error.message || currentLang.error);
        });
    if (currentPage === 5) {
      document.getElementById("closeLectureModal").click();
      setCurrentPage(1);
      setLuctureFormInputs({ country_id: 17, how_to_communicate: "whatsapp" });
    }
  };

  const handelPrevNavigation = () => {
    currentPage === 4 && setCurrentPage(3);
    currentPage === 3 && setCurrentPage(2);
    currentPage === 2 && setCurrentPage(1);
  };

  //   exp functoins
  const addItemToExpInputs = () => {
    setExpInputs([...expInputs, { value: null, file: null }]);
  };

  const removeItemFromExpInputs = (index) => {
    const updatedExpInputs = [...expInputs];
    updatedExpInputs.splice(index, 1);
    setExpInputs(updatedExpInputs);
  };

  const handleExpInputChange = (item, index) => {
    const updatedExpInputs = [...expInputs];
    updatedExpInputs[index].value = item.target.value;
    setExpInputs(updatedExpInputs);
  };

  useEffect(() => {
    setLuctureFormInputs((prev) => ({ ...prev, qualifications: expInputs }));
  }, [expInputs]);

  const handleExpFileChange = (item, index) => {
    const updatedExpInputs = [...expInputs];
    updatedExpInputs[index].file = item.target.files[0];
    setExpInputs(updatedExpInputs);
  };

  //   achivement functions

  useEffect(() => {
    setLuctureFormInputs((prev) => ({
      ...prev,
      achievements: achivementInputs,
    }));
  }, [achivementInputs]);

  //   services functions
  const addItemToServicesInputs = () => {
    setServicesInputs([...servicesInputs, { value: null, file: null }]);
  };

  const removeItemFromServicesInputs = (index) => {
    const updatedServicesInputs = [...servicesInputs];
    updatedServicesInputs.splice(index, 1);
    setServicesInputs(updatedServicesInputs);
  };

  const handleServicesInputChange = (item, index) => {
    const updatedServicesInputs = [...servicesInputs];
    updatedServicesInputs[index].value = item.target.value;
    setServicesInputs(updatedServicesInputs);
  };

  useEffect(() => {
    let servicesInputText = "";
    servicesInputs.forEach((service) => {
      servicesInputText += service.value + ",";
    });
    setLuctureFormInputs((prev) => ({ ...prev, filides: servicesInputText }));
  }, [servicesInputs]);

  //   work exp functions
  const addItemToWorkExp = () => {
    setWorkExp([
      ...workExp,
      { job_title: null, work_place: null, num_of_work_years: null },
    ]);
  };

  const removeItemFromWorkExp = (index) => {
    const workExpInputText = [...workExp];
    workExpInputText.splice(index, 1);
    setWorkExp(workExpInputText);
  };

  const handleWorkExpInputChange = (item, index) => {
    const workExpInputText = [...workExp];
    workExpInputText[index][item.target.name] = item.target.value;
    setWorkExp(workExpInputText);
  };

  useEffect(() => {
    setLuctureFormInputs((prev) => ({ ...prev, experiences: workExp }));
  }, [workExp]);

  return (
    <dialog id="luctureForm" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          <button
            id="closeLectureModal"
            className="btn btn-sm btn-circle btn-ghost absolute end-2 top-2"
          >
            ✕
          </button>
        </form>
        {/* modal title */}
        <div className="flex items-end mb-[30px] justify-start gap-[20px] ">
          <h2 className="pb-[20px] border-b border-[#28AF60] text-[#0B274B] font-[400] text-[clamp(20px,2.5vw,36px)] font-[cairo] ">
            {/* {currentLang.JobSeeker} */}
            محاضر معتمد
          </h2>
          <p className="font-[400] text-[clamp(12px,1.1111112vw,16px)] text-[#767676] font-[cairo]">
            {/* {currentLang.searchForJob} */}
            انضم إلى شبكة المحاضرين الرياضيين المعتمدين وشارك خبرتك
          </p>
        </div>

        {/* personal info */}
        {currentPage === 1 && (
          <div className=" border border-[#F1F1F2] mt-30px rounded-[12px] sm:py-[clamp(0px,1.3888888888888888vw,20px)] sm:px-[clamp(0px,2.083333333333333vw,30px)] main-shadow ">
            <div className=" sm:border border-[#F1F1F2] rounded-[8px] main-shadow">
              <div className="flex items-center justify-start gap-[10px] p-[clamp(10px,1.3888888888888888vw,20px)] w-full border-b border-[#F1F1F2] ">
                <svg
                  width="21"
                  height="25"
                  viewBox="0 0 21 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5 12.5C7.17188 12.5 4.5 9.82812 4.5 6.5C4.5 3.21875 7.17188 0.5 10.5 0.5C13.7812 0.5 16.5 3.21875 16.5 6.5C16.5 9.82812 13.7812 12.5 10.5 12.5ZM14.9531 14.0469C18.3281 14.1875 21 16.9531 21 20.3281V22.25C21 23.5156 19.9688 24.5 18.75 24.5H2.25C0.984375 24.5 0 23.5156 0 22.25V20.3281C0 16.9531 2.625 14.1875 6 14.0469L8.25 23L9.75 16.625L8.25 14H12.75L11.25 16.625L12.75 23L14.9531 14.0469Z"
                    fill="#28AF60"
                  />
                </svg>
                <h3>المعلومات الشخصية</h3>
              </div>
              <div className="p-[clamp(10px,2.083333333333333vw,30px)] flex items-start justify-between flex-col sm:flex-row ">
                {/* input group */}
                <div className="flex flex-col w-full sm:w-[31%] items-start justify-start ">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">اسم المحاضر *</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full "
                      name="name"
                      value={luctureFormInputs.name || ""}
                      onChange={(e) => {
                        setLuctureFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text"> مكان التواجد *</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full "
                      name="location"
                      value={luctureFormInputs.location || ""}
                      onChange={(e) => {
                        setLuctureFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </label>
                </div>
                {/* input group */}
                <div className="flex flex-col w-full sm:w-[31%] items-start justify-start ">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text"> المسمي الوظيفي*</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full "
                      name="job_title"
                      value={luctureFormInputs.job_title || ""}
                      onChange={(e) => {
                        setLuctureFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">الجنسية  *</span>
                    </div>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="country_id"
                      onChange={(e) => {
                        setLuctureFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    >
                      {countries.map((country) => (
                        <option value={country.id} key={country.id}>
                          {country.name}{" "}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {/* input group */}
                <div className="flex flex-col w-full sm:w-[31%] items-start justify-start mt-[30px] sm:mt-0 ">
                  <span className="w-full flex items-center justify-start">
                    اضافة صورة شخصية *
                  </span>
                  <div className=" w-full  ">
                    <input
                      type="file"
                      ref={fileInputRef}
                      id="luctureInput"
                      name="image"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setLuctureFormInputs((prev) => ({
                          ...prev,
                          [event.target.name]: file,
                        }));

                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setLuctureImage(reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{ display: "none" }}
                    />

                    <div className="w-full flex items-center justify-center sm:justify-end relative ">
                      <img
                        className="w-[90px] h-[90px] mt-[15px] rounded-full  "
                        src={
                          luctureImage ||
                          userAvatar
                        }
                        alt="job-seeker"
                      />
                      <div className="absolute bottom-[-5px] end-[50%] sm:end-[17%] translate-x-[-50%] flex items-center justify-center gap-[5px] z-20 ">
                        <button
                          className="w-[20px] h-[20px] flex items-center justify-center bg-[#fff] rounded-[6px]  "
                          style={{ boxShadow: "0px 0px 5px 0px #00000024" }}
                          onClick={() =>
                            document.getElementById("luctureInput").click()
                          }
                        >
                          {luctureFormInputs?.image ? (
                            <svg
                              width="13"
                              height="12"
                              viewBox="0 0 13 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.88164 1.79999L2.77663 6.14499C2.62163 6.30999 2.47163 6.63499 2.44163 6.85999L2.25663 8.47999C2.19163 9.06499 2.61163 9.46499 3.19163 9.36499L4.80164 9.08999C5.02664 9.04999 5.34163 8.88499 5.49663 8.71499L9.60164 4.36999C10.3116 3.61999 10.6316 2.76499 9.52664 1.71999C8.42663 0.684986 7.59164 1.04999 6.88164 1.79999Z"
                                stroke="#A1A5B7"
                                stroke-width="0.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M6.19531 2.52502C6.41031 3.90502 7.53031 4.96002 8.92031 5.10002"
                                stroke="#A1A5B7"
                                stroke-width="0.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM17 13H13V17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17V13H7C6.73479 13 6.48043 12.8946 6.2929 12.7071C6.10536 12.5196 6 12.2652 6 12C6 11.7348 6.10536 11.4804 6.2929 11.2929C6.48043 11.1054 6.73479 11 7 11H11V7C11 6.73478 11.1054 6.48043 11.2929 6.29289C11.4804 6.10536 11.7348 6 12 6C12.2652 6 12.5196 6.10536 12.7071 6.29289C12.8946 6.48043 13 6.73478 13 7V11H17C17.2652 11 17.5196 11.1054 17.7071 11.2929C17.8946 11.4804 18 11.7348 18 12C18 12.2652 17.8946 12.5196 17.7071 12.7071C17.5196 12.8946 17.2652 13 17 13Z"
                                fill="#A1A5B7"
                              />
                            </svg>
                          )}
                        </button>
                        {luctureFormInputs?.image && (
                          <button
                            className="w-[20px] h-[20px] flex items-center justify-center bg-[#fff] rounded-[6px]  "
                            style={{ boxShadow: "0px 0px 5px 0px #00000024" }}
                            onClick={() => {
                              setLuctureFormInputs((prev) => ({
                                ...prev,
                                image: null,
                              }));

                              setLuctureImage(null);

                              if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                              }
                            }}
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.11328 11.1213L11.3559 6.87864"
                                stroke="#A1A5B7"
                                stroke-width="0.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11.3559 11.1213L7.11328 6.87866"
                                stroke="#A1A5B7"
                                stroke-width="0.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="w-full flex items-center justify-center sm:justify-end mt-[15px] ">
                      {luctureFormInputs?.image
                        ? luctureFormInputs?.image.name
                        : "Allowed file types: png, jpg, jpeg"}
                    </p>
                  </div>
                </div>
              </div>
              {/* ////////////////////// */}
              {/* input group */}
              <div className="flex w-full items-start justify-start mt-[10px] ">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-[cairo] text-[clamp(10px,0.972vw,14px)] leading-[22px] ">
                      نبذة شخصية *
                    </span>
                  </div>
                  <textarea
                    className="textarea bg-[#F9F9F9]"
                    name="brief_summary"
                    value={luctureFormInputs.brief_summary || ""}
                    onChange={(e) => {
                      setLuctureFormInputs((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  ></textarea>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* learning exprince  */}
        {currentPage === 2 && (
          <div className=" border border-[#F1F1F2] mt-30px rounded-[12px] sm:py-[clamp(0px,1.3888888888888888vw,20px)] sm:px-[clamp(0px,2.083333333333333vw,30px)] main-shadow ">
            <div className=" sm:border border-[#F1F1F2] rounded-[8px] main-shadow">
              <div className="flex items-center justify-start gap-[10px] p-[clamp(10px,1.3888888888888888vw,20px)] w-full border-b border-[#F1F1F2] ">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.3609 19.805C15.1224 19.7864 14.8853 19.753 14.6509 19.705L10.7209 18.805C9.47357 18.519 8.39073 17.7497 7.71013 16.666C7.02954 15.5823 6.80682 14.2728 7.0909 13.025L8.24089 8.02499L7.0909 13.025C6.80682 14.2728 7.02954 15.5823 7.71013 16.666C8.39073 17.7497 9.47357 18.519 10.7209 18.805L14.6409 19.705C14.8786 19.7531 15.1191 19.7865 15.3609 19.805ZM8.79089 5.88499C8.8409 5.775 8.8809 5.665 8.9309 5.565C8.8809 5.665 8.8409 5.805 8.79089 5.88499ZM10.4909 19.805C9.74268 19.6353 9.03547 19.3192 8.41009 18.8747C7.78471 18.4303 7.25355 17.8664 6.84726 17.2156C6.44097 16.5648 6.1676 15.84 6.04293 15.0829C5.91826 14.3259 5.94476 13.5517 6.12089 12.805L7.6109 6.305C7.6109 6.14499 7.7109 6.005 7.7609 5.855L5.4209 6.52499C4.8186 6.69869 4.25644 6.9894 3.76657 7.3805C3.27669 7.7716 2.86871 8.25542 2.56594 8.8043C2.26318 9.35318 2.07157 9.95636 2.00207 10.5793C1.93257 11.2023 1.98654 11.8329 2.1609 12.435L3.8909 18.435C4.06259 19.0393 4.35172 19.6038 4.74174 20.0963C5.13177 20.5887 5.61504 20.9995 6.16393 21.305C6.71282 21.6106 7.31655 21.805 7.94061 21.877C8.56467 21.9491 9.19682 21.8974 9.8009 21.725L13.8009 20.565L10.4909 19.805ZM21.9109 9.575L20.4109 16.105C20.2704 16.7222 20.0097 17.3057 19.6437 17.8222C19.2777 18.3387 18.8136 18.778 18.2778 19.1151C17.7419 19.4522 17.145 19.6804 16.521 19.7868C15.897 19.8931 15.2581 19.8755 14.6409 19.735L10.7209 18.805C9.47357 18.519 8.39073 17.7497 7.71013 16.666C7.02954 15.5823 6.80682 14.2728 7.0909 13.025L8.5909 6.495C8.8835 5.25583 9.65452 4.18277 10.7356 3.51015C11.8167 2.83752 13.12 2.61997 14.3609 2.90499L18.2809 3.80499C18.8981 3.94548 19.4816 4.20617 19.9981 4.57217C20.5146 4.93818 20.9539 5.40234 21.291 5.93814C21.6281 6.47394 21.8563 7.0709 21.9627 7.69491C22.069 8.31892 22.0514 8.95778 21.9109 9.575ZM14.6809 13.145L11.8909 12.415C11.6986 12.3664 11.495 12.396 11.3244 12.4972C11.1539 12.5984 11.0304 12.763 10.9809 12.955C10.9555 13.0502 10.9493 13.1496 10.9628 13.2472C10.9763 13.3449 11.0091 13.4388 11.0594 13.5236C11.1097 13.6084 11.1765 13.6822 11.2557 13.7409C11.335 13.7995 11.4251 13.8417 11.5209 13.865L14.3009 14.595H14.4909C14.6579 14.592 14.8195 14.5348 14.9512 14.432C15.0829 14.3292 15.1775 14.1863 15.2209 14.025C15.2607 13.8371 15.2269 13.641 15.1264 13.4773C15.026 13.3136 14.8665 13.1946 14.6809 13.145ZM17.5909 9.74499L12.8809 8.535C12.6886 8.48642 12.485 8.51596 12.3144 8.61716C12.1439 8.71835 12.0204 8.88297 11.9709 9.075C11.9221 9.26853 11.9513 9.47352 12.0524 9.64566C12.1534 9.8178 12.3181 9.94328 12.5109 9.99499L17.2109 11.195C17.2739 11.2043 17.3379 11.2043 17.4009 11.195C17.5798 11.1904 17.7512 11.122 17.8841 11.0022C18.017 10.8823 18.1026 10.7189 18.1255 10.5414C18.1485 10.3639 18.1072 10.1841 18.0092 10.0343C17.9111 9.88462 17.7628 9.7749 17.5909 9.725V9.74499Z"
                    fill="#28AF60"
                  />
                </svg>
                <h3>الشهادات والانجازات </h3>
              </div>
              <div className="p-[clamp(10px,2.083333333333333vw,30px)] flex items-start justify-between flex-col gap-[clamp(10px,1.388vw,20px)] ">
                {achivementInputs.map((achivementInput, index) => {
                  return (
                    // input group
                    <div
                      key={index}
                      className="flex flex-row w-full gap-[clamp(5px,1.0416666666666665vw,15px)] flex-nowrap items-stretch justify-start "
                    >
                      {index === achivementInputs.length - 1 ? (
                        <button
                          onClick={() =>
                            setAchivementInputs([
                              ...achivementInputs,
                              { value: null, file: null },
                            ])
                          }
                          className="w-[48px] flex items-center justify-center"
                        >
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.3"
                              d="M11.75 14.25H6.75C6.41848 14.25 6.10054 14.1183 5.86612 13.8839C5.6317 13.6495 5.5 13.3315 5.5 13C5.5 12.6685 5.6317 12.3505 5.86612 12.1161C6.10054 11.8817 6.41848 11.75 6.75 11.75H11.75V14.25ZM19.25 11.75H14.25V14.25H19.25C19.5815 14.25 19.8995 14.1183 20.1339 13.8839C20.3683 13.6495 20.5 13.3315 20.5 13C20.5 12.6685 20.3683 12.3505 20.1339 12.1161C19.8995 11.8817 19.5815 11.75 19.25 11.75Z"
                              fill="#4285F4"
                            />
                            <path
                              opacity="0.3"
                              d="M18.2375 0.5H7.7625C3.75153 0.5 0.5 3.75153 0.5 7.7625V18.2375C0.5 22.2485 3.75153 25.5 7.7625 25.5H18.2375C22.2485 25.5 25.5 22.2485 25.5 18.2375V7.7625C25.5 3.75153 22.2485 0.5 18.2375 0.5Z"
                              fill="#4285F4"
                            />
                            <path
                              d="M19.25 11.75H14.25V6.75C14.25 6.41848 14.1183 6.10054 13.8839 5.86612C13.6495 5.6317 13.3315 5.5 13 5.5C12.6685 5.5 12.3505 5.6317 12.1161 5.86612C11.8817 6.10054 11.75 6.41848 11.75 6.75V11.75H6.75C6.41848 11.75 6.10054 11.8817 5.86612 12.1161C5.6317 12.3505 5.5 12.6685 5.5 13C5.5 13.3315 5.6317 13.6495 5.86612 13.8839C6.10054 14.1183 6.41848 14.25 6.75 14.25H11.75V19.25C11.75 19.5815 11.8817 19.8995 12.1161 20.1339C12.3505 20.3683 12.6685 20.5 13 20.5C13.3315 20.5 13.6495 20.3683 13.8839 20.1339C14.1183 19.8995 14.25 19.5815 14.25 19.25V14.25H19.25C19.5815 14.25 19.8995 14.1183 20.1339 13.8839C20.3683 13.6495 20.5 13.3315 20.5 13C20.5 12.6685 20.3683 12.3505 20.1339 12.1161C19.8995 11.8817 19.5815 11.75 19.25 11.75Z"
                              fill="#4285F4"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const updatedAchivementInputs = [
                              ...achivementInputs,
                            ];
                            updatedAchivementInputs.splice(index, 1);
                            setAchivementInputs(updatedAchivementInputs);
                          }}
                          className="w-[48px] flex items-center justify-center"
                        >
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.7401 0.832031H9.33594C7.0816 0.832031 4.91959 1.72756 3.32553 3.32162C1.73147 4.91568 0.835938 7.07769 0.835938 9.33203V20.807C0.873104 23.0367 1.78502 25.1625 3.37507 26.7261C4.96512 28.2896 7.10593 29.1657 9.33594 29.1654H20.8109C23.0284 29.1285 25.1437 28.2264 26.7053 26.6515C28.2669 25.0767 29.1511 22.9539 29.1693 20.7362V9.33203C29.1693 7.08991 28.2835 4.93857 26.7048 3.34653C25.126 1.75449 22.9821 0.850716 20.7401 0.832031ZM20.1026 21.2745C20.0328 21.7512 19.7882 22.1849 19.4164 22.4912C19.0446 22.7976 18.5722 22.9547 18.0909 22.932H12.0701C11.5818 22.9657 11.0988 22.8136 10.7179 22.5062C10.337 22.1989 10.0862 21.7589 10.0159 21.2745L9.4351 14.0495C9.43676 13.9379 9.46116 13.8278 9.5068 13.7259C9.55245 13.6239 9.61838 13.5324 9.70058 13.4569C9.78277 13.3813 9.87951 13.3233 9.98488 13.2863C10.0903 13.2494 10.202 13.2343 10.3134 13.242H19.6918C19.8032 13.2343 19.915 13.2494 20.0203 13.2863C20.1257 13.3233 20.2224 13.3813 20.3046 13.4569C20.3868 13.5324 20.4528 13.6239 20.4984 13.7259C20.5441 13.8278 20.5684 13.9379 20.5701 14.0495L20.1026 21.2745ZM21.5193 11.6129H21.3634C17.1336 11.027 12.8432 11.027 8.61344 11.6129C8.47574 11.6373 8.33458 11.6343 8.19804 11.6041C8.0615 11.5739 7.93227 11.517 7.81776 11.4367C7.70326 11.3564 7.60573 11.2543 7.53077 11.1362C7.45581 11.0182 7.40489 10.8865 7.38094 10.7487C7.35671 10.6108 7.36035 10.4695 7.39163 10.333C7.42291 10.1966 7.48121 10.0678 7.56307 9.95423C7.64494 9.84067 7.74872 9.74466 7.86829 9.67187C7.98786 9.59907 8.1208 9.55095 8.25927 9.53036C9.47901 9.33468 10.7087 9.20699 11.9426 9.14786L12.1693 7.91536C12.2012 7.55036 12.3607 7.20828 12.6198 6.9492C12.8789 6.69012 13.2209 6.53061 13.5859 6.4987H16.4193C16.7843 6.53061 17.1264 6.69012 17.3854 6.9492C17.6445 7.20828 17.804 7.55036 17.8359 7.91536L18.0201 9.06286C19.1959 9.1337 20.4284 9.24703 21.6893 9.4312C21.9681 9.47656 22.218 9.62971 22.385 9.85763C22.5519 10.0856 22.6226 10.37 22.5818 10.6495C22.5611 10.9054 22.4473 11.1448 22.2619 11.3224C22.0766 11.4999 21.8325 11.6033 21.5759 11.6129H21.5193Z"
                              fill="#F1416C"
                            />
                          </svg>
                        </button>
                      )}
                      <label className="form-control w-full">
                        <input
                          type="text"
                          className="input input-bordered sm:w-full "
                          value={achivementInput.value || ""}
                          onChange={(e) => {
                            const updatedAchivementInputs = [
                              ...achivementInputs,
                            ];
                            updatedAchivementInputs[index].value =
                              e.target.value;
                            setAchivementInputs(updatedAchivementInputs);
                          }}
                        />
                      </label>
                      <div className="flex items-center justify-start w-[clamp(100px,9.5vw,136px)]">
                        <input
                          type="file"
                          className="hidden"
                          id={`addAchDoc${index}`}
                          onChange={(e) => {
                            const updatedAchivementInputs = [
                              ...achivementInputs,
                            ];
                            updatedAchivementInputs[index].file =
                              e.target.files[0];
                            setAchivementInputs(updatedAchivementInputs);
                          }}
                        />
                        {achivementInput.file ? (
                          <button
                            onClick={() =>
                              document
                                .getElementById(`addAchDoc${index}`)
                                ?.click()
                            }
                            className="w-full h-full flex items-center justify-center sm:justify-start rounded-[6px] text-[10px] font-[Alexandria] font-[400] border bg-[#C4C4C4] border-[#C4C4C4] gap-[10px] px-[10px] "
                          >
                            <span className="w-full hidden sm:block">
                              تم رفع التوثيق
                            </span>
                            <svg
                              width="19"
                              height="22"
                              viewBox="0 0 19 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_1512_8121)">
                                <path
                                  d="M3.00234 0.21875C2.25984 0.21875 1.65234 0.8375 1.65234 1.59375V20.8438C1.65234 21.6 2.25984 22.2188 3.00234 22.2188H16.5023C17.2448 22.2188 17.8523 21.6 17.8523 20.8438V5.71875L12.4523 0.21875H3.00234Z"
                                  fill="#E2E5E7"
                                />
                                <path
                                  d="M13.7992 5.71875H17.8492L12.4492 0.21875V4.34375C12.4492 5.1 13.0567 5.71875 13.7992 5.71875Z"
                                  fill="#B0B7BD"
                                />
                                <path
                                  d="M17.8469 9.84375L13.7969 5.71875H17.8469V9.84375Z"
                                  fill="#CAD1D8"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1512_8121">
                                  <rect
                                    width="18"
                                    height="22"
                                    fill="white"
                                    transform="translate(0.5)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              document
                                .getElementById(`addAchDoc${index}`)
                                ?.click()
                            }
                            className="w-full h-full flex items-center justify-center sm:justify-start rounded-[6px] text-[10px] font-[Alexandria] font-[400] border border-[#E1E3EA] gap-0 sm:gap-[10px] px-[10px] "
                          >
                            <span className="w-full hidden sm:block">
                              ارفع الشهادة او التوثيق
                            </span>
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.0535 2.49392C12.9114 2.33852 12.7106 2.25 12.5 2.25C12.2894 2.25 12.0886 2.33852 11.9465 2.49392L7.94648 6.86892C7.66698 7.17462 7.68822 7.64902 7.99392 7.92852C8.29963 8.20802 8.77402 8.18678 9.05352 7.88108L11.75 4.9318V16C11.75 16.4142 12.0858 16.75 12.5 16.75C12.9142 16.75 13.25 16.4142 13.25 16V4.9318L15.9465 7.88108C16.226 8.18678 16.7004 8.20802 17.0061 7.92852C17.3118 7.64902 17.333 7.17462 17.0535 6.86892L13.0535 2.49392Z"
                                fill="#1C274C"
                              />
                              <path
                                d="M4.25 15C4.25 14.5858 3.91422 14.25 3.5 14.25C3.08579 14.25 2.75 14.5858 2.75 15V15.0549C2.74998 16.4225 2.74996 17.5248 2.86652 18.3918C2.98754 19.2919 3.24643 20.0497 3.84835 20.6516C4.45027 21.2536 5.20814 21.5125 6.10825 21.6335C6.97522 21.75 8.07754 21.75 9.44513 21.75H15.5549C16.9225 21.75 18.0248 21.75 18.8918 21.6335C19.7919 21.5125 20.5497 21.2536 21.1517 20.6516C21.7536 20.0497 22.0125 19.2919 22.1335 18.3918C22.25 17.5248 22.25 16.4225 22.25 15.0549V15C22.25 14.5858 21.9142 14.25 21.5 14.25C21.0858 14.25 20.75 14.5858 20.75 15C20.75 16.4354 20.7484 17.4365 20.6469 18.1919C20.5482 18.9257 20.3678 19.3142 20.091 19.591C19.8142 19.8678 19.4257 20.0482 18.6919 20.1469C17.9365 20.2484 16.9354 20.25 15.5 20.25H9.5C8.06459 20.25 7.06347 20.2484 6.30812 20.1469C5.57435 20.0482 5.18577 19.8678 4.90901 19.591C4.63225 19.3142 4.4518 18.9257 4.35315 18.1919C4.25159 17.4365 4.25 16.4354 4.25 15Z"
                                fill="#1C274C"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" sm:border border-[#F1F1F2] rounded-[8px] main-shadow">
              <div className="flex items-center justify-start gap-[10px] p-[clamp(10px,1.3888888888888888vw,20px)] w-full border-b border-[#F1F1F2] ">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.3609 19.805C15.1224 19.7864 14.8853 19.753 14.6509 19.705L10.7209 18.805C9.47357 18.519 8.39073 17.7497 7.71013 16.666C7.02954 15.5823 6.80682 14.2728 7.0909 13.025L8.24089 8.02499L7.0909 13.025C6.80682 14.2728 7.02954 15.5823 7.71013 16.666C8.39073 17.7497 9.47357 18.519 10.7209 18.805L14.6409 19.705C14.8786 19.7531 15.1191 19.7865 15.3609 19.805ZM8.79089 5.88499C8.8409 5.775 8.8809 5.665 8.9309 5.565C8.8809 5.665 8.8409 5.805 8.79089 5.88499ZM10.4909 19.805C9.74268 19.6353 9.03547 19.3192 8.41009 18.8747C7.78471 18.4303 7.25355 17.8664 6.84726 17.2156C6.44097 16.5648 6.1676 15.84 6.04293 15.0829C5.91826 14.3259 5.94476 13.5517 6.12089 12.805L7.6109 6.305C7.6109 6.14499 7.7109 6.005 7.7609 5.855L5.4209 6.52499C4.8186 6.69869 4.25644 6.9894 3.76657 7.3805C3.27669 7.7716 2.86871 8.25542 2.56594 8.8043C2.26318 9.35318 2.07157 9.95636 2.00207 10.5793C1.93257 11.2023 1.98654 11.8329 2.1609 12.435L3.8909 18.435C4.06259 19.0393 4.35172 19.6038 4.74174 20.0963C5.13177 20.5887 5.61504 20.9995 6.16393 21.305C6.71282 21.6106 7.31655 21.805 7.94061 21.877C8.56467 21.9491 9.19682 21.8974 9.8009 21.725L13.8009 20.565L10.4909 19.805ZM21.9109 9.575L20.4109 16.105C20.2704 16.7222 20.0097 17.3057 19.6437 17.8222C19.2777 18.3387 18.8136 18.778 18.2778 19.1151C17.7419 19.4522 17.145 19.6804 16.521 19.7868C15.897 19.8931 15.2581 19.8755 14.6409 19.735L10.7209 18.805C9.47357 18.519 8.39073 17.7497 7.71013 16.666C7.02954 15.5823 6.80682 14.2728 7.0909 13.025L8.5909 6.495C8.8835 5.25583 9.65452 4.18277 10.7356 3.51015C11.8167 2.83752 13.12 2.61997 14.3609 2.90499L18.2809 3.80499C18.8981 3.94548 19.4816 4.20617 19.9981 4.57217C20.5146 4.93818 20.9539 5.40234 21.291 5.93814C21.6281 6.47394 21.8563 7.0709 21.9627 7.69491C22.069 8.31892 22.0514 8.95778 21.9109 9.575ZM14.6809 13.145L11.8909 12.415C11.6986 12.3664 11.495 12.396 11.3244 12.4972C11.1539 12.5984 11.0304 12.763 10.9809 12.955C10.9555 13.0502 10.9493 13.1496 10.9628 13.2472C10.9763 13.3449 11.0091 13.4388 11.0594 13.5236C11.1097 13.6084 11.1765 13.6822 11.2557 13.7409C11.335 13.7995 11.4251 13.8417 11.5209 13.865L14.3009 14.595H14.4909C14.6579 14.592 14.8195 14.5348 14.9512 14.432C15.0829 14.3292 15.1775 14.1863 15.2209 14.025C15.2607 13.8371 15.2269 13.641 15.1264 13.4773C15.026 13.3136 14.8665 13.1946 14.6809 13.145ZM17.5909 9.74499L12.8809 8.535C12.6886 8.48642 12.485 8.51596 12.3144 8.61716C12.1439 8.71835 12.0204 8.88297 11.9709 9.075C11.9221 9.26853 11.9513 9.47352 12.0524 9.64566C12.1534 9.8178 12.3181 9.94328 12.5109 9.99499L17.2109 11.195C17.2739 11.2043 17.3379 11.2043 17.4009 11.195C17.5798 11.1904 17.7512 11.122 17.8841 11.0022C18.017 10.8823 18.1026 10.7189 18.1255 10.5414C18.1485 10.3639 18.1072 10.1841 18.0092 10.0343C17.9111 9.88462 17.7628 9.7749 17.5909 9.725V9.74499Z"
                    fill="#28AF60"
                  />
                </svg>
                <h3>المؤهلات والخبرات العلمية</h3>
              </div>
              <div className="p-[clamp(10px,2.083333333333333vw,30px)] flex items-start justify-between flex-col gap-[clamp(10px,1.388vw,20px)] ">
                {expInputs.map((expInput, index) => {
                  return (
                    // input group
                    <div
                      key={index}
                      className="flex flex-row w-full gap-[clamp(5px,1.0416666666666665vw,15px)] flex-nowrap items-stretch justify-start "
                    >
                      {index === expInputs.length - 1 ? (
                        <button
                          onClick={addItemToExpInputs}
                          className="w-[48px] flex items-center justify-center"
                        >
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.3"
                              d="M11.75 14.25H6.75C6.41848 14.25 6.10054 14.1183 5.86612 13.8839C5.6317 13.6495 5.5 13.3315 5.5 13C5.5 12.6685 5.6317 12.3505 5.86612 12.1161C6.10054 11.8817 6.41848 11.75 6.75 11.75H11.75V14.25ZM19.25 11.75H14.25V14.25H19.25C19.5815 14.25 19.8995 14.1183 20.1339 13.8839C20.3683 13.6495 20.5 13.3315 20.5 13C20.5 12.6685 20.3683 12.3505 20.1339 12.1161C19.8995 11.8817 19.5815 11.75 19.25 11.75Z"
                              fill="#4285F4"
                            />
                            <path
                              opacity="0.3"
                              d="M18.2375 0.5H7.7625C3.75153 0.5 0.5 3.75153 0.5 7.7625V18.2375C0.5 22.2485 3.75153 25.5 7.7625 25.5H18.2375C22.2485 25.5 25.5 22.2485 25.5 18.2375V7.7625C25.5 3.75153 22.2485 0.5 18.2375 0.5Z"
                              fill="#4285F4"
                            />
                            <path
                              d="M19.25 11.75H14.25V6.75C14.25 6.41848 14.1183 6.10054 13.8839 5.86612C13.6495 5.6317 13.3315 5.5 13 5.5C12.6685 5.5 12.3505 5.6317 12.1161 5.86612C11.8817 6.10054 11.75 6.41848 11.75 6.75V11.75H6.75C6.41848 11.75 6.10054 11.8817 5.86612 12.1161C5.6317 12.3505 5.5 12.6685 5.5 13C5.5 13.3315 5.6317 13.6495 5.86612 13.8839C6.10054 14.1183 6.41848 14.25 6.75 14.25H11.75V19.25C11.75 19.5815 11.8817 19.8995 12.1161 20.1339C12.3505 20.3683 12.6685 20.5 13 20.5C13.3315 20.5 13.6495 20.3683 13.8839 20.1339C14.1183 19.8995 14.25 19.5815 14.25 19.25V14.25H19.25C19.5815 14.25 19.8995 14.1183 20.1339 13.8839C20.3683 13.6495 20.5 13.3315 20.5 13C20.5 12.6685 20.3683 12.3505 20.1339 12.1161C19.8995 11.8817 19.5815 11.75 19.25 11.75Z"
                              fill="#4285F4"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={() => removeItemFromExpInputs(index)}
                          className="w-[48px] flex items-center justify-center"
                        >
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.7401 0.832031H9.33594C7.0816 0.832031 4.91959 1.72756 3.32553 3.32162C1.73147 4.91568 0.835938 7.07769 0.835938 9.33203V20.807C0.873104 23.0367 1.78502 25.1625 3.37507 26.7261C4.96512 28.2896 7.10593 29.1657 9.33594 29.1654H20.8109C23.0284 29.1285 25.1437 28.2264 26.7053 26.6515C28.2669 25.0767 29.1511 22.9539 29.1693 20.7362V9.33203C29.1693 7.08991 28.2835 4.93857 26.7048 3.34653C25.126 1.75449 22.9821 0.850716 20.7401 0.832031ZM20.1026 21.2745C20.0328 21.7512 19.7882 22.1849 19.4164 22.4912C19.0446 22.7976 18.5722 22.9547 18.0909 22.932H12.0701C11.5818 22.9657 11.0988 22.8136 10.7179 22.5062C10.337 22.1989 10.0862 21.7589 10.0159 21.2745L9.4351 14.0495C9.43676 13.9379 9.46116 13.8278 9.5068 13.7259C9.55245 13.6239 9.61838 13.5324 9.70058 13.4569C9.78277 13.3813 9.87951 13.3233 9.98488 13.2863C10.0903 13.2494 10.202 13.2343 10.3134 13.242H19.6918C19.8032 13.2343 19.915 13.2494 20.0203 13.2863C20.1257 13.3233 20.2224 13.3813 20.3046 13.4569C20.3868 13.5324 20.4528 13.6239 20.4984 13.7259C20.5441 13.8278 20.5684 13.9379 20.5701 14.0495L20.1026 21.2745ZM21.5193 11.6129H21.3634C17.1336 11.027 12.8432 11.027 8.61344 11.6129C8.47574 11.6373 8.33458 11.6343 8.19804 11.6041C8.0615 11.5739 7.93227 11.517 7.81776 11.4367C7.70326 11.3564 7.60573 11.2543 7.53077 11.1362C7.45581 11.0182 7.40489 10.8865 7.38094 10.7487C7.35671 10.6108 7.36035 10.4695 7.39163 10.333C7.42291 10.1966 7.48121 10.0678 7.56307 9.95423C7.64494 9.84067 7.74872 9.74466 7.86829 9.67187C7.98786 9.59907 8.1208 9.55095 8.25927 9.53036C9.47901 9.33468 10.7087 9.20699 11.9426 9.14786L12.1693 7.91536C12.2012 7.55036 12.3607 7.20828 12.6198 6.9492C12.8789 6.69012 13.2209 6.53061 13.5859 6.4987H16.4193C16.7843 6.53061 17.1264 6.69012 17.3854 6.9492C17.6445 7.20828 17.804 7.55036 17.8359 7.91536L18.0201 9.06286C19.1959 9.1337 20.4284 9.24703 21.6893 9.4312C21.9681 9.47656 22.218 9.62971 22.385 9.85763C22.5519 10.0856 22.6226 10.37 22.5818 10.6495C22.5611 10.9054 22.4473 11.1448 22.2619 11.3224C22.0766 11.4999 21.8325 11.6033 21.5759 11.6129H21.5193Z"
                              fill="#F1416C"
                            />
                          </svg>
                        </button>
                      )}
                      <label className="form-control w-full">
                        <input
                          type="text"
                          className="input input-bordered sm:w-full "
                          value={expInput.value || ""}
                          onChange={(e) => handleExpInputChange(e, index)}
                        />
                      </label>
                      <div className="flex items-center justify-start w-[clamp(100px,9.5vw,136px)]">
                        <input
                          type="file"
                          className="hidden"
                          id={`addDocument${index}`}
                          onChange={(e) => handleExpFileChange(e, index)}
                        />
                        {expInput.file ? (
                          <button
                            onClick={() =>
                              document
                                .getElementById(`addDocument${index}`)
                                ?.click()
                            }
                            className="w-full h-full flex items-center justify-center sm:justify-start rounded-[6px] text-[10px] font-[Alexandria] font-[400] border bg-[#C4C4C4] border-[#C4C4C4] gap-[10px] px-[10px] "
                          >
                            <span className="w-full hidden sm:block">
                              تم رفع التوثيق
                            </span>
                            <svg
                              width="19"
                              height="22"
                              viewBox="0 0 19 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_1512_8121)">
                                <path
                                  d="M3.00234 0.21875C2.25984 0.21875 1.65234 0.8375 1.65234 1.59375V20.8438C1.65234 21.6 2.25984 22.2188 3.00234 22.2188H16.5023C17.2448 22.2188 17.8523 21.6 17.8523 20.8438V5.71875L12.4523 0.21875H3.00234Z"
                                  fill="#E2E5E7"
                                />
                                <path
                                  d="M13.7992 5.71875H17.8492L12.4492 0.21875V4.34375C12.4492 5.1 13.0567 5.71875 13.7992 5.71875Z"
                                  fill="#B0B7BD"
                                />
                                <path
                                  d="M17.8469 9.84375L13.7969 5.71875H17.8469V9.84375Z"
                                  fill="#CAD1D8"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1512_8121">
                                  <rect
                                    width="18"
                                    height="22"
                                    fill="white"
                                    transform="translate(0.5)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              document
                                .getElementById(`addDocument${index}`)
                                ?.click()
                            }
                            className="w-full h-full flex items-center justify-center sm:justify-start rounded-[6px] text-[10px] font-[Alexandria] font-[400] border border-[#E1E3EA] gap-0 sm:gap-[10px] px-[10px] "
                          >
                            <span className="w-full hidden sm:block">
                              ارفع الشهادة او التوثيق
                            </span>
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.0535 2.49392C12.9114 2.33852 12.7106 2.25 12.5 2.25C12.2894 2.25 12.0886 2.33852 11.9465 2.49392L7.94648 6.86892C7.66698 7.17462 7.68822 7.64902 7.99392 7.92852C8.29963 8.20802 8.77402 8.18678 9.05352 7.88108L11.75 4.9318V16C11.75 16.4142 12.0858 16.75 12.5 16.75C12.9142 16.75 13.25 16.4142 13.25 16V4.9318L15.9465 7.88108C16.226 8.18678 16.7004 8.20802 17.0061 7.92852C17.3118 7.64902 17.333 7.17462 17.0535 6.86892L13.0535 2.49392Z"
                                fill="#1C274C"
                              />
                              <path
                                d="M4.25 15C4.25 14.5858 3.91422 14.25 3.5 14.25C3.08579 14.25 2.75 14.5858 2.75 15V15.0549C2.74998 16.4225 2.74996 17.5248 2.86652 18.3918C2.98754 19.2919 3.24643 20.0497 3.84835 20.6516C4.45027 21.2536 5.20814 21.5125 6.10825 21.6335C6.97522 21.75 8.07754 21.75 9.44513 21.75H15.5549C16.9225 21.75 18.0248 21.75 18.8918 21.6335C19.7919 21.5125 20.5497 21.2536 21.1517 20.6516C21.7536 20.0497 22.0125 19.2919 22.1335 18.3918C22.25 17.5248 22.25 16.4225 22.25 15.0549V15C22.25 14.5858 21.9142 14.25 21.5 14.25C21.0858 14.25 20.75 14.5858 20.75 15C20.75 16.4354 20.7484 17.4365 20.6469 18.1919C20.5482 18.9257 20.3678 19.3142 20.091 19.591C19.8142 19.8678 19.4257 20.0482 18.6919 20.1469C17.9365 20.2484 16.9354 20.25 15.5 20.25H9.5C8.06459 20.25 7.06347 20.2484 6.30812 20.1469C5.57435 20.0482 5.18577 19.8678 4.90901 19.591C4.63225 19.3142 4.4518 18.9257 4.35315 18.1919C4.25159 17.4365 4.25 16.4354 4.25 15Z"
                                fill="#1C274C"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* work exprince */}
        {currentPage === 3 && (
          <div className=" border border-[#F1F1F2] mt-30px rounded-[12px] sm:py-[clamp(0px,1.3888888888888888vw,20px)] sm:px-[clamp(0px,2.083333333333333vw,30px)] main-shadow ">
            <div className=" sm:border border-[#F1F1F2] rounded-[8px] main-shadow">
              <div className="flex items-center justify-start gap-[10px] p-[clamp(10px,1.3888888888888888vw,20px)] w-full border-b border-[#F1F1F2] ">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.9099 9.7151H14.9099L12.9999 3.9951C12.9305 3.77368 12.7921 3.58021 12.6051 3.44286C12.418 3.30551 12.192 3.23145 11.9599 3.23145C11.7279 3.23145 11.5019 3.30551 11.3148 3.44286C11.1277 3.58021 10.9894 3.77368 10.9199 3.9951L9.09993 9.7151H3.09993C2.86204 9.70611 2.62775 9.77524 2.43285 9.91194C2.23795 10.0486 2.09316 10.2454 2.02061 10.4721C1.94805 10.6989 1.95172 10.9431 2.03105 11.1676C2.11038 11.392 2.26102 11.5843 2.45993 11.7151L7.32993 15.2451L5.45993 20.9351C5.38763 21.1545 5.38691 21.3912 5.45786 21.611C5.52881 21.8309 5.66777 22.0225 5.85469 22.1582C6.04161 22.294 6.26682 22.3668 6.49782 22.3662C6.72882 22.3657 6.95368 22.2917 7.13993 22.1551L11.9999 18.6251L16.8599 22.1551C17.0462 22.2917 17.271 22.3657 17.502 22.3662C17.733 22.3668 17.9583 22.294 18.1452 22.1582C18.3321 22.0225 18.4711 21.8309 18.542 21.611C18.613 21.3912 18.6122 21.1545 18.5399 20.9351L16.6799 15.2151L21.5499 11.6851C21.7353 11.5496 21.8732 11.359 21.9439 11.1405C22.0145 10.922 22.0144 10.6867 21.9434 10.4683C21.8725 10.2499 21.7343 10.0595 21.5487 9.92422C21.3631 9.78896 21.1396 9.71577 20.9099 9.7151Z"
                    fill="#28AF60"
                  />
                </svg>
                <h3> الخبرات العملية</h3>
              </div>
              <div className="p-[clamp(10px,2.083333333333333vw,30px)] flex items-start justify-between flex-col gap-[clamp(10px,1.388vw,20px)] ">
                {workExp.map((workExpinputs, index) => {
                  return (
                    // input group
                    <div
                      key={index}
                      className="flex flex-row w-full gap-[clamp(5px,1.0416666666666665vw,15px)] flex-nowrap items-stretch justify-start "
                    >
                      {index === workExp.length - 1 ? (
                        <button
                          onClick={addItemToWorkExp}
                          className="w-[48px] flex items-center justify-center"
                        >
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.3"
                              d="M11.75 14.25H6.75C6.41848 14.25 6.10054 14.1183 5.86612 13.8839C5.6317 13.6495 5.5 13.3315 5.5 13C5.5 12.6685 5.6317 12.3505 5.86612 12.1161C6.10054 11.8817 6.41848 11.75 6.75 11.75H11.75V14.25ZM19.25 11.75H14.25V14.25H19.25C19.5815 14.25 19.8995 14.1183 20.1339 13.8839C20.3683 13.6495 20.5 13.3315 20.5 13C20.5 12.6685 20.3683 12.3505 20.1339 12.1161C19.8995 11.8817 19.5815 11.75 19.25 11.75Z"
                              fill="#4285F4"
                            />
                            <path
                              opacity="0.3"
                              d="M18.2375 0.5H7.7625C3.75153 0.5 0.5 3.75153 0.5 7.7625V18.2375C0.5 22.2485 3.75153 25.5 7.7625 25.5H18.2375C22.2485 25.5 25.5 22.2485 25.5 18.2375V7.7625C25.5 3.75153 22.2485 0.5 18.2375 0.5Z"
                              fill="#4285F4"
                            />
                            <path
                              d="M19.25 11.75H14.25V6.75C14.25 6.41848 14.1183 6.10054 13.8839 5.86612C13.6495 5.6317 13.3315 5.5 13 5.5C12.6685 5.5 12.3505 5.6317 12.1161 5.86612C11.8817 6.10054 11.75 6.41848 11.75 6.75V11.75H6.75C6.41848 11.75 6.10054 11.8817 5.86612 12.1161C5.6317 12.3505 5.5 12.6685 5.5 13C5.5 13.3315 5.6317 13.6495 5.86612 13.8839C6.10054 14.1183 6.41848 14.25 6.75 14.25H11.75V19.25C11.75 19.5815 11.8817 19.8995 12.1161 20.1339C12.3505 20.3683 12.6685 20.5 13 20.5C13.3315 20.5 13.6495 20.3683 13.8839 20.1339C14.1183 19.8995 14.25 19.5815 14.25 19.25V14.25H19.25C19.5815 14.25 19.8995 14.1183 20.1339 13.8839C20.3683 13.6495 20.5 13.3315 20.5 13C20.5 12.6685 20.3683 12.3505 20.1339 12.1161C19.8995 11.8817 19.5815 11.75 19.25 11.75Z"
                              fill="#4285F4"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={() => removeItemFromWorkExp(index)}
                          className="w-[48px] flex items-center justify-center"
                        >
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.7401 0.832031H9.33594C7.0816 0.832031 4.91959 1.72756 3.32553 3.32162C1.73147 4.91568 0.835938 7.07769 0.835938 9.33203V20.807C0.873104 23.0367 1.78502 25.1625 3.37507 26.7261C4.96512 28.2896 7.10593 29.1657 9.33594 29.1654H20.8109C23.0284 29.1285 25.1437 28.2264 26.7053 26.6515C28.2669 25.0767 29.1511 22.9539 29.1693 20.7362V9.33203C29.1693 7.08991 28.2835 4.93857 26.7048 3.34653C25.126 1.75449 22.9821 0.850716 20.7401 0.832031ZM20.1026 21.2745C20.0328 21.7512 19.7882 22.1849 19.4164 22.4912C19.0446 22.7976 18.5722 22.9547 18.0909 22.932H12.0701C11.5818 22.9657 11.0988 22.8136 10.7179 22.5062C10.337 22.1989 10.0862 21.7589 10.0159 21.2745L9.4351 14.0495C9.43676 13.9379 9.46116 13.8278 9.5068 13.7259C9.55245 13.6239 9.61838 13.5324 9.70058 13.4569C9.78277 13.3813 9.87951 13.3233 9.98488 13.2863C10.0903 13.2494 10.202 13.2343 10.3134 13.242H19.6918C19.8032 13.2343 19.915 13.2494 20.0203 13.2863C20.1257 13.3233 20.2224 13.3813 20.3046 13.4569C20.3868 13.5324 20.4528 13.6239 20.4984 13.7259C20.5441 13.8278 20.5684 13.9379 20.5701 14.0495L20.1026 21.2745ZM21.5193 11.6129H21.3634C17.1336 11.027 12.8432 11.027 8.61344 11.6129C8.47574 11.6373 8.33458 11.6343 8.19804 11.6041C8.0615 11.5739 7.93227 11.517 7.81776 11.4367C7.70326 11.3564 7.60573 11.2543 7.53077 11.1362C7.45581 11.0182 7.40489 10.8865 7.38094 10.7487C7.35671 10.6108 7.36035 10.4695 7.39163 10.333C7.42291 10.1966 7.48121 10.0678 7.56307 9.95423C7.64494 9.84067 7.74872 9.74466 7.86829 9.67187C7.98786 9.59907 8.1208 9.55095 8.25927 9.53036C9.47901 9.33468 10.7087 9.20699 11.9426 9.14786L12.1693 7.91536C12.2012 7.55036 12.3607 7.20828 12.6198 6.9492C12.8789 6.69012 13.2209 6.53061 13.5859 6.4987H16.4193C16.7843 6.53061 17.1264 6.69012 17.3854 6.9492C17.6445 7.20828 17.804 7.55036 17.8359 7.91536L18.0201 9.06286C19.1959 9.1337 20.4284 9.24703 21.6893 9.4312C21.9681 9.47656 22.218 9.62971 22.385 9.85763C22.5519 10.0856 22.6226 10.37 22.5818 10.6495C22.5611 10.9054 22.4473 11.1448 22.2619 11.3224C22.0766 11.4999 21.8325 11.6033 21.5759 11.6129H21.5193Z"
                              fill="#F1416C"
                            />
                          </svg>
                        </button>
                      )}
                      {/* input group */}
                      <div className="flex flex-col w-full sm:w-[48%] items-start justify-start ">
                        <label className="form-control w-full">
                          <input
                            type="text"
                            className="input input-bordered w-full "
                            name="job_title"
                            placeholder=" اسم الوظيفه *"
                            value={workExpinputs.job_title || ""}
                            onChange={(e) => handleWorkExpInputChange(e, index)}
                          />
                        </label>
                      </div>
                      {/* input group */}
                      <div className="flex flex-col w-full sm:w-[48%] items-start justify-start ">
                        <label className="form-control w-full">
                          <input
                            type="number"
                            className="input input-bordered w-full "
                            name="num_of_work_years"
                            placeholder="سنوات الخبره  *"
                            value={workExpinputs.num_of_work_years || ""}
                            onChange={(e) => handleWorkExpInputChange(e, index)}
                          />
                        </label>
                      </div>
                      {/* input group */}
                      <div className="flex flex-col w-full sm:w-[48%] items-start justify-start ">
                        <label className="form-control w-full">
                          <input
                            type="text"
                            className="input input-bordered w-full "
                            name="work_place"
                            placeholder=" جهة العمل *"
                            value={workExpinputs.work_place || ""}
                            onChange={(e) => handleWorkExpInputChange(e, index)}
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* services */}
        {currentPage === 4 && (
          <div className=" border border-[#F1F1F2] mt-30px rounded-[12px] sm:py-[clamp(0px,1.3888888888888888vw,20px)] sm:px-[clamp(0px,2.083333333333333vw,30px)] main-shadow ">
            <div className=" sm:border border-[#F1F1F2] rounded-[8px] main-shadow">
              <div className="flex items-center justify-start gap-[10px] p-[clamp(10px,1.3888888888888888vw,20px)] w-full border-b border-[#F1F1F2] ">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1929_28474)">
                    <path
                      d="M22.9999 24.5H17.9999C17.5999 24.5 17.2389 24.262 17.0809 23.895C16.9229 23.528 16.9989 23.101 17.2749 22.811C18.0669 21.978 19.2419 21.5 20.4999 21.5C21.7579 21.5 22.9329 21.978 23.7249 22.811C24.0009 23.101 24.0769 23.528 23.9189 23.895C23.7609 24.262 23.3999 24.5 22.9999 24.5ZM15.4189 23.895C15.5769 23.528 15.5009 23.101 15.2249 22.811C14.4329 21.978 13.2579 21.5 11.9999 21.5C10.7419 21.5 9.56688 21.978 8.77488 22.811C8.49888 23.101 8.42288 23.528 8.58088 23.895C8.73888 24.262 9.09988 24.5 9.49988 24.5H14.4999C14.8999 24.5 15.2609 24.262 15.4189 23.895ZM6.91888 23.895C7.07688 23.528 7.00088 23.101 6.72488 22.811C5.93288 21.978 4.75788 21.5 3.49988 21.5C2.24188 21.5 1.06688 21.978 0.274884 22.811C-0.00111648 23.101 -0.0771165 23.528 0.0808835 23.895C0.238883 24.262 0.599884 24.5 0.999884 24.5H5.99988C6.39988 24.5 6.76088 24.262 6.91888 23.895ZM3.49988 20.5C4.60488 20.5 5.49988 19.605 5.49988 18.5C5.49988 17.395 4.60488 16.5 3.49988 16.5C2.39488 16.5 1.49988 17.395 1.49988 18.5C1.49988 19.605 2.39488 20.5 3.49988 20.5ZM11.9999 20.5C13.1049 20.5 13.9999 19.605 13.9999 18.5C13.9999 17.395 13.1049 16.5 11.9999 16.5C10.8949 16.5 9.99988 17.395 9.99988 18.5C9.99988 19.605 10.8949 20.5 11.9999 20.5ZM20.4999 20.5C21.6049 20.5 22.4999 19.605 22.4999 18.5C22.4999 17.395 21.6049 16.5 20.4999 16.5C19.3949 16.5 18.4999 17.395 18.4999 18.5C18.4999 19.605 19.3949 20.5 20.4999 20.5ZM4.49988 5.5C5.88088 5.5 6.99988 4.381 6.99988 3C6.99988 1.619 5.88088 0.5 4.49988 0.5C3.11888 0.5 1.99988 1.619 1.99988 3C1.99988 4.381 3.11888 5.5 4.49988 5.5ZM20.4999 0.5H8.23988C8.71888 1.215 8.99988 2.075 8.99988 3C8.99988 3.529 8.89188 4.029 8.72388 4.5H13.8809C15.3319 4.5 16.6649 5.478 16.9409 6.902C17.3129 8.817 15.8489 10.5 13.9989 10.5H9.99888V13.5C9.99888 14.052 10.4469 14.5 10.9989 14.5H15.9989V13.5C15.9989 12.948 16.4469 12.5 16.9989 12.5H18.9989C19.5509 12.5 19.9989 12.948 19.9989 13.5V14.5H20.4989C22.4319 14.5 23.9989 12.933 23.9989 11V4C23.9989 2.067 22.4329 0.5 20.4999 0.5ZM7.99988 13.5V8.5H13.9999C14.5529 8.5 14.9999 8.052 14.9999 7.5C14.9999 6.948 14.5529 6.5 13.9999 6.5H3.99988C1.79088 6.5 -0.000116506 8.291 -0.000116506 10.5V13.5C-0.000116506 14.052 0.447884 14.5 0.999884 14.5H6.99988C7.55188 14.5 7.99988 14.052 7.99988 13.5Z"
                      fill="#28AF60"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1929_28474">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <h3>مجالات التدريس</h3>
              </div>
              <div className="p-[clamp(10px,2.083333333333333vw,30px)] flex items-start justify-between flex-col gap-[clamp(10px,1.388vw,20px)] ">
                {servicesInputs.map((servicesInput, index) => {
                  return (
                    // input group
                    <div
                      key={index}
                      className="flex flex-row w-full gap-[clamp(5px,1.0416666666666665vw,15px)] flex-nowrap items-stretch justify-start "
                    >
                      {index === servicesInputs.length - 1 ? (
                        <button
                          onClick={addItemToServicesInputs}
                          className="w-[48px] flex items-center justify-center"
                        >
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.3"
                              d="M11.75 14.25H6.75C6.41848 14.25 6.10054 14.1183 5.86612 13.8839C5.6317 13.6495 5.5 13.3315 5.5 13C5.5 12.6685 5.6317 12.3505 5.86612 12.1161C6.10054 11.8817 6.41848 11.75 6.75 11.75H11.75V14.25ZM19.25 11.75H14.25V14.25H19.25C19.5815 14.25 19.8995 14.1183 20.1339 13.8839C20.3683 13.6495 20.5 13.3315 20.5 13C20.5 12.6685 20.3683 12.3505 20.1339 12.1161C19.8995 11.8817 19.5815 11.75 19.25 11.75Z"
                              fill="#4285F4"
                            />
                            <path
                              opacity="0.3"
                              d="M18.2375 0.5H7.7625C3.75153 0.5 0.5 3.75153 0.5 7.7625V18.2375C0.5 22.2485 3.75153 25.5 7.7625 25.5H18.2375C22.2485 25.5 25.5 22.2485 25.5 18.2375V7.7625C25.5 3.75153 22.2485 0.5 18.2375 0.5Z"
                              fill="#4285F4"
                            />
                            <path
                              d="M19.25 11.75H14.25V6.75C14.25 6.41848 14.1183 6.10054 13.8839 5.86612C13.6495 5.6317 13.3315 5.5 13 5.5C12.6685 5.5 12.3505 5.6317 12.1161 5.86612C11.8817 6.10054 11.75 6.41848 11.75 6.75V11.75H6.75C6.41848 11.75 6.10054 11.8817 5.86612 12.1161C5.6317 12.3505 5.5 12.6685 5.5 13C5.5 13.3315 5.6317 13.6495 5.86612 13.8839C6.10054 14.1183 6.41848 14.25 6.75 14.25H11.75V19.25C11.75 19.5815 11.8817 19.8995 12.1161 20.1339C12.3505 20.3683 12.6685 20.5 13 20.5C13.3315 20.5 13.6495 20.3683 13.8839 20.1339C14.1183 19.8995 14.25 19.5815 14.25 19.25V14.25H19.25C19.5815 14.25 19.8995 14.1183 20.1339 13.8839C20.3683 13.6495 20.5 13.3315 20.5 13C20.5 12.6685 20.3683 12.3505 20.1339 12.1161C19.8995 11.8817 19.5815 11.75 19.25 11.75Z"
                              fill="#4285F4"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={() => removeItemFromServicesInputs(index)}
                          className="w-[48px] flex items-center justify-center"
                        >
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.7401 0.832031H9.33594C7.0816 0.832031 4.91959 1.72756 3.32553 3.32162C1.73147 4.91568 0.835938 7.07769 0.835938 9.33203V20.807C0.873104 23.0367 1.78502 25.1625 3.37507 26.7261C4.96512 28.2896 7.10593 29.1657 9.33594 29.1654H20.8109C23.0284 29.1285 25.1437 28.2264 26.7053 26.6515C28.2669 25.0767 29.1511 22.9539 29.1693 20.7362V9.33203C29.1693 7.08991 28.2835 4.93857 26.7048 3.34653C25.126 1.75449 22.9821 0.850716 20.7401 0.832031ZM20.1026 21.2745C20.0328 21.7512 19.7882 22.1849 19.4164 22.4912C19.0446 22.7976 18.5722 22.9547 18.0909 22.932H12.0701C11.5818 22.9657 11.0988 22.8136 10.7179 22.5062C10.337 22.1989 10.0862 21.7589 10.0159 21.2745L9.4351 14.0495C9.43676 13.9379 9.46116 13.8278 9.5068 13.7259C9.55245 13.6239 9.61838 13.5324 9.70058 13.4569C9.78277 13.3813 9.87951 13.3233 9.98488 13.2863C10.0903 13.2494 10.202 13.2343 10.3134 13.242H19.6918C19.8032 13.2343 19.915 13.2494 20.0203 13.2863C20.1257 13.3233 20.2224 13.3813 20.3046 13.4569C20.3868 13.5324 20.4528 13.6239 20.4984 13.7259C20.5441 13.8278 20.5684 13.9379 20.5701 14.0495L20.1026 21.2745ZM21.5193 11.6129H21.3634C17.1336 11.027 12.8432 11.027 8.61344 11.6129C8.47574 11.6373 8.33458 11.6343 8.19804 11.6041C8.0615 11.5739 7.93227 11.517 7.81776 11.4367C7.70326 11.3564 7.60573 11.2543 7.53077 11.1362C7.45581 11.0182 7.40489 10.8865 7.38094 10.7487C7.35671 10.6108 7.36035 10.4695 7.39163 10.333C7.42291 10.1966 7.48121 10.0678 7.56307 9.95423C7.64494 9.84067 7.74872 9.74466 7.86829 9.67187C7.98786 9.59907 8.1208 9.55095 8.25927 9.53036C9.47901 9.33468 10.7087 9.20699 11.9426 9.14786L12.1693 7.91536C12.2012 7.55036 12.3607 7.20828 12.6198 6.9492C12.8789 6.69012 13.2209 6.53061 13.5859 6.4987H16.4193C16.7843 6.53061 17.1264 6.69012 17.3854 6.9492C17.6445 7.20828 17.804 7.55036 17.8359 7.91536L18.0201 9.06286C19.1959 9.1337 20.4284 9.24703 21.6893 9.4312C21.9681 9.47656 22.218 9.62971 22.385 9.85763C22.5519 10.0856 22.6226 10.37 22.5818 10.6495C22.5611 10.9054 22.4473 11.1448 22.2619 11.3224C22.0766 11.4999 21.8325 11.6033 21.5759 11.6129H21.5193Z"
                              fill="#F1416C"
                            />
                          </svg>
                        </button>
                      )}
                      <label className="form-control w-full">
                        <input
                          type="text"
                          className="input input-bordered sm:w-full "
                          value={servicesInput.value || ""}
                          onChange={(e) => handleServicesInputChange(e, index)}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className=" border border-[#F1F1F2] rounded-[8px] main-shadow mt-[20px] ">
              <div className="flex items-center justify-start gap-[10px] p-[clamp(10px,1.3888888888888888vw,20px)] w-full border-b border-[#F1F1F2] ">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.64 14.8051C14.6374 15.0032 14.5576 15.1924 14.4175 15.3325C14.2774 15.4726 14.0881 15.5525 13.89 15.5551H10C9.80109 15.5551 9.61032 15.476 9.46967 15.3354C9.32902 15.1947 9.25 15.004 9.25 14.8051C9.25 14.6061 9.32902 14.4154 9.46967 14.2747C9.61032 14.1341 9.80109 14.0551 10 14.0551H13.94C14.1293 14.07 14.3061 14.1553 14.4356 14.2941C14.5652 14.4329 14.6381 14.6152 14.64 14.8051ZM22.05 16.8051C22.0501 18.3843 21.4276 19.8999 20.3175 21.0231C19.2073 22.1464 17.6991 22.7866 16.12 22.8051H8C6.42076 22.8052 4.90515 22.1826 3.78192 21.0725C2.65869 19.9624 2.01842 18.4542 2 16.8751V8.80505C1.99969 7.23433 2.61533 5.72611 3.71472 4.60428C4.81412 3.48245 6.30959 2.83647 7.88 2.80505H16C17.5792 2.80495 19.0949 3.42747 20.2181 4.53759C21.3413 5.64772 21.9816 7.15592 22 8.73505L22.05 16.8051ZM18 12.7151C18 12.4896 17.9104 12.2734 17.751 12.114C17.5916 11.9546 17.3754 11.8651 17.15 11.8651C16.9995 11.8664 16.8501 11.8379 16.7107 11.7812C16.5712 11.7245 16.4443 11.6407 16.3374 11.5347C16.2305 11.4287 16.1456 11.3026 16.0877 11.1636C16.0298 11.0247 16 10.8756 16 10.7251V8.80505C16 8.27462 15.7893 7.76591 15.4142 7.39084C15.0391 7.01577 14.5304 6.80505 14 6.80505H8C7.46957 6.80505 6.96086 7.01577 6.58579 7.39084C6.21071 7.76591 6 8.27462 6 8.80505V16.8051C6 17.3355 6.21071 17.8442 6.58579 18.2193C6.96086 18.5943 7.46957 18.8051 8 18.8051H16C16.5304 18.8051 17.0391 18.5943 17.4142 18.2193C17.7893 17.8442 18 17.3355 18 16.8051V12.7151ZM9.9 11.5551H12C12.1989 11.5551 12.3897 11.476 12.5303 11.3354C12.671 11.1947 12.75 11.004 12.75 10.8051C12.75 10.6061 12.671 10.4154 12.5303 10.2747C12.3897 10.1341 12.1989 10.0551 12 10.0551H9.9C9.70109 10.0551 9.51032 10.1341 9.36967 10.2747C9.22902 10.4154 9.15 10.6061 9.15 10.8051C9.15 11.004 9.22902 11.1947 9.36967 11.3354C9.51032 11.476 9.70109 11.5551 9.9 11.5551Z"
                    fill="#28AF60"
                  />
                </svg>
                <h3> طرق التواصل </h3>
              </div>
              <div className="p-[clamp(10px,2.083333333333333vw,30px)] flex items-start justify-between flex-col ">
                {/* input group */}
                <div className="flex w-full items-start justify-between ">
                  <label className="label cursor-pointer gap-[10px]">
                    <input
                      type="checkbox"
                      checked={chosedContact === 1}
                      className="checkbox checkbox-primary"
                      name="how_to_communicate"
                      onChange={(e) => {
                        setChosedContact(1);
                        setLuctureFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: "whatsapp",
                        }));
                      }}
                    />
                    <span className="label-text"> الواتساب </span>
                  </label>
                  <label className="label cursor-pointer gap-[10px]">
                    <input
                      type="checkbox"
                      checked={chosedContact === 2}
                      className="checkbox checkbox-primary"
                      name="how_to_communicate"
                      onChange={(e) => {
                        setChosedContact(2);
                        setLuctureFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: "email",
                        }));
                      }}
                    />
                    <span className="label-text">البريد الالكتروني</span>
                  </label>
                  <label className="label cursor-pointer gap-[10px]">
                    <input
                      type="checkbox"
                      checked={chosedContact === 3}
                      className="checkbox checkbox-primary"
                      name="how_to_communicate"
                      onChange={(e) => {
                        setChosedContact(3);
                        setLuctureFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: "whatsapp, email",
                        }));
                      }}
                    />
                    <span className="label-text">الإثنين معا</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 5 && (
          <div className="w-full sm:w-[90%] min-h-[200px] flex items-center justify-center mx-auto text-center ">
            {currentLang.lectureFormMessage}
          </div>
        )}

        {/* navigation btns */}
        <div className="mt-[20px] flex items-center justify-center gap-[5px] ">
          {[1, 2, 3, 4].map((item) => {
            return (
              <div
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`w-[30px] h-[30px] rounded-full border font-[600] font-[cairo] text-[15px] main-shadow ${
                  currentPage === item
                    ? "border-[#075178] text-[#075178]"
                    : "border-[#f1f1f2] text-[#f1f1f2]"
                } cursor-pointer flex items-center justify-center  `}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="w-full flex items-center justify-between px-[20px] mt-[30px] ">
          <div>
            {currentPage > 1 && currentPage !== 5 && (
              <button
                onClick={handelPrevNavigation}
                className="py-[5px] px-[15px] text-[12px] font-[500] font-[cairo] flex items-center justify-center rounded-[8px] border border-[#075178] text-[#075178] "
              >
                {currentLang.prev}
              </button>
            )}
          </div>
          <button
            onClick={handelNextNavigation}
            className="py-[5px] px-[15px] text-[12px] font-[500] font-[cairo] flex items-center justify-center rounded-[8px] bg-[#075178] text-[#fff] "
          >
            {currentPage < 4
              ? currentLang.next
              : currentPage === 4
              ? currentLang.send
              : currentLang.close}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default LuctureForm;
