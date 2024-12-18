import { useSelector } from "react-redux";
import { ar, en } from "../../assets/langs/translation";
import { useEffect, useRef, useState } from "react";
import server from "../../assets/axios/server";

const TrainerForm = () => {
  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;
  const [currentPage, setCurrentPage] = useState(1);
  const [expInputs, setExpInputs] = useState([{ value: null, file: null }]);
  const [workExp, setWorkExp] = useState([{ exp_name: null, exp_time: null }]);
  const [servicesInputs, setServicesInputs] = useState([{ value: null }]);
  const [trainerFormInputs, setTrainerFormInputs] = useState({
    country_id: 17,
  });
  const [countries, setCountries] = useState([]);
  const [userImage, setUserImage] = useState(null);
  const [trainerImages, setTrainerImages] = useState([]);

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
        .post("/trainer-request-form-api", trainerFormInputs, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
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
    setTrainerFormInputs((prev) => ({ ...prev, qualifications: expInputs }));
  }, [expInputs]);

  const handleExpFileChange = (item, index) => {
    const updatedExpInputs = [...expInputs];
    updatedExpInputs[index].file = item.target.files[0];
    setExpInputs(updatedExpInputs);
  };

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
    setTrainerFormInputs((prev) => ({ ...prev, services: servicesInputText }));
  }, [servicesInputs]);

  //   work exp functions
  const addItemToWorkExp = () => {
    setWorkExp([...workExp, { value: null, file: null }]);
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
    setTrainerFormInputs((prev) => ({ ...prev, experience: workExp }));
  }, [workExp]);

  console.log(trainerFormInputs);

  return (
    <dialog id="trainerForm" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute end-2 top-2">
            ✕
          </button>
        </form>
        {/* modal title */}
        <div className="flex items-end mb-[30px] justify-start gap-[20px] ">
          <h2 className="pb-[20px] border-b border-[#28AF60] text-[#0B274B] font-[400] text-[clamp(20px,2.5vw,36px)] font-[cairo] ">
            {/* {currentLang.JobSeeker} */}
            مدرب رياضي
          </h2>
          <p className="font-[400] text-[clamp(12px,1.1111112vw,16px)] text-[#767676] font-[cairo]">
            {/* {currentLang.searchForJob} */}
            شارك خبراتك الرياضية مع الآخرين وسجل كمدرب محترف.
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
                      <span className="label-text">اسم المدرب *</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full "
                      name="name"
                      value={trainerFormInputs.name || ""}
                      onChange={(e) => {
                        setTrainerFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">العمر *</span>
                    </div>
                    <input
                      type="number"
                      className="input input-bordered w-full "
                      name="age"
                      value={trainerFormInputs.age || ""}
                      onChange={(e) => {
                        setTrainerFormInputs((prev) => ({
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
                      value={trainerFormInputs.job_title || ""}
                      onChange={(e) => {
                        setTrainerFormInputs((prev) => ({
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
                        setTrainerFormInputs((prev) => ({
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
                      id="trainerInput"
                      name="image"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setTrainerFormInputs((prev) => ({
                          ...prev,
                          [event.target.name]: file,
                        }));

                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setUserImage(reader.result);
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
                          userImage ||
                          "https://via.assets.so/img.jpg?w=800&h=800&tc=blue&bg=#C4C4C4"
                        }
                        alt="job-seeker"
                      />
                      <div className="absolute bottom-[-5px] end-[50%] sm:end-[17%] translate-x-[-50%] flex items-center justify-center gap-[5px] z-20 ">
                        <button
                          className="w-[20px] h-[20px] flex items-center justify-center bg-[#fff] rounded-[6px]  "
                          style={{ boxShadow: "0px 0px 5px 0px #00000024" }}
                          onClick={() =>
                            document.getElementById("trainerInput").click()
                          }
                        >
                          {trainerFormInputs?.image ? (
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
                        {trainerFormInputs?.image && (
                          <button
                            className="w-[20px] h-[20px] flex items-center justify-center bg-[#fff] rounded-[6px]  "
                            style={{ boxShadow: "0px 0px 5px 0px #00000024" }}
                            onClick={() => {
                              setTrainerFormInputs((prev) => ({
                                ...prev,
                                image: null,
                              }));

                              setUserImage(null);

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
                      {trainerFormInputs?.image
                        ? trainerFormInputs?.image.name
                        : "Allowed file types: png, jpg, jpeg"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-center flex-col sm:w-[98%] mx-auto main-shadow border border-[#F1F1F2] mt-30px rounded-[12px]  ">
                <div className="flex items-center justify-start gap-[10px] p-[clamp(10px,1.3888888888888888vw,20px)] w-full border-b border-[#F1F1F2] ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.71 2H8.22001C7.40028 1.99866 6.5884 2.15963 5.83119 2.47362C5.07398 2.78761 4.38643 3.24841 3.80819 3.82944C3.22995 4.41046 2.77247 5.10022 2.46213 5.85893C2.15179 6.61764 1.99473 7.43029 2.00001 8.25V15.71C1.99474 16.5316 2.15152 17.3462 2.46138 18.1071C2.77123 18.8681 3.22809 19.5605 3.8058 20.1447C4.38351 20.7289 5.07075 21.1935 5.82819 21.5118C6.58562 21.8302 7.3984 21.9961 8.22001 22H15.71C17.3774 21.9974 18.9758 21.3338 20.1548 20.1548C21.3338 18.9758 21.9974 17.3774 22 15.71V8.25C21.9974 7.42661 21.8326 6.6118 21.5151 5.85209C21.1976 5.09239 20.7335 4.40266 20.1494 3.82229C19.5654 3.24192 18.8727 2.78228 18.111 2.46961C17.3492 2.15695 16.5334 1.99737 15.71 2ZM15.58 12C15.58 12.7177 15.3666 13.4191 14.967 14.0153C14.5675 14.6114 13.9997 15.0753 13.3359 15.3481C12.6721 15.6209 11.9422 15.6902 11.2389 15.5472C10.5357 15.4043 9.89074 15.0555 9.3861 14.5452C8.88146 14.035 8.53988 13.3862 8.40476 12.6814C8.26963 11.9766 8.34705 11.2475 8.62718 10.5867C8.90731 9.92602 9.37752 9.36346 9.97806 8.97054C10.5786 8.57762 11.2824 8.37207 12 8.38C12.4728 8.38262 12.9404 8.47833 13.3762 8.66167C13.8119 8.84502 14.2073 9.11239 14.5397 9.44854C14.8722 9.78469 15.1352 10.183 15.3136 10.6208C15.4921 11.0586 15.5826 11.5272 15.58 12ZM17.85 7.14C17.6522 7.14 17.4589 7.08135 17.2944 6.97147C17.13 6.86159 17.0018 6.70541 16.9261 6.52269C16.8504 6.33996 16.8306 6.13889 16.8692 5.94491C16.9078 5.75093 17.003 5.57275 17.1429 5.43289C17.2828 5.29304 17.4609 5.1978 17.6549 5.15922C17.8489 5.12063 18.05 5.14043 18.2327 5.21612C18.4154 5.29181 18.5716 5.41998 18.6815 5.58443C18.7914 5.74888 18.85 5.94222 18.85 6.14C18.8448 6.40174 18.7371 6.65098 18.5501 6.83421C18.3632 7.01745 18.1118 7.12005 17.85 7.12V7.14Z"
                      fill="#28AF60"
                    />
                  </svg>
                  <h3> معرض الصور</h3>
                </div>
                <input
                  onChange={(e) => {
                    setTrainerFormInputs((prev) => ({
                      ...prev,
                      images: [...(prev.images || []), e.target.files[0]],
                    }));

                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setTrainerImages((prev) => [...prev, reader.result]);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                  type="file"
                  id="trainer-images"
                />

                {trainerFormInputs.images ? (
                  <div className="w-full flex items-center flex-wrap justify-center gap-[8px] py-[clamp(20px,3.4722222222222223vw,50px)]">
                    {trainerImages.map((image, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-center w-[160px] h-[120px] border border-[#F1F1F2] rounded-[8px] overflow-hidden "
                        >
                          <img
                            className="w-full h-full rounded-[8px] "
                            src={image}
                            alt="srcImage"
                          />
                        </div>
                      );
                    })}
                    <div
                      className="cursor-pointer flex items-center justify-center w-[150px] h-[120px] border border-[#F1F1F2] rounded-[8px] overflow-hidden "
                      onClick={() =>
                        document.getElementById("trainer-images").click()
                      }
                    >
                      <svg
                        width="47"
                        height="39"
                        viewBox="0 0 47 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M31.5 27.3901L23.5 19.3901L15.5 27.3901"
                          stroke="black"
                          stroke-opacity="0.4"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M23.5 19.3901V37.3901"
                          stroke="black"
                          stroke-opacity="0.4"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M40.2789 32.1701C42.2296 31.1067 43.7706 29.4239 44.6587 27.3874C45.5468 25.3508 45.7314 23.0766 45.1834 20.9235C44.6353 18.7704 43.3859 16.8611 41.6323 15.497C39.8786 14.1329 37.7207 13.3916 35.4989 13.3901H32.9789C32.3736 11.0486 31.2453 8.87477 29.6788 7.03209C28.1124 5.18941 26.1486 3.72581 23.9351 2.75132C21.7216 1.77683 19.316 1.31682 16.8992 1.40587C14.4823 1.49492 12.1171 2.13071 9.9813 3.26544C7.84552 4.40017 5.99477 6.00431 4.56819 7.95727C3.14161 9.91023 2.17632 12.1612 1.7449 14.5409C1.31348 16.9206 1.42715 19.3672 2.07737 21.6966C2.72759 24.0261 3.89743 26.1778 5.49894 27.9901"
                          stroke="black"
                          stroke-opacity="0.4"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M31.5 27.3901L23.5 19.3901L15.5 27.3901"
                          stroke="black"
                          stroke-opacity="0.4"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-center flex-col cursor-pointer py-[clamp(20px,3.4722222222222223vw,50px)] "
                    onClick={() =>
                      document.getElementById("trainer-images").click()
                    }
                  >
                    <svg
                      width="47"
                      height="39"
                      viewBox="0 0 47 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31.5 27.3901L23.5 19.3901L15.5 27.3901"
                        stroke="black"
                        stroke-opacity="0.4"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23.5 19.3901V37.3901"
                        stroke="black"
                        stroke-opacity="0.4"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M40.2789 32.1701C42.2296 31.1067 43.7706 29.4239 44.6587 27.3874C45.5468 25.3508 45.7314 23.0766 45.1834 20.9235C44.6353 18.7704 43.3859 16.8611 41.6323 15.497C39.8786 14.1329 37.7207 13.3916 35.4989 13.3901H32.9789C32.3736 11.0486 31.2453 8.87477 29.6788 7.03209C28.1124 5.18941 26.1486 3.72581 23.9351 2.75132C21.7216 1.77683 19.316 1.31682 16.8992 1.40587C14.4823 1.49492 12.1171 2.13071 9.9813 3.26544C7.84552 4.40017 5.99477 6.00431 4.56819 7.95727C3.14161 9.91023 2.17632 12.1612 1.7449 14.5409C1.31348 16.9206 1.42715 19.3672 2.07737 21.6966C2.72759 24.0261 3.89743 26.1778 5.49894 27.9901"
                        stroke="black"
                        stroke-opacity="0.4"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M31.5 27.3901L23.5 19.3901L15.5 27.3901"
                        stroke="black"
                        stroke-opacity="0.4"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>اضغط هنا لتحميل صوره </p>
                    <p>
                      الصور المقبولة: JPG، PNG، أو PDF، حجم الملف لا يزيد عن
                      10MB
                    </p>
                  </div>
                )}
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
                            name="exp_name"
                            placeholder=" اسم الوظيفه *"
                            value={workExpinputs.exp_name || ""}
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
                            name="exp_time"
                            placeholder="مده العمل *"
                            value={workExpinputs.exp_time || ""}
                            onChange={(e) => handleWorkExpInputChange(e, index)}
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* location */}
            <div className=" border border-[#F1F1F2] rounded-[8px] main-shadow mt-[20px]">
              <div className="flex items-center justify-start gap-[10px] p-[clamp(10px,1.3888888888888888vw,20px)] w-full border-b border-[#F1F1F2] ">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.75 9.21505C7.74802 8.94565 7.82609 8.68174 7.97432 8.45677C8.12255 8.23181 8.33426 8.05594 8.58258 7.95147C8.83091 7.847 9.10467 7.81864 9.36914 7.86998C9.63361 7.92132 9.87687 8.05005 10.0681 8.23985C10.2593 8.42964 10.3898 8.67195 10.4431 8.93603C10.4964 9.20011 10.47 9.47408 10.3674 9.72317C10.2648 9.97226 10.0905 10.1853 9.8666 10.3351C9.64274 10.485 9.37941 10.565 9.11 10.5651C8.93188 10.5664 8.75525 10.5324 8.59031 10.4652C8.42536 10.3979 8.27535 10.2987 8.14893 10.1732C8.02251 10.0477 7.92218 9.89844 7.85371 9.734C7.78524 9.56955 7.75 9.39318 7.75 9.21505ZM22 8.80505V16.9051C21.974 18.4703 21.3372 19.9635 20.2255 21.0658C19.1139 22.1681 17.6154 22.7922 16.05 22.8051H8C6.41733 22.8051 4.89873 22.1798 3.77494 21.0654C2.65115 19.951 2.01319 18.4377 2 16.8551V8.80505C2 7.21375 2.63214 5.68763 3.75736 4.56241C4.88258 3.43719 6.4087 2.80505 8 2.80505H16.1C17.6739 2.83129 19.1745 3.47499 20.2781 4.59738C21.3818 5.71977 22.0002 7.23093 22 8.80505ZM6.42 11.6151L8.25 13.6751C8.35784 13.7949 8.48969 13.8908 8.63699 13.9564C8.78429 14.0221 8.94374 14.056 9.105 14.056C9.26626 14.056 9.42571 14.0221 9.57301 13.9564C9.72031 13.8908 9.85216 13.7949 9.96 13.6751L11.8 11.6151C12.3932 10.9565 12.721 10.1014 12.72 9.21505C12.7212 8.62952 12.58 8.05249 12.3085 7.5337C12.037 7.01492 11.6434 6.56996 11.1616 6.2372C10.6798 5.90444 10.1243 5.69387 9.543 5.62364C8.9617 5.55341 8.37204 5.62563 7.82486 5.83407C7.27769 6.04252 6.78944 6.38093 6.4022 6.82013C6.01496 7.25933 5.74037 7.78613 5.6021 8.3551C5.46384 8.92407 5.46604 9.51814 5.60853 10.0861C5.75102 10.654 6.02951 11.1787 6.42 11.6151ZM15.27 14.6951L21.91 7.80505C21.8157 7.2428 21.6406 6.69715 21.39 6.18505L5.91 22.2851L5.83 22.4051C6.36722 22.6205 6.93334 22.7553 7.51 22.8051L14.23 15.8051L19.47 21.1351C19.6036 21.2678 19.7818 21.3462 19.97 21.3551C20.2495 21.1041 20.5071 20.8297 20.74 20.5351C20.7349 20.3646 20.6631 20.203 20.54 20.0851L15.27 14.6951Z"
                    fill="#28AF60"
                  />
                </svg>
                <h3> الموقع</h3>
              </div>
              <div className="p-[clamp(10px,2.083333333333333vw,30px)] flex items-start justify-between flex-col sm:flex-row ">
                {/* input group */}
                <div className="flex flex-col w-full sm:w-[48%] items-start justify-start ">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text"> مكان التواجد *</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full "
                      name="address"
                      value={trainerFormInputs.address || ""}
                      onChange={(e) => {
                        setTrainerFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </label>
                </div>
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
                  <path
                    d="M13.54 12.2147L15.22 9.80469V12.2547L13.54 12.2147ZM21 5.67469V16.6747C21 17.0581 20.9245 17.4379 20.7777 17.7921C20.631 18.1464 20.4159 18.4683 20.1448 18.7394C19.8736 19.0106 19.5517 19.2257 19.1974 19.3724C18.8432 19.5192 18.4635 19.5947 18.08 19.5947H17C16.7012 19.594 16.4053 19.6539 16.1303 19.7708C15.8553 19.8876 15.6069 20.0591 15.4 20.2747L13.59 22.1747C13.3817 22.3934 13.1312 22.5676 12.8536 22.6866C12.5759 22.8056 12.277 22.8669 11.975 22.8669C11.673 22.8669 11.3741 22.8056 11.0964 22.6866C10.8188 22.5676 10.5683 22.3934 10.36 22.1747L8.69 20.3047C8.48305 20.079 8.23106 19.8991 7.95029 19.7768C7.66953 19.6545 7.36624 19.5925 7.06 19.5947H5.92C5.14557 19.5947 4.40285 19.287 3.85525 18.7394C3.30764 18.1918 3 17.4491 3 16.6747V5.67469C3.01311 4.90895 3.32654 4.17902 3.87273 3.64218C4.41892 3.10534 5.15415 2.80458 5.92 2.80469H18.08C18.8458 2.80458 19.5811 3.10534 20.1273 3.64218C20.6735 4.17902 20.9869 4.90895 21 5.67469ZM7.93 13.6747C8.16 13.4647 8.46 13.2347 8.77 12.9947C9.85 12.1547 11.07 11.2047 11.08 9.84469C11.08 9.20817 10.8271 8.59772 10.3771 8.14763C9.92697 7.69754 9.31652 7.44469 8.68 7.44469C8.04348 7.44469 7.43303 7.69754 6.98294 8.14763C6.53286 8.59772 6.28 9.20817 6.28 9.84469C6.28 10.0436 6.35902 10.2344 6.49967 10.375C6.64032 10.5157 6.83109 10.5947 7.03 10.5947C7.22891 10.5947 7.41968 10.5157 7.56033 10.375C7.70098 10.2344 7.78 10.0436 7.78 9.84469C7.78 9.60599 7.87482 9.37707 8.0436 9.20829C8.21239 9.03951 8.44131 8.94469 8.68 8.94469C8.80112 8.94031 8.92189 8.96017 9.03522 9.0031C9.14856 9.04603 9.25218 9.11117 9.34 9.19469C9.49557 9.35953 9.58154 9.57803 9.58 9.80469C9.58 10.4347 8.58 11.1847 7.85 11.8047C7.38428 12.1385 6.95223 12.517 6.56 12.9347C6.38854 13.1277 6.27648 13.3661 6.23728 13.6212C6.19809 13.8764 6.23343 14.1374 6.33906 14.373C6.44468 14.6085 6.6161 14.8086 6.8327 14.949C7.0493 15.0895 7.30185 15.1644 7.56 15.1647H10.33C10.5289 15.1647 10.7197 15.0857 10.8603 14.945C11.001 14.8044 11.08 14.6136 11.08 14.4147C11.08 14.2158 11.001 14.025 10.8603 13.8844C10.7197 13.7437 10.5289 13.6647 10.33 13.6647L7.93 13.6747ZM17.85 13.0147C17.85 12.8158 17.771 12.625 17.6303 12.4844C17.4897 12.3437 17.2989 12.2647 17.1 12.2647H16.7V8.76469C16.7045 8.51285 16.627 8.26637 16.479 8.06251C16.3311 7.85865 16.1208 7.70847 15.88 7.63469C15.6398 7.55909 15.3816 7.56301 15.1438 7.64589C14.9059 7.72876 14.7012 7.88616 14.56 8.09469L12 11.8747C11.8768 12.0499 11.805 12.2559 11.7927 12.4697C11.7803 12.6835 11.8279 12.8965 11.93 13.0847C12.0249 13.2697 12.1678 13.4258 12.3437 13.5366C12.5197 13.6474 12.7222 13.7089 12.93 13.7147H15.2V14.3747C15.1987 14.4727 15.2168 14.57 15.2534 14.6609C15.29 14.7519 15.3443 14.8346 15.4132 14.9044C15.482 14.9742 15.564 15.0296 15.6545 15.0674C15.7449 15.1052 15.842 15.1247 15.94 15.1247C16.1372 15.1247 16.3265 15.0471 16.4668 14.9086C16.6072 14.7701 16.6874 14.5819 16.69 14.3847V13.7147H17.1C17.2989 13.7147 17.4897 13.6357 17.6303 13.495C17.771 13.3544 17.85 13.1636 17.85 12.9647V13.0147Z"
                    fill="#28AF60"
                  />
                </svg>

                <h3>الخدمات</h3>
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
                    d="M13.54 12.2147L15.22 9.80469V12.2547L13.54 12.2147ZM21 5.67469V16.6747C21 17.0581 20.9245 17.4379 20.7777 17.7921C20.631 18.1464 20.4159 18.4683 20.1448 18.7394C19.8736 19.0106 19.5517 19.2257 19.1974 19.3724C18.8432 19.5192 18.4635 19.5947 18.08 19.5947H17C16.7012 19.594 16.4053 19.6539 16.1303 19.7708C15.8553 19.8876 15.6069 20.0591 15.4 20.2747L13.59 22.1747C13.3817 22.3934 13.1312 22.5676 12.8536 22.6866C12.5759 22.8056 12.277 22.8669 11.975 22.8669C11.673 22.8669 11.3741 22.8056 11.0964 22.6866C10.8188 22.5676 10.5683 22.3934 10.36 22.1747L8.69 20.3047C8.48305 20.079 8.23106 19.8991 7.95029 19.7768C7.66953 19.6545 7.36624 19.5925 7.06 19.5947H5.92C5.14557 19.5947 4.40285 19.287 3.85525 18.7394C3.30764 18.1918 3 17.4491 3 16.6747V5.67469C3.01311 4.90895 3.32654 4.17902 3.87273 3.64218C4.41892 3.10534 5.15415 2.80458 5.92 2.80469H18.08C18.8458 2.80458 19.5811 3.10534 20.1273 3.64218C20.6735 4.17902 20.9869 4.90895 21 5.67469ZM7.93 13.6747C8.16 13.4647 8.46 13.2347 8.77 12.9947C9.85 12.1547 11.07 11.2047 11.08 9.84469C11.08 9.20817 10.8271 8.59772 10.3771 8.14763C9.92697 7.69754 9.31652 7.44469 8.68 7.44469C8.04348 7.44469 7.43303 7.69754 6.98294 8.14763C6.53286 8.59772 6.28 9.20817 6.28 9.84469C6.28 10.0436 6.35902 10.2344 6.49967 10.375C6.64032 10.5157 6.83109 10.5947 7.03 10.5947C7.22891 10.5947 7.41968 10.5157 7.56033 10.375C7.70098 10.2344 7.78 10.0436 7.78 9.84469C7.78 9.60599 7.87482 9.37707 8.0436 9.20829C8.21239 9.03951 8.44131 8.94469 8.68 8.94469C8.80112 8.94031 8.92189 8.96017 9.03522 9.0031C9.14856 9.04603 9.25218 9.11117 9.34 9.19469C9.49557 9.35953 9.58154 9.57803 9.58 9.80469C9.58 10.4347 8.58 11.1847 7.85 11.8047C7.38428 12.1385 6.95223 12.517 6.56 12.9347C6.38854 13.1277 6.27648 13.3661 6.23728 13.6212C6.19809 13.8764 6.23343 14.1374 6.33906 14.373C6.44468 14.6085 6.6161 14.8086 6.8327 14.949C7.0493 15.0895 7.30185 15.1644 7.56 15.1647H10.33C10.5289 15.1647 10.7197 15.0857 10.8603 14.945C11.001 14.8044 11.08 14.6136 11.08 14.4147C11.08 14.2158 11.001 14.025 10.8603 13.8844C10.7197 13.7437 10.5289 13.6647 10.33 13.6647L7.93 13.6747ZM17.85 13.0147C17.85 12.8158 17.771 12.625 17.6303 12.4844C17.4897 12.3437 17.2989 12.2647 17.1 12.2647H16.7V8.76469C16.7045 8.51285 16.627 8.26637 16.479 8.06251C16.3311 7.85865 16.1208 7.70847 15.88 7.63469C15.6398 7.55909 15.3816 7.56301 15.1438 7.64589C14.9059 7.72876 14.7012 7.88616 14.56 8.09469L12 11.8747C11.8768 12.0499 11.805 12.2559 11.7927 12.4697C11.7803 12.6835 11.8279 12.8965 11.93 13.0847C12.0249 13.2697 12.1678 13.4258 12.3437 13.5366C12.5197 13.6474 12.7222 13.7089 12.93 13.7147H15.2V14.3747C15.1987 14.4727 15.2168 14.57 15.2534 14.6609C15.29 14.7519 15.3443 14.8346 15.4132 14.9044C15.482 14.9742 15.564 15.0296 15.6545 15.0674C15.7449 15.1052 15.842 15.1247 15.94 15.1247C16.1372 15.1247 16.3265 15.0471 16.4668 14.9086C16.6072 14.7701 16.6874 14.5819 16.69 14.3847V13.7147H17.1C17.2989 13.7147 17.4897 13.6357 17.6303 13.495C17.771 13.3544 17.85 13.1636 17.85 12.9647V13.0147Z"
                    fill="#28AF60"
                  />
                </svg>

                <h3>صفحات التواصل الاجتماعي </h3>
              </div>
              <div className="p-[clamp(10px,2.083333333333333vw,30px)] flex items-start justify-between flex-col gap-[clamp(10px,1.388vw,20px)] ">
                {/* input group */}
                <div className="flex flex-row w-full gap-[clamp(5px,1.0416666666666665vw,15px)] flex-nowrap items-stretch justify-start ">
                  <div className="flex items-center justify-center gap-[5px] font-[600] text-[12px] font-[cairo] border px-[8px] rounded-[8px] ">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 11.41C21.9033 9.90899 21.4692 8.44913 20.73 7.13913C19.9909 5.82913 18.9658 4.70274 17.731 3.84384C16.4962 2.98493 15.0836 2.41564 13.5983 2.17834C12.113 1.94105 10.5933 2.04187 9.15239 2.4733C7.71146 2.90473 6.38642 3.65565 5.27593 4.67015C4.16543 5.68465 3.2981 6.93659 2.73851 8.33276C2.17892 9.72892 1.94149 11.2333 2.0439 12.734C2.14631 14.2346 2.58591 15.6928 3.32999 17L2.43999 20.31C2.40604 20.4414 2.39916 20.5782 2.41979 20.7123C2.44042 20.8464 2.48812 20.9749 2.55999 21.09C2.64118 21.2315 2.75852 21.3488 2.89999 21.43C3.01519 21.4972 3.14265 21.5406 3.27489 21.5578C3.40713 21.575 3.54146 21.5655 3.66999 21.53L6.93999 20.63C8.47482 21.5285 10.2215 22.0014 12 22C13.3581 21.9812 14.6986 21.69 15.9421 21.1437C17.1856 20.5974 18.3068 19.8071 19.2393 18.8196C20.1718 17.8321 20.8967 16.6674 21.3709 15.3947C21.8451 14.1219 22.059 12.7669 22 11.41ZM16 16.66C14.86 17.32 13.75 17.08 12.12 16.15C10.2318 15.0131 8.67629 13.399 7.60999 11.47C6.60999 9.54001 6.79999 8.31001 7.73999 7.47001C8.00436 7.19441 8.3596 7.0239 8.73999 6.99001C8.88575 6.98552 9.03038 7.01691 9.16116 7.08143C9.29194 7.14594 9.40486 7.24161 9.48999 7.36001L10.84 9.36001C10.8722 9.46113 10.8956 9.56485 10.91 9.67001C10.9098 9.80138 10.8716 9.92989 10.8 10.04C10.8 10.04 10.3 10.63 10.14 10.8C10.0942 10.8357 10.0629 10.8867 10.0518 10.9437C10.0408 11.0007 10.0508 11.0598 10.08 11.11C10.8031 12.2173 11.7501 13.1609 12.86 13.88C12.9166 13.9066 12.9803 13.9141 13.0416 13.9015C13.1029 13.8889 13.1585 13.8568 13.2 13.81C13.4345 13.5799 13.6815 13.3629 13.94 13.16C14.0392 13.0978 14.1521 13.0608 14.2688 13.0521C14.3856 13.0434 14.5027 13.0632 14.61 13.11L16.61 14.49C16.7102 14.5904 16.8038 14.6973 16.89 14.81C16.967 15.1734 16.9215 15.552 16.7604 15.8868C16.5994 16.2215 16.332 16.4934 16 16.66Z"
                        fill="#28AF60"
                      />
                    </svg>

                    <span>whatsapp</span>
                  </div>
                  <label className="form-control w-full">
                    <input
                      type="number"
                      className="input input-bordered sm:w-full "
                      value={trainerFormInputs.whatsapp_number || ""}
                      onChange={(e) => {
                        setTrainerFormInputs((prev) => ({
                          ...prev,
                          whatsapp_number: e.target.value,
                        }));
                      }}
                    />
                  </label>
                </div>
                {/* input group */}
                <div className="flex flex-row w-full gap-[clamp(5px,1.0416666666666665vw,15px)] flex-nowrap items-stretch justify-start ">
                  <div className="flex items-center justify-center gap-[5px] font-[600] text-[12px] font-[cairo] border px-[8px] rounded-[8px] ">
                    <svg
                      width="25"
                      height="26"
                      viewBox="0 0 25 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.9965 13.3906C24.9965 19.7039 20.3181 24.9232 14.2405 25.7701C13.6722 25.849 13.0908 25.8901 12.5007 25.8901C11.8194 25.8901 11.1505 25.8358 10.499 25.7307C4.54834 24.7725 0.00390625 19.6119 0.00390625 13.3906C0.00390625 6.48696 5.59908 0.890137 12.4998 0.890137C19.4005 0.890137 24.9965 6.48696 24.9965 13.3906Z"
                        fill="#1877F2"
                      />
                      <path
                        d="M14.2418 10.9264V13.6495H17.6094L17.0762 17.3177H14.2418V25.7689C13.6736 25.8478 13.0921 25.8889 12.502 25.8889C11.8208 25.8889 11.1518 25.8346 10.5003 25.7295V17.3177H7.39453V13.6495H10.5003V10.3177C10.5003 8.25064 12.1754 6.57422 14.2427 6.57422V6.57597C14.2488 6.57597 14.2541 6.57422 14.2602 6.57422H17.6103V9.74663H15.4213C14.7707 9.74663 14.2427 10.2748 14.2427 10.9255L14.2418 10.9264Z"
                        fill="white"
                      />
                    </svg>

                    <span>facebook</span>
                  </div>
                  <label className="form-control w-full">
                    <input
                      type="text"
                      className="input input-bordered sm:w-full "
                      value={trainerFormInputs.facebook || ""}
                      onChange={(e) => {
                        setTrainerFormInputs((prev) => ({
                          ...prev,
                          facebook: e.target.value,
                        }));
                      }}
                    />
                  </label>
                </div>
                {/* input group */}
                <div className="flex flex-row w-full gap-[clamp(5px,1.0416666666666665vw,15px)] flex-nowrap items-stretch justify-start ">
                  <div className="flex items-center justify-center gap-[5px] font-[600] text-[12px] font-[cairo] border px-[8px] rounded-[8px] ">
                    <svg
                      width="25"
                      height="26"
                      viewBox="0 0 25 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5287 0.890137H12.4718C5.58596 0.890137 0.00390625 6.47383 0.00390625 13.3617V13.4186C0.00390625 20.3064 5.58596 25.8901 12.4718 25.8901H12.5287C19.4145 25.8901 24.9965 20.3064 24.9965 13.4186V13.3617C24.9965 6.47383 19.4145 0.890137 12.5287 0.890137Z"
                        fill="url(#paint0_linear_1654_7145)"
                      />
                      <path
                        d="M16.3697 5.97607H8.63631C6.49981 5.97607 4.76172 7.71468 4.76172 9.85181V16.9288C4.76172 19.066 6.49981 20.8046 8.63631 20.8046H16.3697C18.5062 20.8046 20.2443 19.066 20.2443 16.9288V9.85181C20.2443 7.71468 18.5062 5.97607 16.3697 5.97607ZM6.12855 9.85181C6.12855 8.4688 7.25372 7.34331 8.63631 7.34331H16.3697C17.7523 7.34331 18.8775 8.4688 18.8775 9.85181V16.9288C18.8775 18.3118 17.7523 19.4373 16.3697 19.4373H8.63631C7.25372 19.4373 6.12855 18.3118 6.12855 16.9288V9.85181Z"
                        fill="white"
                      />
                      <path
                        d="M12.5025 16.9944C14.4892 16.9944 16.1065 15.3775 16.1065 13.3893C16.1065 11.401 14.4901 9.78418 12.5025 9.78418C10.5148 9.78418 8.89844 11.401 8.89844 13.3893C8.89844 15.3775 10.5148 16.9944 12.5025 16.9944ZM12.5025 11.1523C13.7362 11.1523 14.7397 12.156 14.7397 13.3901C14.7397 14.6242 13.7362 15.628 12.5025 15.628C11.2687 15.628 10.2653 14.6242 10.2653 13.3901C10.2653 12.156 11.2687 11.1523 12.5025 11.1523Z"
                        fill="white"
                      />
                      <path
                        d="M16.4398 10.3665C16.9748 10.3665 17.4109 9.9312 17.4109 9.39517C17.4109 8.85914 16.9757 8.42383 16.4398 8.42383C15.9039 8.42383 15.4688 8.85914 15.4688 9.39517C15.4688 9.9312 15.9039 10.3665 16.4398 10.3665Z"
                        fill="white"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1654_7145"
                          x1="3.65521"
                          y1="22.2378"
                          x2="21.3504"
                          y2="4.54861"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FAAD4F" />
                          <stop offset="0.35" stop-color="#DD2A7B" />
                          <stop offset="0.62" stop-color="#9537B0" />
                          <stop offset="1" stop-color="#515BD4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span>instagram</span>
                  </div>
                  <label className="form-control w-full">
                    <input
                      type="text"
                      className="input input-bordered sm:w-full "
                      value={trainerFormInputs.instagram || ""}
                      onChange={(e) => {
                        setTrainerFormInputs((prev) => ({
                          ...prev,
                          instagram: e.target.value,
                        }));
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
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
            {currentPage > 1 && (
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
            {currentPage < 4 ? currentLang.next : currentLang.send}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default TrainerForm;
