import "flowbite";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useUserLoggedIn from "../../assets/hooks/useUserLoggedIn";
import { logout } from "../../store/slices/user/userSlice";
import { ar, en } from "../../assets/langs/translation";
import { changeLang } from "../../store/slices/settings/settingsSlice";
import server from "../../assets/axios/server";
import { useEffect, useState } from "react";
import defaultUserImage from "../../assets/images/icons/userAvatar.png";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const loggedIn = useUserLoggedIn();
  const dispatch = useDispatch();
  const [filterTypes, setFilterTypes] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handelLogout = () => {
    dispatch(logout());
    window.location = "/login";
  };

  const location = useLocation();

  // get types from api
  useEffect(() => {
    server
      .get("/type-api")
      .then((res) => {
        setFilterTypes(res.data);
      })
      .catch((err) => console.log(err));
  }, [server]);

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang == "en" ? en : ar;

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <svg
              className="h-12"
              xmlns="http://www.w3.org/2000/svg"
              width="188"
              height="58"
              viewBox="0 0 188 58"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 14.7027L24.1972 0L48.3943 14.7027V43.0633L24.1972 57.7162L0 43.0245V14.7027ZM10.8891 21.0281L13.136 19.979L32.6666 30.9949V24.1755L13.136 12.6351L4.83987 17.3562L4.83976 17.3561V27.6725L10.7162 24.1754L10.889 21.0281L10.8891 21.0281ZM32.4937 36.765L10.7165 24.1756L4.84005 27.6727L4.84038 27.6728L26.6176 40.4371L32.4941 36.7651L32.4937 36.765ZM26.6179 40.437L32.4943 36.7651V46.9066L32.4942 46.9066L24.3709 51.6276V44.8083L26.6178 43.4095L26.6179 43.4096V40.437ZM4.84005 33.2679L24.3706 44.8083V51.6276L4.84005 40.6118V33.2679ZM30.185 10.0119L24.1978 6.34L18.2105 10.0119H30.185ZM18.211 10.012L24.1982 13.684L30.1855 10.012H18.211ZM35.259 12.6346L43.5552 17.8802L29.2718 16.3065L35.259 12.6346ZM29.2718 16.3066L37.6788 21.2026L43.5553 17.8803L29.2718 16.3066ZM37.6791 21.2026L43.5555 17.8804V40.0869L37.6791 43.7589V21.2026Z"
                fill="#005478"
              />
              <path
                d="M67.9236 36.3788L67.7795 36.7826L68.1566 36.9867C69.4239 37.6722 71.2107 38.1009 73.1178 38.1009C75.1887 38.1009 76.8779 37.6046 78.0619 36.7008C79.2585 35.7874 79.9039 34.4824 79.9039 32.9695C79.9039 31.6949 79.4834 30.6568 78.6491 29.8081C77.8329 28.978 76.6467 28.3556 75.1585 27.8342C74.0602 27.4494 73.3324 27.1357 72.8777 26.7901C72.6588 26.6238 72.5195 26.4615 72.4325 26.2954C72.3467 26.1314 72.2981 25.9377 72.2981 25.687C72.2981 25.2684 72.4773 24.883 72.8404 24.5916C73.2093 24.2955 73.7936 24.0789 74.6112 24.0789C76.0661 24.0789 77.1957 24.5555 77.7983 24.9056L78.3104 25.203L78.5178 24.6483L79.2818 22.604L79.4338 22.1976L79.0528 21.99C78.0388 21.4374 76.4627 20.9708 74.6806 20.9708C70.8877 20.9708 68.3807 23.1525 68.3807 26.0064C68.3807 28.188 70.0763 29.8428 73.1679 30.8566C74.2831 31.2355 74.9822 31.5845 75.402 31.9605C75.7891 32.3072 75.9519 32.6878 75.9519 33.225C75.9519 33.7155 75.7581 34.1415 75.3477 34.4581C74.9243 34.7847 74.2287 35.0248 73.1873 35.0248C71.7643 35.0248 70.2547 34.4825 69.4163 33.9783L68.893 33.6637L68.6877 34.2387L67.9236 36.3788ZM82.8452 43.6058V44.1058H83.3452H86.3667H86.8667V43.6058V36.468C88.0583 37.5488 89.7668 38.1329 91.6109 38.1329C93.7048 38.1329 95.7455 37.4058 97.2651 35.9225C98.7895 34.4345 99.7515 32.2228 99.7515 29.3282C99.7515 24.395 96.5081 20.9708 92.1318 20.9708C89.7397 20.9708 87.8639 21.7823 86.5232 23.2076L86.4492 21.7959L86.4244 21.3221H85.9499H83.2063H82.6821L82.7068 21.8457C82.7762 23.3131 82.8452 24.9006 82.8452 26.8688V43.6058ZM87.0544 27.3303L87.0545 27.3304L87.0565 27.323C87.5838 25.4404 89.3244 24.2066 91.1941 24.2066C92.6576 24.2066 93.7648 24.8007 94.5166 25.7333C95.2776 26.6772 95.6952 27.9968 95.6952 29.456C95.6952 31.1455 95.2483 32.515 94.4692 33.4525C93.6993 34.379 92.5687 34.9289 91.0899 34.9289C89.1142 34.9289 87.4882 33.7273 86.992 32.0213C86.9248 31.6797 86.8667 31.3443 86.8667 30.9892V28.3381C86.8667 28.0321 86.9519 27.676 87.0544 27.3303ZM121.679 37.2815V37.7815H122.179H125.2H125.7V37.2815V29.0408C125.7 28.6091 125.763 28.1988 125.831 27.8243C126.211 25.9093 127.566 24.6219 129.437 24.6219C129.825 24.6219 130.104 24.6513 130.379 24.7076L130.979 24.8302V24.2177V21.5666V21.1685L130.591 21.0793C130.278 21.0072 129.997 20.9708 129.611 20.9708C127.875 20.9708 126.287 21.8192 125.263 23.2275L125.214 21.805L125.197 21.3221H124.714H122.04H121.502L121.541 21.8583C121.644 23.2783 121.679 24.8299 121.679 26.6452V37.2815ZM134.964 17.6314L134.583 17.725V18.117V21.3221H132.478H131.978V21.8221V23.9622V24.4622H132.478H134.583V32.3946C134.583 34.2346 134.891 35.7906 135.91 36.7723C136.762 37.6618 138.054 38.1009 139.563 38.1009C140.78 38.1009 141.783 37.9375 142.449 37.6852L142.796 37.5541L142.771 37.1848L142.632 35.0767L142.593 34.4788L142.012 34.6246C141.671 34.7101 141.121 34.8012 140.362 34.8012C139.628 34.8012 139.23 34.5752 138.987 34.2305C138.717 33.8478 138.57 33.2255 138.57 32.2987V24.4622H142.446H142.946V23.9622V21.8221V21.3221H142.446H138.57V17.3823V16.7444L137.951 16.8968L134.964 17.6314ZM144.234 36.3788L144.09 36.7826L144.467 36.9867C145.735 37.6722 147.521 38.1009 149.429 38.1009C151.499 38.1009 153.189 37.6046 154.373 36.7008C155.569 35.7874 156.215 34.4824 156.215 32.9695C156.215 31.6949 155.794 30.6568 154.96 29.8081C154.144 28.978 152.957 28.3556 151.469 27.8342C150.371 27.4494 149.643 27.1357 149.188 26.7901C148.97 26.6238 148.83 26.4615 148.743 26.2954C148.657 26.1314 148.609 25.9377 148.609 25.687C148.609 25.2684 148.788 24.883 149.151 24.5916C149.52 24.2955 150.104 24.0789 150.922 24.0789C152.377 24.0789 153.506 24.5555 154.109 24.9056L154.621 25.203L154.828 24.6483L155.593 22.604L155.744 22.1976L155.363 21.99C154.35 21.4374 152.773 20.9708 150.991 20.9708C147.198 20.9708 144.691 23.1525 144.691 26.0064C144.691 28.188 146.387 29.8429 149.479 30.8566C150.594 31.2355 151.293 31.5845 151.713 31.9605C152.1 32.3072 152.263 32.6878 152.263 33.225C152.263 33.7155 152.069 34.1415 151.658 34.4581C151.235 34.7847 150.539 35.0248 149.498 35.0248C148.075 35.0248 146.565 34.4825 145.727 33.9783L145.204 33.6637L144.998 34.2387L144.234 36.3788Z"
                fill="#005478"
                stroke="#005478"
              />
              <path
                d="M108.997 19.4912C107.025 19.8176 105.608 20.5893 104.088 22.1326C102.262 24.0024 101.4 26.0206 101.4 28.5285C101.386 32.5946 103.767 36.067 107.536 37.462C108.734 37.9072 111.437 38.011 112.649 37.6549C115.556 36.809 118.04 34.3902 118.946 31.5409C119.223 30.6506 119.311 30.0421 119.325 28.8995C119.34 27.1187 119.135 26.169 118.405 24.596C116.71 20.9751 112.766 18.8382 108.997 19.4912ZM112.605 20.5893C113.35 20.8564 113.832 21.3758 114.227 22.3552C114.475 22.9636 114.534 23.483 114.344 23.483C114.285 23.483 113.847 23.8243 113.394 24.2398L112.562 24.9967L111.816 24.8334C110.925 24.6405 109.479 24.6257 108.705 24.8186C108.164 24.9373 108.091 24.9076 107.273 24.2695C106.806 23.8985 106.426 23.5721 106.426 23.5572C106.426 23.2604 107.653 20.9306 107.901 20.7377C108.091 20.5893 108.15 20.5151 108.033 20.5448C107.259 20.8119 107.156 20.8267 107.156 20.6783C107.156 20.5893 107.273 20.5003 107.419 20.5003C107.551 20.4854 107.989 20.4557 108.369 20.4409C108.749 20.4261 109.114 20.3519 109.172 20.2925C109.348 20.1144 111.86 20.337 112.605 20.5893ZM113.657 20.6635C113.876 20.7525 114.022 20.8564 113.979 20.9009C113.891 20.99 113 20.5596 113 20.4261C113 20.3815 113.058 20.3815 113.131 20.4261C113.19 20.4706 113.438 20.5745 113.657 20.6635ZM116.287 24.4476C117.309 25.0263 117.558 25.2341 117.806 25.7535C118.463 27.1484 118.551 28.9589 118.04 30.4725C117.821 31.0958 117.748 31.1848 117.266 31.259C116.973 31.3184 116.331 31.5113 115.834 31.6745L114.943 32.001L114.402 31.3926C113.292 30.1312 113.307 30.1609 113.38 28.9589C113.423 28.3356 113.365 27.3265 113.248 26.629L113.044 25.4122L113.935 24.596C114.431 24.1508 114.884 23.7947 114.943 23.7798C115.016 23.7798 115.615 24.0766 116.287 24.4476ZM107.668 27.1336C107.697 28.202 107.799 29.1369 107.931 29.4931L108.135 30.0867L107.127 31.2293L106.119 32.372L105.462 32.09C105.111 31.9268 104.483 31.7635 104.088 31.7042C103.577 31.63 103.285 31.5113 103.124 31.2887C102.759 30.7544 102.452 29.4486 102.438 28.3059C102.423 27.3413 102.482 27.1039 102.92 26.1987C103.416 25.2193 103.46 25.1747 104.644 24.5663L105.856 23.9431L106.747 24.6405L107.638 25.3528L107.668 27.1336ZM102.759 25.6348C102.321 26.3916 102.233 26.0503 102.642 25.2341C102.861 24.8186 102.993 24.685 103.022 24.8334C103.051 24.967 102.934 25.3231 102.759 25.6348ZM118.084 25.0412C118.376 25.6793 118.274 25.9761 117.967 25.4122C117.66 24.8334 117.616 24.6702 117.791 24.6702C117.865 24.6702 117.996 24.8334 118.084 25.0412ZM113.57 31.3777C114.592 32.4313 114.607 32.4758 114.008 34.316C113.599 35.6219 113.38 35.9186 112.591 36.2896C112.036 36.5419 111.627 36.6013 110.37 36.6013C108.763 36.6013 108.354 36.4826 107.858 35.889C107.536 35.5031 106.718 33.3959 106.718 32.9804C106.718 32.8023 107.112 32.2087 107.624 31.6448L108.515 30.6209L109.479 30.5615C110.005 30.5319 110.94 30.5022 111.554 30.4873L112.678 30.4577L113.57 31.3777ZM118.405 31.6448C118.142 32.1345 118.069 31.8823 118.288 31.259C118.434 30.8138 118.493 30.7693 118.522 31.0216C118.551 31.1848 118.493 31.4816 118.405 31.6448ZM102.613 31.4074C102.934 31.9416 103.007 32.2384 102.788 32.2384C102.715 32.2384 102.584 32.0603 102.511 31.8229C102.438 31.6003 102.321 31.3035 102.262 31.1551C102.087 30.7396 102.292 30.8732 102.613 31.4074ZM114.008 36.3787C114.256 36.5419 113.014 37.0465 112.62 36.9574C112.415 36.8981 112.503 36.809 113 36.5716C113.774 36.2154 113.745 36.2154 114.008 36.3787ZM107.828 36.5419C108.106 36.6458 108.179 36.7497 108.077 36.8535C107.931 37.0019 106.864 36.6755 106.864 36.4826C106.864 36.349 107.405 36.3787 107.828 36.5419Z"
                fill="#005478"
              />
              <path
                d="M166.875 37.7997H167.375V37.2997V21.6372V21.1372H166.875H163.764H163.264V21.6372V37.2997V37.7997H163.764H166.875ZM171.55 37.2997V37.7997H172.05H175.161H175.661V37.2997V27.8828C175.661 27.4353 175.727 27.0182 175.837 26.7406L175.843 26.7277L175.847 26.7146C176.312 25.3248 177.717 24.1436 179.544 24.1436C180.877 24.1436 181.707 24.6125 182.223 25.3084C182.757 26.0297 183.004 27.0644 183.004 28.2711V37.2997V37.7997H183.504H186.615H187.115V37.2997V27.9475C187.115 25.1359 186.146 23.3175 184.797 22.2131C183.468 21.1244 181.832 20.7812 180.57 20.7812C178.216 20.7812 176.388 21.7325 175.256 22.9363L175.165 21.6032L175.133 21.1372H174.666H171.908H171.365L171.41 21.678C171.514 22.9535 171.55 24.2653 171.55 25.8764V37.2997Z"
                fill="#005478"
                stroke="#005478"
              />
              <path
                d="M168.345 16.6864C168.343 15.8481 168.057 15.0774 167.52 14.5121C166.979 13.9417 166.21 13.6104 165.308 13.6104C163.523 13.6104 162.225 14.9681 162.225 16.6947C162.225 18.3616 163.463 19.732 165.214 19.732C166.154 19.732 166.955 19.4077 167.517 18.8454C168.077 18.2855 168.37 17.5178 168.345 16.6864Z"
                fill="#005478"
                stroke="#005478"
              />
            </svg>
          </Link>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {loggedIn ? (
              <>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full border-[2px] border-gray-800"
                    src={user?.photo || defaultUserImage}
                    alt="user photo"
                  />
                </button>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {user?.name}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                      {user?.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        {currentLang.Profile}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        {currentLang.Settings}
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handelLogout}
                        className="block px-4 border-none outline-none py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        {currentLang.SignOut}
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <button onClick={() => navigate("/login")}>
                {currentLang.login}
              </button>
            )}

            {/* <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              class="text-white bg-blue-800  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
              type="button"
            >
              {lang === "en" ? "English" : "العربيه"}
              <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button> */}

            <div
              id="dropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100"
            >
              <ul
                class="flex flex-col gap-3 bg-[#D9D9D9] rounded-lg w-[112px] items-center justify-center py-2 "
                aria-labelledby="dropdownDefaultButton"
              >
                <li
                  onClick={() => {
                    dispatch(changeLang({ lang: "en" }));
                  }}
                  className="cursor-pointer w-full text-center"
                >
                  English
                </li>
                <li
                  onClick={() => {
                    dispatch(changeLang({ lang: "ar" }));
                  }}
                  className="cursor-pointer w-full text-center"
                >
                  العربيه
                </li>
              </ul>
            </div>

            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 md:rounded-[91px] overflow-hidden md:border-2 border-[#F1F1F2] "
            id="navbar-user"
          >
            {/* nav links */}
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className="!m-0 ">
                <Link
                  to="/"
                  className={`block py-2 md:border-e px-3 text-gray-900  ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  {currentLang.home}
                </Link>
              </li>

              <li className="!m-0 ">
                <Link
                  to="/courses"
                  className={`block py-2 md:border-e px-3 text-gray-900  ${
                    location.pathname.includes("/courses") ? "active" : ""
                  }`}
                >
                  {currentLang.freeCourses}
                </Link>
              </li>

              <li className="!m-0 ">
                <Link
                  to="/trainees"
                  className={`block py-2 md:border-e px-3 text-gray-900  ${
                    location.pathname === "/trainees" ? "active" : ""
                  }`}
                >
                  {currentLang.trainersTitle}
                </Link>
              </li>

              {/* {loggedIn && (
                <li>
                  <Link
                    to="/gifts"
                    className="block md:border-s md:border-e !m-0 border-[#F1F1F2] py-2 px-5 text-gray-900 rounded"
                  >
                    {currentLang.Gifts}
                  </Link>
                </li>
              )} */}

              {/* <li className="!m-0 ">
                <div
                  className={`block md:border-s w-fit md:border-e !m-0 border-[#F1F1F2] py-2 px-[5px] text-gray-900 `}
                >
                  <button
                    id="dropdownEmployment"
                    data-dropdown-toggle="educationDropdown"
                    class=" inline-flex items-center text-gray-900 "
                    type="button"
                  >
                    {currentLang.cvSectoinTitle}
                    <svg
                      class="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  <div
                    id="educationDropdown"
                    class="z-50 hidden min-w-[140px] w-full md:w-auto p-4 md:p-0 rounded-[5px] bg-white divide-y divide-gray-100"
                  >
                    <ul
                      class="flex flex-col gap-1 rounded-[5px] w-full items-center justify-center border border-[#d9d9d9] "
                      aria-labelledby="dropdownEmployment"
                    >
                      <li className="cursor-pointer w-full text-center" onClick={() => document.getElementById('educationDropdown').classList.add('hidden')}>
                        <Link
                          to="/jobOpportunities"
                          className={`block !m-0 py-2 px-5 text-gray-900 ${
                            location.pathname.includes("/jobOpportunities")
                              ? "active"
                              : ""
                          }`}
                        
                        >
                          {currentLang.JobOpportunities}
                        </Link>
                      </li>
                      <li className="cursor-pointer w-full text-center" onClick={() => document.getElementById('educationDropdown').classList.add('hidden')}>
                        <Link
                          to="/job-seekers"
                          className={`block md:border-s md:border-e !m-0 border-[#F1F1F2] py-2 px-5 text-gray-900 ${
                            location.pathname === "/job-seekers" ? "active" : ""
                          }`}
                        
                        >
                          {currentLang.JobSeeker}
                        </Link>
                      </li>
                      
                    </ul>
                  </div>
                </div>
              </li>

              <li className="!m-0 ">
                <div
                  className={`block md:border-s w-fit md:border-e !m-0 border-[#F1F1F2] py-2 px-[5px] text-gray-900 `}
                >
                  <button
                    id="dropdownInstitutions"
                    data-dropdown-toggle="institutionsDropdown"
                    class=" inline-flex items-center text-gray-900 "
                    type="button"
                  >
                    {currentLang.Institutions}
                    <svg
                      class="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  <div
                    id="institutionsDropdown"
                    class="z-50 hidden min-w-[140px] w-full md:w-auto p-4 md:p-0 rounded-[5px] bg-white divide-y divide-gray-100"
                  >
                    <ul
                      class="flex flex-col gap-1 rounded-[5px] w-full items-center justify-center border border-[#d9d9d9] "
                      aria-labelledby="dropdownInstitutions"
                    >
                      <li className="cursor-pointer w-full text-center" onClick={() => document.getElementById('institutionsDropdown').classList.add('hidden')}>
                        <Link
                          to="/academy?type=all"
                          className={`block md:border-s md:border-e !m-0 border-[#F1F1F2] py-2 px-5 text-gray-900 ${
                            location.pathname.includes("/academy") &&
                            searchParams.get("type") === "all"
                              ? "active"
                              : ""
                          }`}
                        >
                          {currentLang.allInstitutions}
                        </Link>
                      </li>
                      {filterTypes?.map((type, index) => {
                        return (
                          <li
                            key={index}
                            className="cursor-pointer w-full text-center"
                            onClick={() => document.getElementById('institutionsDropdown').classList.add('hidden')}
                          >
                            <Link
                              to={`/academy?type=${type}`}
                              className={`block md:border-s md:border-e !m-0 border-[#F1F1F2] py-2 px-5 text-gray-900 ${
                                location.pathname.includes("/academy") &&
                                searchParams.get("type") === type
                                  ? "active"
                                  : ""
                              } `}
                            >
                              {type}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </li> */}

              <li className="!m-0 ">
                <Link
                  to="/about"
                  className={`block md:border-s !m-0 border-[#F1F1F2] py-2 px-5 text-gray-900 ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                >
                  {currentLang.About}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
