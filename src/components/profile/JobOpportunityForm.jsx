import { useSelector } from "react-redux";
import { ar, en } from "../../assets/langs/translation";
import { useEffect, useRef, useState } from "react";
import server from "../../assets/axios/server";
import { toast } from "react-toastify";
const JobOpportunityForm = () => {
  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;
  const [currentPage, setCurrentPage] = useState(1);
  const [resbonsabilityInputs, setResbonsabilityInputs] = useState([""]);
  const [chosedContact, setChosedContact] = useState(1);
  const [chosedWorkType, setChosedWorkType] = useState(1);
  const [jobOpportunityInputs, setJobOpportunityInputs] = useState({
    english: "good",
    country_id: 17,
    how_to_apply: "whatsapp",
    type: "male",
    type_of_work: "full",
  });
  const [countries, setCountries] = useState([]);
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
    currentPage === 2 &&
      server
        .post("/job-api", jobOpportunityInputs, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setCurrentPage(3);
        })
        .catch((error) => {
          toast.error(error.message);
        });

    if (currentPage === 3) {
      document.getElementById("closeJobOpportunityModal").click();
      setCurrentPage(1);
      setJobOpportunityInputs({
        english: "good",
        country_id: 17,
        how_to_apply: "whatsapp",
        type: "male",
        type_of_work: "full",
      });
    }
  };

  const handelPrevNavigation = () => {
    currentPage === 3 && setCurrentPage(2);
    currentPage === 2 && setCurrentPage(1);
  };

  const removeItemFromresbonsabilityInputs = (index) => {
    const updatedresbonsabilityInputs = [...resbonsabilityInputs];
    updatedresbonsabilityInputs.splice(index, 1);
    setResbonsabilityInputs(updatedresbonsabilityInputs);
  };

  const handleExpInputChange = (item, index) => {
    const updatedresbonsabilityInputs = [...resbonsabilityInputs];
    updatedresbonsabilityInputs[index] = item.target.value;
    setResbonsabilityInputs(updatedresbonsabilityInputs);
  };

  useEffect(() => {
    setJobOpportunityInputs((prev) => ({
      ...prev,
      tasks: resbonsabilityInputs.join(","),
    }));
  }, [resbonsabilityInputs]);


  return (
    <dialog id="jobOpportunityForm" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          <button
            id="closeJobOpportunityModal"
            class="btn btn-sm btn-circle btn-ghost absolute end-2 top-2"
          >
            ✕
          </button>
        </form>
        {/* modal title */}
        <div className="flex items-end mb-[30px] justify-start gap-[20px] ">
          <h2 className="pb-[20px] border-b border-[#28AF60] text-[#0B274B] font-[400] text-[clamp(20px,2.5vw,36px)] font-[cairo] ">
            {currentLang.jobOwner}
          </h2>
          <p className="font-[400] text-[clamp(12px,1.1111112vw,16px)] text-[#767676] font-[cairo]">
            {currentLang.jobOwneDescription}
          </p>
        </div>

        {/* job info */}
        {currentPage === 1 && (
          <div className=" border border-[#F1F1F2] mt-30px rounded-[12px] sm:py-[clamp(0px,1.3888888888888888vw,20px)] sm:px-[clamp(0px,2.083333333333333vw,30px)] main-shadow ">
            <div className=" sm:border border-[#F1F1F2] rounded-[8px] main-shadow">
              <div className="flex items-center justify-start gap-[10px] p-[clamp(10px,1.3888888888888888vw,20px)] w-full border-b border-[#F1F1F2] ">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1929_26077)">
                    <path
                      d="M8.5 12.7998C5.191 12.7998 2.5 10.1088 2.5 6.7998C2.5 3.4908 5.191 0.799805 8.5 0.799805C11.809 0.799805 14.5 3.4908 14.5 6.7998C14.5 10.1088 11.809 12.7998 8.5 12.7998ZM7.5 24.7998V14.7998H5C2.519 14.7998 0.5 16.8188 0.5 19.2998V24.7998H7.5ZM20.9 17.5688C20.9 17.0728 20.496 16.6688 20 16.6688H19.1V18.4688H20C20.496 18.4688 20.9 18.0648 20.9 17.5688ZM21.5 12.7998H12.5C10.843 12.7998 9.5 14.1428 9.5 15.7998V24.7998H24.5V15.7998C24.5 14.4508 23.157 12.7998 21.5 12.7998ZM16.5 22.7998H14.9V19.5948H13.1V22.7998H11.5V14.7998H13.1V17.9948H14.9V14.7998H16.5V22.7998ZM21.488 19.3088C21.47 19.3208 21.47 19.3208 21.446 19.3378L22.5 22.7998H20.756L19.884 19.7998H19.1V22.7998H17.5V14.7998H20C21.381 14.7998 22.5 15.9188 22.5 17.2998C22.5 18.1458 22.077 18.8918 21.433 19.3438C21.457 19.3298 21.469 19.3208 21.488 19.3088Z"
                      fill="#28AF60"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1929_26077">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0.5 0.799805)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <h3 className="font-[cairo] ">{currentLang.jobInformations}</h3>
              </div>
              <div className="p-[clamp(10px,2.083333333333333vw,30px)] flex items-start justify-between flex-col sm:flex-row ">
                {/* input group */}
                <div className="flex flex-col w-full sm:w-[31%] items-start justify-start gap-[5px] ">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">
                        {" "}
                        {currentLang.jobTitle} *
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full "
                      name="title"
                      value={jobOpportunityInputs.title || ""}
                      placeholder="مثال مدرب رياضي"
                      onChange={(e) => {
                        setJobOpportunityInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">
                        {" "}
                        {currentLang.companyName} *
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full "
                      name="company_name"
                      value={jobOpportunityInputs.company_name || ""}
                      placeholder=" مثال مركز التدريب الأولمبي"
                      onChange={(e) => {
                        setJobOpportunityInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">
                        {currentLang.lastApplayDate} *
                      </span>
                    </div>
                    <input
                      type="date"
                      className="input input-bordered w-full "
                      name="last_date"
                      value={jobOpportunityInputs.last_date || ""}
                      onChange={(e) => {
                        setJobOpportunityInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </label>
                </div>

                {/* input group */}
                <div className="flex flex-col w-full sm:w-[31%] items-start justify-start gap-[5px] ">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">
                        {currentLang.jobDescription} *
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full "
                      name="description"
                      value={jobOpportunityInputs.description || ""}
                      placeholder="وصف شامل للوظيفة"
                      onChange={(e) => {
                        setJobOpportunityInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">{currentLang.salary} *</span>
                    </div>
                    <input
                      type="number"
                      className="input input-bordered w-full "
                      name="salary"
                      value={jobOpportunityInputs.salary || ""}
                      placeholder="مثال. 5000 $"
                      onChange={(e) => {
                        setJobOpportunityInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">
                        {currentLang.reqQualifications} *
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full "
                      name="qualifications"
                      value={jobOpportunityInputs.qualifications || ""}
                      placeholder="مثال.بكالوريوس تربية رياضية"
                      onChange={(e) => {
                        setJobOpportunityInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </label>
                </div>

                {/* input group */}
                <div className="flex flex-col w-full sm:w-[31%] items-start justify-start gap-[5px] ">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">
                        {currentLang.Nationality} *
                      </span>
                    </div>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="country_id"
                      onChange={(e) => {
                        setJobOpportunityInputs((prev) => ({
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
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">
                        {currentLang.englishLevel} *
                      </span>
                    </div>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="english"
                      onChange={(e) => {
                        setJobOpportunityInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    >
                      <option value={`good`}>{currentLang.good}</option>
                      <option value={`very good`}>
                        {currentLang.verygood}
                      </option>
                      <option value={`excellent`}>
                        {currentLang.excellent}
                      </option>
                    </select>
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">{currentLang.type} *</span>
                    </div>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="type"
                      onChange={(e) => {
                        setJobOpportunityInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    >
                      <option value={`male`}>{currentLang.male}</option>
                      <option value={`female`}>{currentLang.female}</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="">
                <div className="flex items-center justify-start gap-[10px] px-[clamp(10px,1.3888888888888888vw,20px)] w-full ">
                  <h3> {currentLang.jobType} * </h3>
                </div>
                <div className="px-[clamp(10px,2.083333333333333vw,30px)] mt-[5px] flex items-start justify-between flex-col ">
                  {/* input group */}
                  <div className="flex w-full items-start justify-between ">
                    <label className="label cursor-pointer gap-[10px]">
                      <input
                        type="checkbox"
                        checked={chosedWorkType === 1}
                        className="checkbox checkbox-primary"
                        name="type_of_work"
                        onChange={(e) => {
                          setChosedWorkType(1);
                          setJobOpportunityInputs((prev) => ({
                            ...prev,
                            [e.target.name]: "full",
                          }));
                        }}
                      />
                      <span className="label-text">
                        {" "}
                        {currentLang.fullTime}{" "}
                      </span>
                    </label>
                    <label className="label cursor-pointer gap-[10px]">
                      <input
                        type="checkbox"
                        checked={chosedWorkType === 2}
                        className="checkbox checkbox-primary"
                        name="type_of_work"
                        onChange={(e) => {
                          setChosedWorkType(2);
                          setJobOpportunityInputs((prev) => ({
                            ...prev,
                            [e.target.name]: "part",
                          }));
                        }}
                      />
                      <span className="label-text">{currentLang.partTime}</span>
                    </label>
                    <label className="label cursor-pointer gap-[10px]">
                      <input
                        type="checkbox"
                        checked={chosedWorkType === 3}
                        className="checkbox checkbox-primary"
                        name="type_of_work"
                        onChange={(e) => {
                          setChosedWorkType(3);
                          setJobOpportunityInputs((prev) => ({
                            ...prev,
                            [e.target.name]: "freelance",
                          }));
                        }}
                      />
                      <span className="label-text">
                        {currentLang.freelance}
                      </span>
                    </label>
                  </div>
                </div>
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
                <h3>{currentLang.responsability}</h3>
              </div>
              <div className="p-[clamp(10px,2.083333333333333vw,30px)] flex items-start justify-between flex-col gap-[clamp(10px,1.388vw,20px)] ">
                {resbonsabilityInputs.map((expInput, index) => {
                  return (
                    // input group
                    <div
                      key={index}
                      className="flex flex-row w-full gap-[clamp(5px,1.0416666666666665vw,15px)] flex-nowrap items-stretch justify-start "
                    >
                      {index === resbonsabilityInputs.length - 1 ? (
                        <button
                          onClick={() =>
                            setResbonsabilityInputs([
                              ...resbonsabilityInputs,
                              "",
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
                          onClick={() =>
                            removeItemFromresbonsabilityInputs(index)
                          }
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
                          className="input input-bordered w-full "
                          value={expInput || ""}
                          onChange={(e) => handleExpInputChange(e, index)}
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
                      name="how_to_apply"
                      onChange={(e) => {
                        setChosedContact(1);
                        setJobOpportunityInputs((prev) => ({
                          ...prev,
                          [e.target.name]: "whatsapp",
                        }));
                      }}
                    />
                    <span className="label-text"> واتساب </span>
                  </label>
                  <label className="label cursor-pointer gap-[10px]">
                    <input
                      type="checkbox"
                      checked={chosedContact === 2}
                      className="checkbox checkbox-primary"
                      name="how_to_apply"
                      onChange={(e) => {
                        setChosedContact(2);
                        setJobOpportunityInputs((prev) => ({
                          ...prev,
                          [e.target.name]: "email",
                        }));
                      }}
                    />
                    <span className="label-text">ايميل</span>
                  </label>
                  <label className="label cursor-pointer gap-[10px]">
                    <input
                      type="checkbox"
                      checked={chosedContact === 3}
                      className="checkbox checkbox-primary"
                      name="how_to_apply"
                      onChange={(e) => {
                        setChosedContact(3);
                        setJobOpportunityInputs((prev) => ({
                          ...prev,
                          [e.target.name]: "whatsapp, email",
                        }));
                      }}
                    />
                    <span className="label-text">كلاهما</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 3 && (
          <div className="w-full sm:w-[90%] min-h-[200px] flex items-center justify-center mx-auto text-center ">
            {currentLang.jobSeekerFormMessage}
          </div>
        )}

        {/* navigation btns */}
        <div className="mt-[20px] flex items-center justify-center gap-[5px] ">
          {[1, 2].map((item) => {
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
            {currentPage < 2
              ? currentLang.next
              : currentPage === 2
              ? currentLang.send
              : currentLang.close}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default JobOpportunityForm;
