import { useSelector } from "react-redux";
import { ar, en } from "../../assets/langs/translation";
import { useEffect, useRef, useState } from "react";
import server from "../../assets/axios/server";
import { toast } from "react-toastify";
import userAvatar from "../../assets/images/icons/userAvatar.png";

const JobSeekerForm = () => {
  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;
  const [currentPage, setCurrentPage] = useState(1);
  const [expInputs, setExpInputs] = useState([{ value: null, file: null }]);
  const [chosedService, setChosedService] = useState(1);
  const [chosedContact, setChosedContact] = useState(1);
  const [formInputs, setFormInputs] = useState({
    english: "good",
    services: "personal training",
    country_id: 17,
    how_to_communication: "whatsapp",
  });
  const [countries, setCountries] = useState([]);
  const [userImage, setUserImage] = useState(null);
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
        .post("/application-api", formInputs, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setCurrentPage(5);
        })
        .catch((error) => {
          toast.error(error.message);
        });

    if (currentPage === 5) {
      document.getElementById("closeJpbSeekerModal").click();
      setCurrentPage(1);
      setFormInputs({
        english: "good",
        services: "personal training",
        country_id: 17,
        how_to_communication: "whatsapp",
      });
    }
  };

  const handelPrevNavigation = () => {
    currentPage === 4 && setCurrentPage(3);
    currentPage === 3 && setCurrentPage(2);
    currentPage === 2 && setCurrentPage(1);
  };

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
    setFormInputs((prev) => ({ ...prev, qualifications: expInputs }));
  }, [expInputs]);

  const handleExpFileChange = (item, index) => {
    const updatedExpInputs = [...expInputs];
    updatedExpInputs[index].file = item.target.files[0];
    setExpInputs(updatedExpInputs);
  };

  return (
    <dialog id="jobSeekerForm" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          <button
            id="closeJpbSeekerModal"
            class="btn btn-sm btn-circle btn-ghost absolute end-2 top-2"
          >
            ✕
          </button>
        </form>
        {/* modal title */}
        <div className="flex items-end mb-[30px] justify-start gap-[20px] ">
          <h2 className="pb-[20px] border-b border-yellow-secondary text-black font-[400] text-[clamp(20px,2.5vw,36px)] font-[cairo] ">
            {currentLang.JobSeeker}
          </h2>
          <p className="font-[400] text-[clamp(12px,1.1111112vw,16px)] text-[#767676] font-[cairo]">
            {currentLang.searchForJob}
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
                      value={formInputs.name || ""}
                      onChange={(e) => {
                        setFormInputs((prev) => ({
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
                      value={formInputs.age || ""}
                      onChange={(e) => {
                        setFormInputs((prev) => ({
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
                      <span className="label-text">مستوي الانجليزية*</span>
                    </div>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="english"
                      onChange={(e) => {
                        setFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    >
                      <option value={`good`}>good</option>
                      <option value={`very good`}>very good</option>
                      <option value={`exlent`}>exlent</option>
                    </select>
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">الجنسية  *</span>
                    </div>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="country_id"
                      onChange={(e) => {
                        setFormInputs((prev) => ({
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
                      id="job-seeker-input"
                      name="image"
                      // value={formInputs.image}
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setFormInputs((prev) => ({
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
                        src={userImage || userAvatar}
                        alt="job-seeker"
                      />
                      <div className="absolute bottom-[-5px] end-[50%] sm:end-[17%] translate-x-[-50%] flex items-center justify-center gap-[5px] z-20 ">
                        <button
                          className="w-[20px] h-[20px] flex items-center justify-center bg-[#fff] rounded-[6px]  "
                          style={{ boxShadow: "0px 0px 5px 0px #00000024" }}
                          onClick={() =>
                            document.getElementById("job-seeker-input").click()
                          }
                        >
                          {formInputs?.image ? (
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
                        {formInputs?.image && (
                          <button
                            className="w-[20px] h-[20px] flex items-center justify-center bg-[#fff] rounded-[6px]  "
                            style={{ boxShadow: "0px 0px 5px 0px #00000024" }}
                            onClick={() => {
                              setFormInputs((prev) => ({
                                ...prev,
                                image: null, // Remove the image from the form inputs state
                              }));

                              setUserImage(null); // Reset any state storing the uploaded file's preview or data

                              if (fileInputRef.current) {
                                fileInputRef.current.value = ""; // Reset the file input's value to allow re-uploading the same file
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
                      {formInputs?.image
                        ? formInputs?.image.name
                        : "Allowed file types: png, jpg, jpeg"}
                    </p>
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
                <h3>المؤهلات والخبرات العملية</h3>
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
              <div className="p-[clamp(10px,2.083333333333333vw,30px)] flex items-start justify-between flex-col sm:flex-row ">
                {/* input group */}
                <div className="flex flex-col w-full sm:w-[48%] items-start justify-start ">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text"> المهارات *</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full "
                      name="skills"
                      value={formInputs.skills || ""}
                      onChange={(e) => {
                        setFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </label>
                </div>
                {/* input group */}
                <div className="flex flex-col w-full sm:w-[48%] items-start justify-start ">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">سنوات الخبره *</span>
                    </div>
                    <input
                      type="number"
                      className="input input-bordered w-full "
                      name="y_of_exp"
                      value={formInputs.y_of_exp || ""}
                      onChange={(e) => {
                        setFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </label>
                </div>
              </div>
              {/* input group */}
              <div className="flex w-full items-start justify-start mt-[10px] p-[clamp(10px,2.083333333333333vw,30px)] ">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text"> الخبرات *</span>
                  </div>
                  <textarea
                    className="textarea bg-[#F9F9F9]"
                    name="experiences"
                    value={formInputs.experiences || ""}
                    onChange={(e) => {
                      setFormInputs((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  ></textarea>
                </label>
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
                <h3> الموقع والمواعيد</h3>
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
                      value={formInputs.address || ""}
                      onChange={(e) => {
                        setFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </label>
                </div>
                {/* input group */}
                <div className="flex flex-col w-full sm:w-[48%] items-start justify-start ">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">
                        الاوقات المتاحة للتدريب *
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full "
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
                    d="M13.54 12.2151L15.22 9.80505V12.2551L13.54 12.2151ZM21 5.67505V16.6751C21 17.0585 20.9245 17.4382 20.7777 17.7925C20.631 18.1468 20.4159 18.4687 20.1448 18.7398C19.8736 19.011 19.5517 19.226 19.1974 19.3728C18.8432 19.5195 18.4635 19.5951 18.08 19.5951H17C16.7012 19.5943 16.4053 19.6542 16.1303 19.7711C15.8553 19.888 15.6069 20.0594 15.4 20.2751L13.59 22.1751C13.3817 22.3938 13.1312 22.568 12.8536 22.6869C12.5759 22.8059 12.277 22.8673 11.975 22.8673C11.673 22.8673 11.3741 22.8059 11.0964 22.6869C10.8188 22.568 10.5683 22.3938 10.36 22.1751L8.69 20.3051C8.48305 20.0793 8.23106 19.8995 7.95029 19.7772C7.66953 19.6549 7.36624 19.5929 7.06 19.5951H5.92C5.14557 19.5951 4.40285 19.2874 3.85525 18.7398C3.30764 18.1922 3 17.4495 3 16.6751V5.67505C3.01311 4.90932 3.32654 4.17939 3.87273 3.64255C4.41892 3.10571 5.15415 2.80494 5.92 2.80505H18.08C18.8458 2.80494 19.5811 3.10571 20.1273 3.64255C20.6735 4.17939 20.9869 4.90932 21 5.67505ZM7.93 13.6751C8.16 13.4651 8.46 13.2351 8.77 12.9951C9.85 12.1551 11.07 11.2051 11.08 9.84505C11.08 9.20853 10.8271 8.59808 10.3771 8.148C9.92697 7.69791 9.31652 7.44505 8.68 7.44505C8.04348 7.44505 7.43303 7.69791 6.98294 8.148C6.53286 8.59808 6.28 9.20853 6.28 9.84505C6.28 10.044 6.35902 10.2347 6.49967 10.3754C6.64032 10.516 6.83109 10.5951 7.03 10.5951C7.22891 10.5951 7.41968 10.516 7.56033 10.3754C7.70098 10.2347 7.78 10.044 7.78 9.84505C7.78 9.60636 7.87482 9.37744 8.0436 9.20866C8.21239 9.03987 8.44131 8.94505 8.68 8.94505C8.80112 8.94068 8.92189 8.96053 9.03522 9.00346C9.14856 9.0464 9.25218 9.11153 9.34 9.19505C9.49557 9.35989 9.58154 9.5784 9.58 9.80505C9.58 10.4351 8.58 11.1851 7.85 11.8051C7.38428 12.1389 6.95223 12.5173 6.56 12.9351C6.38854 13.128 6.27648 13.3664 6.23728 13.6216C6.19809 13.8768 6.23343 14.1378 6.33906 14.3733C6.44468 14.6089 6.6161 14.8089 6.8327 14.9494C7.0493 15.0898 7.30185 15.1647 7.56 15.1651H10.33C10.5289 15.1651 10.7197 15.086 10.8603 14.9454C11.001 14.8047 11.08 14.614 11.08 14.4151C11.08 14.2161 11.001 14.0254 10.8603 13.8847C10.7197 13.7441 10.5289 13.6651 10.33 13.6651L7.93 13.6751ZM17.85 13.0151C17.85 12.8161 17.771 12.6254 17.6303 12.4847C17.4897 12.3441 17.2989 12.2651 17.1 12.2651H16.7V8.76505C16.7045 8.51321 16.627 8.26674 16.479 8.06287C16.3311 7.85901 16.1208 7.70884 15.88 7.63505C15.6398 7.55945 15.3816 7.56338 15.1438 7.64626C14.9059 7.72913 14.7012 7.88653 14.56 8.09505L12 11.8751C11.8768 12.0502 11.805 12.2563 11.7927 12.4701C11.7803 12.6839 11.8279 12.8968 11.93 13.0851C12.0249 13.27 12.1678 13.4261 12.3437 13.537C12.5197 13.6478 12.7222 13.7093 12.93 13.7151H15.2V14.3751C15.1987 14.4731 15.2168 14.5704 15.2534 14.6613C15.29 14.7522 15.3443 14.835 15.4132 14.9048C15.482 14.9746 15.564 15.03 15.6545 15.0678C15.7449 15.1056 15.842 15.1251 15.94 15.1251C16.1372 15.1251 16.3265 15.0474 16.4668 14.9089C16.6072 14.7704 16.6874 14.5822 16.69 14.3851V13.7151H17.1C17.2989 13.7151 17.4897 13.636 17.6303 13.4954C17.771 13.3547 17.85 13.164 17.85 12.9651V13.0151Z"
                    fill="#28AF60"
                  />
                </svg>

                <h3> الخدمات</h3>
              </div>
              <div className="p-[clamp(10px,2.083333333333333vw,30px)] flex items-start justify-between flex-col ">
                {/* input group */}
                <div className="flex w-full items-start justify-between ">
                  <label className="label cursor-pointer gap-[10px]">
                    <input
                      type="checkbox"
                      checked={chosedService === 1}
                      className="checkbox checkbox-primary"
                      name="services"
                      onChange={(e) => {
                        setChosedService(1);
                        setFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: "personal training",
                        }));
                      }}
                    />
                    <span className="label-text"> تدريب شخصي</span>
                  </label>
                  <label className="label cursor-pointer gap-[10px]">
                    <input
                      type="checkbox"
                      checked={chosedService === 2}
                      className="checkbox checkbox-primary"
                      name="services"
                      onChange={(e) => {
                        setChosedService(2);
                        setFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: "Group training",
                        }));
                      }}
                    />
                    <span className="label-text font-[cairo] text-[clamp(10px,0.972vw,14px)] leading-[22px] ">
                      تدريب جماعي
                    </span>
                  </label>
                  <label className="label cursor-pointer gap-[10px]">
                    <input
                      type="checkbox"
                      checked={chosedService === 3}
                      className="checkbox checkbox-primary"
                      name="services"
                      onChange={(e) => {
                        setChosedService(3);
                        setFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: "personal training, Group training",
                        }));
                      }}
                    />
                    <span className="label-text font-[cairo] text-[clamp(10px,0.972vw,14px)] leading-[22px] ">
                      تدريب لفئات معينه
                    </span>
                  </label>
                </div>
                {/* input group */}
                <div className="flex w-full items-start justify-start mt-[10px] ">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-[cairo] text-[clamp(10px,0.972vw,14px)] leading-[22px] ">
                        {" "}
                        نبذه *
                      </span>
                    </div>
                    <textarea
                      className="textarea bg-[#F9F9F9]"
                      name="brief_summary"
                      value={formInputs.brief_summary || ""}
                      onChange={(e) => {
                        setFormInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    ></textarea>
                  </label>
                </div>
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
                      name="how_to_communication"
                      onChange={(e) => {
                        setChosedContact(1);
                        setFormInputs((prev) => ({
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
                      name="how_to_communication"
                      onChange={(e) => {
                        setChosedContact(2);
                        setFormInputs((prev) => ({
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
                      name="how_to_communication"
                      onChange={(e) => {
                        setChosedContact(3);
                        setFormInputs((prev) => ({
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

        {currentPage === 5 && (
          <div className="w-full sm:w-[90%] min-h-[200px] flex items-center justify-center mx-auto text-center ">
            {currentLang.jobSeekerFormMessage}
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
                    ? "border-orange-primary text-orange-primary"
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
                className="py-[5px] px-[15px] text-[12px] font-[500] font-[cairo] flex items-center justify-center rounded-[8px] border border-orange-primary text-orange-primary "
              >
                {currentLang.prev}
              </button>
            )}
          </div>
          <button
            onClick={handelNextNavigation}
            className="py-[5px] px-[15px] text-[12px] font-[500] font-[cairo] flex items-center justify-center rounded-[8px] bg-orange-primary text-[#fff] "
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

export default JobSeekerForm;
