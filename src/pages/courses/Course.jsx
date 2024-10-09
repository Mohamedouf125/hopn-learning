import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseBanner,
  fetchCourseData,
} from "../../store/slices/courses/courceSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ar, en } from "../../assets/langs/translation";
import useCopyToClipboard from "../../assets/hooks/useCopyToClipboard";
import { toast } from "react-toastify";
import useUserLoggedIn from "../../assets/hooks/useUserLoggedIn";
import FullPagePopup from "../../components/popups/FullPagePopup";
import { courseFormData } from "../../assets/helpers/formInputsData";
import server from "../../assets/axios/server";
import {
  editUser,
  rememberEditedUser,
} from "../../store/slices/user/userSlice";

const Course = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { copyToClipboard } = useCopyToClipboard();
  const [openForm, setOpenForm] = useState(false);
  const [countries, setCountries] = useState([]);
  const [openMessage, setOpenMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchCourseData(params.courseId));
    dispatch(fetchCourseBanner());
  }, [dispatch]);

  const { course, courseBanner } = useSelector((state) => state.course);
  const { user, token } = useSelector((state) => state.user);
  const [formInputs, setFormInputs] = useState({
    country_id: user.country_id,
    full_name: user.name,
    whatsapp_number: user.phone,
  });

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang == "en" ? en : ar;

  // get countries
  useEffect(() => {
    server
      .get(`/countries-api`)
      .then((res) => {
        setCountries(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const enrollToCourse = () => {
    server
      .post(
        `/course-reserve`,
        { ...formInputs, course_id: params.courseId, user_id: user.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(editUser({ user: res.data.data }));
        dispatch(rememberEditedUser({ user: res.data.data }));
        setOpenForm(false);
        setFormInputs({ country_id: 3 });
        toast.success(currentLang.successfullyRegisteredCourse);
      })
      .catch((error) => {
        toast.error(error.response.data.message || currentLang.error);
      });
  };

  return (
    <main>
      {/* sighn to course form */}
      {openForm && (
        <FullPagePopup>
          <div className="container mx-auto overflow-x-hidden overflow-y-auto p-5 mt-10 max-h-[90vh]  rounded-lg bg-white">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                {currentLang.enrollNowFree}
              </h1>
              <span
                className="cursor-pointer w-[30px] h-[30px] rounded-full bg-[#D9D9D9] flex items-center justify-center "
                onClick={() => {
                  setOpenForm(false);
                }}
              >
                <i class="fas fa-times"></i>
              </span>
            </div>
            <div className="w-full md:w-[80%] mx-auto mt-10 bg-[#e74c3c] rounded-lg p-5 text-white font-[700] ">
              {currentLang.registrationNote}
            </div>
            <div className="mt-10">
              {/* edit profile info */}
              <div className="flex flex-col md:flex-row flex-wrap items-start justify-start w-full px-8 pb-5 gap-4">
                {courseFormData(user).map((input, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-start justify-start w-full md:w-[48%]"
                    >
                      <label
                        htmlFor={input.title}
                        className="text-[14px] font-[400] text-[#252525]"
                      >
                        {input.title}
                      </label>
                      <input
                        type="text"
                        name={input.title}
                        className="w-full border-[#E1E3EA] rounded bg-[#F9F9F9] text-[#A1A5B7]"
                        value={`${formInputs[input.title] || ""}`}
                        onChange={(e) => {
                          const value = e.target.value;
                          const englishOnly = value.replace(
                            /[^a-zA-Z0-9\s.,?!]/g,
                            ""
                          );
                          setFormInputs((prev) => ({
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
                    value={formInputs.country_id || user.country_id}
                    onChange={(e) =>
                      setFormInputs((prev) => ({
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
              </div>
            </div>
            <div className="w-full flex items-center justify-center p-5">
              <button
                onClick={enrollToCourse}
                className="border-none outline-none rounded-lg px-5 py-2 bg-[#075178] text-white"
              >
                {currentLang.enrollNowFree}
              </button>
            </div>
          </div>
        </FullPagePopup>
      )}
      {/* go to whatsapp message */}
      {/* {openMessage && (
        <FullPagePopup>
          <div className="container mx-auto overflow-x-hidden overflow-y-auto p-5 mt-14 max-h-[90vh]  rounded-lg bg-white">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900"></h1>
              <span
                className="cursor-pointer w-[30px] h-[30px] rounded-full bg-[#D9D9D9] flex items-center justify-center "
                onClick={() => setOpenMessage(false)}
              >
                <i class="fas fa-times"></i>
              </span>
            </div>
            <div className="w-full flex flex-col items-center justify-center mt-10 px-5">
              <h2 className="mb-5">{currentLang.welcome}</h2>
              <p className="w-full md:w-[80%] mx-auto text-center">
                {currentLang.courseMessage}
              </p>
            </div>
            <div className="w-full flex-col md:flex-row gap-5 flex items-center justify-center mt-10">
              <button className="px-5 border border-[#0A142F] py-2 text-[#0A142F] rounded-lg text-[18px] font-[600]">
                <a target="_blank" href="https://wa.me/971544066811">
                  {currentLang.enrollWithOffer(course.percent)}
                </a>
              </button>
              <button
                onClick={() => setOpenMessage(false)}
                className="px-5 text-white py-2 bg-[#0A142F] rounded-lg text-[18px] font-[600]"
              >
                {currentLang.close}
              </button>
            </div>
          </div>
        </FullPagePopup>
      )} */}
      <div className="container mx-auto my-10">
        <section className="w-full flex items-center justify-center flex-col p-5">
          <h2 className="w-full text-start my-5 text-[18px] md:text-[30px] font-[700] font-['Cairo'] ">
            {course.title}
          </h2>
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0 ">
            <div className="flex items-center justify-center w-full md:w-[60%]  rounded-2xl overflow-hidden">
              <img
                className="rounded-2xl w-full"
                src={course.image}
                alt="course image"
              />
            </div>
            <div className="flex items-center justify-center w-full md:w-[30%] overflow-hidden bg-[#F1F1F2] rounded-2xl">
              <img className="w-full" src={courseBanner[1]?.url} alt="Banner" />
            </div>
          </div>
          <div className=" w-full flex flex-col items-start justify-start gap-5 mt-5 ">
            {/* {user.couress_count === 0 && (
              
              <span className="text-[16px] font-[700]">
                {course.price}$
              </span>
            )} */}
            {/* {user.couress_count === 0 && (
              <button
                onClick={() => setOpenMessage(true)}
                className="px-5 border border-[#0A142F] py-2 text-[#0A142F] rounded-lg text-[18px] font-[600]"
              >
                {currentLang.enrollWithOffer(course.percent)}
              </button>
            )} */}
            {/* {user.couress_count > 0 && ( */}
            <button
              onClick={() => {
                setOpenForm(true);
              }}
              className="px-5 text-white py-2 bg-[#0A142F] rounded-lg text-[18px] font-[600]"
            >
              {currentLang.enrollNowFree}
            </button>
            {/* )} */}
          </div>
          <div className="w-full flex items-center justify-between flex-col md:flex-row mt-10">
            <div className="flex items-center justify-center w-full md:w-[60%]  rounded-2xl overflow-hidden">
              <p
                className="text-[16px] font-[400] font-['Cairo']"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </div>

            <div className="flex items-start justify-start overflow-hidden flex-col rounded-2xl w-full mt-10 md:mt-0 md:w-[30%] min-h-[500px] bg-[#0A142F] text-white relative">
              <img className="w-full" src={courseBanner[0]?.url} alt="Banner" />
              {/* <img
                src={courseAdBg}
                alt="courseAdBg"
                className="absolute bottom-0 right-0 rtl:scale-x-[-1]"
              />
              <h3 className="text-[30px] font-[700] font-['Cairo']">
                {currentLang.courseBannerTitle}
              </h3>
              <p className="text-[15px] font-[600] font-['Cairo'] py-8 ">
                {currentLang.courseBannerDesc}
              </p>
              <button className="text-[12px] font-[700] z-10 px-5 py-2 font-['Cairo'] text-[#FFD130] bg-none border border-[#FFD130]">
                {currentLang.learnMore}
              </button> */}
            </div>
          </div>
          <div className="w-full flex items-center justify-center flex-col md:flex-row mt-10 gap-5">
            <button
              onClick={() => {
                copyToClipboard(window.location.href);
                toast.success("Link copied to clipboard");
              }}
              className="flex items-center justify-center gap-2 px-5 py-2 bg-[#25d366] text-white rounded text-[18px] font-[600]"
            >
              {currentLang.shareCourse}
              <i className="fas fa-share text-white"></i>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Course;
