import { useSelector } from "react-redux";
import { ar, en } from "../../assets/langs/translation";
import { useState } from "react";

const JobSeekerForm = () => {
  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;
  const [seekerImg, setSeekerImg] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handelNextNavigation = () => {
    currentPage === 1 && setCurrentPage(2);
    currentPage === 2 && setCurrentPage(3);
    // currentPage === 3 && 
  };
  
  const handelPrevNavigation = () => {
    currentPage === 3 && setCurrentPage(2);
    currentPage === 2 && setCurrentPage(1);
  };

  return (
    <dialog id="jobSeekerForm" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute end-2 top-2">
            ✕
          </button>
        </form>
        {/* modal title */}
        <div className="flex items-end justify-start gap-[20px] ">
          <h2 className="pb-[20px] border-b border-[#28AF60] text-[#0B274B] font-[400] text-[36px] font-[cairo] ">
            {currentLang.JobSeeker}
          </h2>
          <p className="font-[400] text-[16px] text-[#767676] font-[cairo]">
            {currentLang.searchForJob}
          </p>
        </div>

        {/* personal info */}
        {currentPage === 1 && (
          <div className=" border border-[#F1F1F2] mt-30px rounded-[12px] py-[20px] px-[30px] main-shadow ">
            <div className=" border border-[#F1F1F2] rounded-[8px] main-shadow">
              <div className="flex items-center justify-start gap-[10px] p-[20px] w-full border-b border-[#F1F1F2] ">
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
              <div className="p-[30px] flex items-start justify-between flex-col sm:flex-row ">
                {/* input group */}
                <div className="flex flex-col w-full sm:w-[31%] items-start justify-start ">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">اسم المدرب *</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full "
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">العمر *</span>
                    </div>
                    <input
                      type="number"
                      className="input input-bordered w-full "
                    />
                  </label>
                </div>
                {/* input group */}
                <div className="flex flex-col w-full sm:w-[31%] items-start justify-start ">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">اسم المدرب *</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full "
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">الجنسية  *</span>
                    </div>
                    <select className="select select-bordered w-full max-w-xs">
                      <option disabled selected>
                        Who shot first?
                      </option>
                      <option>Han Solo</option>
                      <option>Greedo</option>
                    </select>
                  </label>
                </div>
                {/* input group */}
                <div className="flex flex-col w-full sm:w-[31%] items-start justify-start ">
                  <span className="w-full flex items-center justify-start">
                    اضافة صورة شخصية *
                  </span>
                  <div className=" w-full  ">
                    <input
                      type="file"
                      id="job-seeker-input"
                      name="image"
                      // onChange={(event) => {
                      //   handelUploadeProfileImg(event);
                      // }}
                      style={{ display: "none" }}
                    />

                    <div className="w-full flex items-center justify-end relative ">
                      <img
                        className="w-[90px] h-[90px] mt-[15px] rounded-full  "
                        src={
                          seekerImg ||
                          "https://via.assets.so/img.jpg?w=800&h=800&tc=blue&bg=#C4C4C4"
                        }
                        alt="job-seeker"
                      />
                      <div className="absolute bottom-[-5px] end-[10%] flex items-center justify-center gap-[5px] z-20 ">
                        <button
                          className="w-[20px] h-[20px] flex items-center justify-center bg-[#fff] rounded-[6px]  "
                          style={{ boxShadow: "0px 0px 5px 0px #00000024" }}
                        >
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
                        </button>
                        <button
                          className="w-[20px] h-[20px] flex items-center justify-center bg-[#fff] rounded-[6px]  "
                          style={{ boxShadow: "0px 0px 5px 0px #00000024" }}
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
                      </div>
                    </div>
                    <p className="w-full flex items-center justify-end mt-[15px] ">
                      Allowed file types: png, jpg, jpeg
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* navigation btns */}
        <div className="mt-[20px] flex items-center justify-center gap-[5px] ">
          {[1, 2, 3].map((item) => {
            return (
              <div
                className={`w-[30px] h-[30px] rounded-full border ${
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
            {currentPage < 3 ? currentLang.next : currentLang.send}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default JobSeekerForm;
