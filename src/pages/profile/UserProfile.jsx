import "./profile.css";
import profileAvatar from "../../assets/images/profile/profileAvatar.png";
import avatar from "../../assets/images/icons/avatar.png";
import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import slideHead from "../../assets/images/home/slideHeader.png";
import courseImg from "../../assets/images/home/courceImg.png";
import ReactStars from "react-rating-stars-component";
import useCopyToClipboard from "../../assets/hooks/useCopyToClipboard";
import useProtectedRoute from "../../assets/hooks/useProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchHomeData } from "../../store/slices/home/homeDataSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ar, en } from "../../assets/langs/translation";
import server from "../../assets/axios/server";

const UserProfile = () => {
  const { copyToClipboard } = useCopyToClipboard();
  const { defaultStars } = useSelector((state) => state.ratingStars);
  const [age, setAge] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [userCourses, setUserCourses] = useState(null);
  const [user, setUser] = useState({});

  useProtectedRoute();

  // feach home data from backend
  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const { users } = useSelector((state) => state.home);

  // featch user
  useEffect(() => {
    server
      .get(`/get-user/${params.userId}`)
      .then((res) => {
        console.log(res);
        setUser(res.data.data.user);
      })
      .catch((error) => console.log(error));
  }, []);

  // feach user courses
  useEffect(() => {
    server
      .get(`/course-show-api/${user.id}`)
      .then((res) => {
        setUserCourses(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => console.log(error));
  }, [user]);

  // clculate age based on birthday
  useEffect(() => {
    function calculateAge(birthday) {
      const birthDate = new Date(birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    }

    if (user.date) {
      const calculatedAge = calculateAge(user.date);
      setAge(calculatedAge);
    }
  }, [user.date]);

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang == "en" ? en : ar;

  return (
    <main className="container overflow-hidden mx-auto flex items-center justify-center flex-col p-5">
      <div className="flex w-full flex-col items-center justify-center mt-12 relative ">
        <img
          src={"https://via.placeholder.com/1060x212"}
          alt="profileHeader"
          className=" w-full rounded-lg"
        />
        <div className="flex flex-col items-center justify-center w-full">
          <img
            className="w-[70px] sm:w-[100px] border-white border-[2px] rounded-full md:w-[200px] mt-[-35px] sm:mt-[-50px] md:mt-[-100px] md:ml-[10%] md:mr-auto rtl:md:ml-auto rtl:md:mr-[10%]  z-10 "
            src={
              user.photo === "https://api.sportiin.com"
                ? profileAvatar
                : user?.photo || profileAvatar
            }
            alt="avatar"
          />
          <div className="flex items-center justify-center gap-1 mt-5 md:ml-[13%] md:mr-auto rtl:md:ml-auto rtl:md:mr-[13%] ">
            <div className="flex items-center justify-center flex-col">
              <h2 className="text-[18px] font-[600] flex items-center justify-center gap-3">
                {user?.name}
              </h2>
              <div className=" flex items-center justify-center gap-2">
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5417 3.16667H14.6708C14.4871 2.2732 14.0009 1.4704 13.2943 0.893568C12.5877 0.316738 11.7038 0.0011515 10.7917 0L9.20833 0C8.29617 0.0011515 7.41229 0.316738 6.70568 0.893568C5.99906 1.4704 5.51291 2.2732 5.32917 3.16667H4.45833C3.4089 3.16792 2.40282 3.58537 1.66076 4.32742C0.918698 5.06948 0.501257 6.07557 0.5 7.125L0.5 15.0417C0.501257 16.0911 0.918698 17.0972 1.66076 17.8392C2.40282 18.5813 3.4089 18.9987 4.45833 19H15.5417C16.5911 18.9987 17.5972 18.5813 18.3392 17.8392C19.0813 17.0972 19.4987 16.0911 19.5 15.0417V7.125C19.4987 6.07557 19.0813 5.06948 18.3392 4.32742C17.5972 3.58537 16.5911 3.16792 15.5417 3.16667ZM9.20833 1.58333H10.7917C11.2811 1.58536 11.758 1.73857 12.1571 2.02199C12.5561 2.30541 12.8579 2.7052 13.021 3.16667H6.979C7.14215 2.7052 7.44389 2.30541 7.84295 2.02199C8.242 1.73857 8.71888 1.58536 9.20833 1.58333ZM4.45833 4.75H15.5417C16.1716 4.75 16.7756 5.00022 17.221 5.44562C17.6664 5.89102 17.9167 6.49511 17.9167 7.125V9.5H2.08333V7.125C2.08333 6.49511 2.33356 5.89102 2.77895 5.44562C3.22435 5.00022 3.82844 4.75 4.45833 4.75ZM15.5417 17.4167H4.45833C3.82844 17.4167 3.22435 17.1664 2.77895 16.721C2.33356 16.2756 2.08333 15.6716 2.08333 15.0417V11.0833H9.20833V11.875C9.20833 12.085 9.29174 12.2863 9.44021 12.4348C9.58867 12.5833 9.79004 12.6667 10 12.6667C10.21 12.6667 10.4113 12.5833 10.5598 12.4348C10.7083 12.2863 10.7917 12.085 10.7917 11.875V11.0833H17.9167V15.0417C17.9167 15.6716 17.6664 16.2756 17.221 16.721C16.7756 17.1664 16.1716 17.4167 15.5417 17.4167Z"
                    fill="#2B3D4F"
                  />
                </svg>
                <span className="text-[18px] font-[600] text-[#2B3D4F] ">
                  {user?.job || currentLang.noJob}
                </span>
              </div>
              <div className=" flex items-center justify-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_411_1534)">
                    <path
                      d="M9.00005 12.0002C9.34929 12.0009 9.69386 11.9203 10.0065 11.7647L11.5065 11.0147C12.2711 10.6351 12.7534 9.85383 12.7501 9.00024V6.77499C12.7527 5.92213 12.2705 5.14187 11.5065 4.76275L10.0065 4.01276C9.37278 3.69776 8.62806 3.69776 7.9943 4.01276L6.49429 4.76275C5.73006 5.14166 5.24754 5.92199 5.25004 6.77499V9.00024C5.2473 9.8533 5.72947 10.6338 6.49355 11.0132L7.99356 11.7632C8.3061 11.9193 8.6507 12.0004 9.00005 12.0002ZM14.25 16.5002H12.2183L14.8335 14.0837C18.0554 10.8619 18.0555 5.63835 14.8337 2.41646C11.6119 -0.805439 6.38836 -0.805474 3.16647 2.41628C-0.0554251 5.63803 -0.0554956 10.8617 3.16629 14.0835C3.17336 14.0906 5.78181 16.5002 5.78181 16.5002H3.75006C3.33585 16.5002 3.00007 16.836 3.00007 17.2502C3.00007 17.6644 3.33585 18.0002 3.75006 18.0002H14.2501C14.6643 18.0002 15.0001 17.6644 15.0001 17.2502C15.0001 16.836 14.6642 16.5002 14.25 16.5002ZM4.22706 3.47723C6.85731 0.835163 11.1314 0.825601 13.7734 3.45585C16.4155 6.0861 16.425 10.3602 13.7948 13.0022L10.8061 15.763C9.78597 16.7245 8.19163 16.7189 7.17832 15.7502L4.22706 13.0232C1.59509 10.3855 1.59513 6.115 4.22706 3.47723Z"
                      fill="#374957"
                    />
                    <path
                      d="M8.65702 5.27842C8.16194 5.35785 7.80621 5.54561 7.4248 5.92112C6.96639 6.37606 6.75002 6.86711 6.75002 7.47731C6.74635 8.46663 7.34412 9.31153 8.29029 9.65093C8.59101 9.75925 9.26947 9.78452 9.57385 9.69787C10.3037 9.49206 10.9271 8.90352 11.1545 8.21028C11.2241 7.99364 11.2462 7.8456 11.2498 7.56758C11.2535 7.1343 11.2021 6.90322 11.0188 6.52049C10.5934 5.63948 9.60319 5.11955 8.65702 5.27842ZM9.56285 5.54561C9.74989 5.6106 9.87091 5.73697 9.96992 5.97528C10.0323 6.12331 10.0469 6.24969 9.99926 6.24969C9.98459 6.24969 9.87457 6.33273 9.76089 6.43383L9.55185 6.61797L9.36482 6.57826C9.14111 6.53132 8.77805 6.52771 8.58368 6.57465C8.44799 6.60353 8.42965 6.59631 8.22428 6.44105C8.10693 6.35078 8.01158 6.27135 8.01158 6.26774C8.01158 6.19553 8.31963 5.62865 8.38197 5.58171C8.42965 5.54561 8.44432 5.52755 8.41498 5.53478C8.22061 5.59977 8.19494 5.60338 8.19494 5.56727C8.19494 5.54561 8.22428 5.52394 8.26095 5.52394C8.29396 5.52033 8.40398 5.51311 8.49933 5.5095C8.59468 5.50589 8.68636 5.48784 8.70103 5.47339C8.74504 5.43007 9.37582 5.48423 9.56285 5.54561ZM9.8269 5.56366C9.88191 5.58532 9.91858 5.6106 9.90758 5.62143C9.88558 5.6431 9.66187 5.53839 9.66187 5.50589C9.66187 5.49506 9.67654 5.49506 9.69488 5.50589C9.70954 5.51672 9.77189 5.542 9.8269 5.56366ZM10.487 6.48438C10.7437 6.6252 10.8061 6.67574 10.8684 6.80212C11.0334 7.14152 11.0555 7.58202 10.9271 7.95031C10.8721 8.10196 10.8537 8.12362 10.7327 8.14167C10.6594 8.15612 10.498 8.20305 10.3733 8.24277L10.1496 8.32221L10.0139 8.17417C9.73522 7.86726 9.73888 7.87448 9.75722 7.58202C9.76822 7.43037 9.75355 7.18485 9.72421 7.01515L9.67287 6.71907L9.89658 6.52049C10.0213 6.41217 10.135 6.32551 10.1496 6.3219C10.168 6.3219 10.3183 6.39411 10.487 6.48438ZM8.3233 7.13791C8.33063 7.39788 8.3563 7.62535 8.38931 7.712L8.44065 7.85643L8.18761 8.13445L7.93456 8.41247L7.76953 8.34387C7.68152 8.30415 7.52382 8.26444 7.4248 8.24999C7.29645 8.23194 7.2231 8.20305 7.18276 8.14889C7.09108 8.01891 7.01406 7.70117 7.0104 7.42315C7.00673 7.18846 7.0214 7.13069 7.13142 6.91044C7.25611 6.67213 7.26711 6.6613 7.56416 6.51326L7.86855 6.36162L8.09226 6.53132L8.31596 6.70463L8.3233 7.13791ZM7.09108 6.77323C6.98106 6.95738 6.95905 6.87433 7.06174 6.67574C7.11675 6.57465 7.14975 6.54215 7.15709 6.57826C7.16442 6.61075 7.13509 6.69741 7.09108 6.77323ZM10.9381 6.62881C11.0114 6.78406 10.9858 6.85628 10.9088 6.71907C10.8317 6.57826 10.8207 6.53854 10.8648 6.53854C10.8831 6.53854 10.9161 6.57826 10.9381 6.62881ZM9.8049 8.17056C10.0616 8.42692 10.0653 8.43775 9.91491 8.88547C9.81223 9.20321 9.75722 9.27542 9.55918 9.36569C9.41983 9.42707 9.31714 9.44151 9.00175 9.44151C8.59835 9.44151 8.49566 9.41263 8.37097 9.2682C8.29029 9.17432 8.08492 8.66161 8.08492 8.56051C8.08492 8.51718 8.18394 8.37276 8.3123 8.23555L8.536 7.98641L8.77805 7.97197C8.91007 7.96475 9.14478 7.95753 9.2988 7.95392L9.58119 7.9467L9.8049 8.17056ZM11.0188 8.23555C10.9528 8.3547 10.9344 8.29332 10.9894 8.14167C11.0261 8.03335 11.0408 8.02252 11.0481 8.0839C11.0555 8.12362 11.0408 8.19583 11.0188 8.23555ZM7.0544 8.17778C7.13509 8.30776 7.15342 8.37998 7.09841 8.37998C7.08008 8.37998 7.04707 8.33665 7.02873 8.27888C7.0104 8.22472 6.98106 8.15251 6.96639 8.1164C6.92238 8.0153 6.97372 8.0478 7.0544 8.17778ZM9.91491 9.38735C9.97726 9.42707 9.66554 9.54983 9.56652 9.52817C9.51518 9.51372 9.53718 9.49206 9.66187 9.43429C9.85624 9.34763 9.8489 9.34763 9.91491 9.38735ZM8.36364 9.42707C8.43332 9.45234 8.45165 9.47762 8.42598 9.50289C8.38931 9.539 8.12159 9.45956 8.12159 9.41263C8.12159 9.38013 8.25729 9.38735 8.36364 9.42707Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_411_1534">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="text-[12px] font-[600] text-[#B0B0B0] ">
                  {user?.location || currentLang.userLocation}
                </span>
              </div>
              <div className=" flex items-center justify-center gap-2">
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.039 0.6875H10.8749C10.6698 0.6875 10.4731 0.768987 10.328 0.914035C10.183 1.05908 10.1015 1.25581 10.1015 1.46094C10.1015 1.66607 10.183 1.86279 10.328 2.00784C10.4731 2.15289 10.6698 2.23437 10.8749 2.23437H12.1719L10.0488 4.35746C7.65146 2.4991 4.17768 2.66996 1.979 4.86969C-0.405996 7.25504 -0.405996 11.1356 1.98041 13.5195C3.12846 14.6641 4.68348 15.3069 6.30463 15.3069C7.92578 15.3069 9.4808 14.6641 10.6288 13.5195C12.8286 11.3195 12.9994 7.84707 11.1411 5.44977L13.2656 3.32809V4.625C13.2656 4.83013 13.3471 5.02685 13.4921 5.1719C13.6371 5.31695 13.8339 5.39844 14.039 5.39844C14.2441 5.39844 14.4409 5.31695 14.5859 5.1719C14.731 5.02685 14.8124 4.83013 14.8124 4.625V1.46094C14.8124 1.35937 14.7924 1.25879 14.7536 1.16496C14.7147 1.07112 14.6577 0.985855 14.5859 0.914035C14.5141 0.842214 14.4288 0.785243 14.335 0.746374C14.2411 0.707506 14.1406 0.6875 14.039 0.6875ZM9.53619 12.4269C8.67851 13.2828 7.51631 13.7635 6.30463 13.7635C5.09294 13.7635 3.93075 13.2828 3.07307 12.4269C1.291 10.6452 1.291 7.74547 3.07307 5.96375C4.85514 4.18203 7.75447 4.18168 9.53619 5.96375C11.3179 7.74582 11.3183 10.6452 9.53619 12.4269Z"
                    fill="#374957"
                  />
                </svg>
                <span className="text-[12px] font-[600] text-[#B0B0B0] ">
                  {user?.sex} , {age} Years Old
                </span>
              </div>
              <button
                onClick={() => {
                  copyToClipboard(window.location.href);
                  toast.success("Link copied to clipboard");
                }}
                className="flex items-center mt-3 justify-center gap-1 px-2 py-2 bg-[#25d366] text-white rounded text-[14px] font-[600]"
              >
                {currentLang.shareProfile}
                <i className="fas fa-share text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center md:items-end justify-center md:justify-start gap-1 w-[80%] mx-auto mt-5 md:mt-[-200px]">
        <span
          onClick={() => {
            copyToClipboard(user?.invite_code);
            toast.success("code copied to clipboard");
          }}
          className="bg-[#D9D9D9] z-20 inline-flex items-center justify-ceitems-center cursor-pointer text-[14px] font-[600] p-2 rounded-lg gap-1"
        >
          <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 20.0001C12.3256 19.9985 13.5964 19.4712 14.5338 18.5339C15.4711 17.5965 15.9984 16.3257 16 15.0001V6.24308C16.0016 5.71744 15.8988 5.19672 15.6976 4.7111C15.4964 4.22548 15.2008 3.78462 14.828 3.41408L12.586 1.17208C12.2155 0.799252 11.7746 0.503681 11.289 0.302499C10.8034 0.101316 10.2826 -0.00147692 9.757 7.84247e-05H5C3.67441 0.00166628 2.40356 0.52896 1.46622 1.4663C0.528882 2.40364 0.00158786 3.67448 0 5.00008V15.0001C0.00158786 16.3257 0.528882 17.5965 1.46622 18.5339C2.40356 19.4712 3.67441 19.9985 5 20.0001H11ZM2 15.0001V5.00008C2 4.20443 2.31607 3.44137 2.87868 2.87876C3.44129 2.31615 4.20435 2.00008 5 2.00008C5 2.00008 9.919 2.01408 10 2.02408V4.00008C10 4.53051 10.2107 5.03922 10.5858 5.41429C10.9609 5.78936 11.4696 6.00008 12 6.00008H13.976C13.986 6.08108 14 15.0001 14 15.0001C14 15.7957 13.6839 16.5588 13.1213 17.1214C12.5587 17.684 11.7956 18.0001 11 18.0001H5C4.20435 18.0001 3.44129 17.684 2.87868 17.1214C2.31607 16.5588 2 15.7957 2 15.0001ZM20 8.00008V19.0001C19.9984 20.3257 19.4711 21.5965 18.5338 22.5339C17.5964 23.4712 16.3256 23.9985 15 24.0001H6C5.73478 24.0001 5.48043 23.8947 5.29289 23.7072C5.10536 23.5196 5 23.2653 5 23.0001C5 22.7349 5.10536 22.4805 5.29289 22.293C5.48043 22.1054 5.73478 22.0001 6 22.0001H15C15.7956 22.0001 16.5587 21.684 17.1213 21.1214C17.6839 20.5588 18 19.7957 18 19.0001V8.00008C18 7.73486 18.1054 7.48051 18.2929 7.29297C18.4804 7.10544 18.7348 7.00008 19 7.00008C19.2652 7.00008 19.5196 7.10544 19.7071 7.29297C19.8946 7.48051 20 7.73486 20 8.00008Z"
              fill="#374957"
            />
          </svg>
          {currentLang.inviteLink}
        </span>
        <span className="text-[12px] font-[500] text-[#8F8F8F] ">
          {currentLang.getReward}
        </span>
      </div>

      <div className="flex items-center justify-center w-[80%] mx-auto mb-5 mt-10 md:mt-[200px]">
        <p className="text-[14px] w-full text-start font-[500] text-[#6E6E6E]">
          {user?.desc || currentLang.userDesc}
        </p>
      </div>

      {/* cv section */}
      <section className="mt-10 rounded-lg bg-[#0751781A] p-5 flex-col gap-5 w-full md:w-[80%] flex items-center justify-center">
        <span>{currentLang.NoCvs}</span>
        <div className="w-full"></div>
      </section>

      {/* Celebrities */}
      <section className="w-full flex flex-col items-center justify-center mt-10 ">
        <h2 className="text-2xl font-semibold mb-4 w-full text-start">
          {currentLang.CelebritiesTitle}
        </h2>
        <div className="w-full relative">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            centeredSlides={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
            }}
            className="w-full"
          >
            {users.map((user, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center bg-gray-100 rounded-lg shadow-md"
              >
                <div className="text-center">
                  <div className="w-full  ">
                    <img className="w-full  " src={slideHead} alt="slideHead" />
                  </div>
                  <div className="w-full mt-[-30px] ">
                    <img
                      src={
                        user?.photo === "https://api.sportiin.com"
                          ? avatar
                          : user?.photo || avatar
                      }
                      alt={`user avatar`}
                      className="w-16 h-16 rounded-full mx-auto mb-2"
                    />
                    <h3 className="text-lg font-[600] ">{user?.name}</h3>
                    {/* <p className="font-[400]">{user?.sex || "male"}</p> */}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-3 py-3">
                    <button className="text-[#EB4335] font-[600] ">
                      {currentLang.REMOVE}
                    </button>
                    <button className="text-white bg-[#075178] px-9 py-2 rounded-xl ">
                      {currentLang.FOLOW}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <div className="swiper-button-next border border-[#F1F1F2] text-black bg-white rounded-full p-2 absolute top-[50%] z-50 left-0 translate-y-[-50%] translate-x-[-50%] ">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_301_338)">
                <path
                  d="M15.5 6L9.5 12L15.5 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_301_338">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="matrix(-1 0 0 1 24.5 0)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="swiper-button-prev border border-[#F1F1F2] text-black bg-white rounded-full p-2 absolute top-[50%] z-50 right-0 translate-y-[-50%] translate-x-[50%]">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_301_332)">
                <path
                  d="M9.5 6L15.5 12L9.5 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_301_332">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      <div className="w-full border-t border-black my-10"></div>

      {/* cources */}
      <section className="w-full flex flex-col items-center justify-center mb-10">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            {currentLang.myCourses}
          </h2>
        </div>
        <div className="flex items-center justify-center gap-10 flex-wrap w-full">
          {/* {courses.slice(0, 4).map((course, index) => { */}
          {/* // return ( */}
          {userCourses ? (
            <div
              // key={index}
              onClick={() => navigate(`/courses/course/${userCourses?.id}`)}
              className="rounded-3xl border overflow-hidden cursor-pointer min-h-[285px] border-[#D9D9D9] w-[260px]"
            >
              <div>
                <img
                  src={userCourses?.image || courseImg}
                  alt="cv image"
                  className="w-full"
                />
              </div>
              <div className=" w-full  p-3 flex flex-col items-start justify-start">
                <h3 className="font-[600] line-clamp-2 overflow-hidden text-ellipsis whitespace-normal ">
                  {userCourses?.title}
                </h3>
                <p
                  className="font-[400] text-[12px] line-clamp-2 overflow-hidden text-ellipsis whitespace-normal"
                  dangerouslySetInnerHTML={{ __html: userCourses?.description }}
                />
                <div className="flex w-full items-center justify-start gap-1">
                  <ReactStars {...defaultStars} />
                  <span className="font-[400] text-[14px] text-[#1B1B1B99] ">
                    (1.2K)
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div>No courses to show</div>
          )}
          {/* ); */}
          {/* })} */}
        </div>
      </section>
    </main>
  );
};

export default UserProfile;
