import server from "../../assets/axios/server";
import { useEffect, useState } from "react";
import { ar, en } from "../../assets/langs/translation";
import { useSelector } from "react-redux";

const AcademyFilters = ({ filters, setfilters }) => {
  const [countries, setCountries] = useState([]);
  const [countriesopendropdown, setcountriesopendropdown] = useState(false);
  const [typesopendropdown, settypesopendropdown] = useState(false);

  useEffect(() => {
    server
      .get("/countries-api")
      .then((res) => {
        setCountries(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [server]);

  const choseCountry = (country) => {
    setfilters((prev) => ({ ...prev, country }));
    setcountriesopendropdown(false);
  };

  const choseInstitutions = (type) => {
    setfilters((prev) => ({ ...prev, type }));
    settypesopendropdown(false);
  };

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang === "en" ? en : ar;

  return (
    <div className="flex px-[5px] sm:px-0 items-center justify-between w-full max-w-[1060px] border-t border-b border-[#F1F1F2] mt-[clamp(10px,1.0416666666666665vw,20px)] py-[10px] ">
      <div className="flex items-center justify-start gap-[clamp(8px,0.7291666666666666vw,14px)] w-full">
        <svg
          width="22"
          height="18"
          viewBox="0 0 22 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.25 4C17.25 6.07107 15.5711 7.75 13.5 7.75C11.4289 7.75 9.75 6.07107 9.75 4C9.75 1.92893 11.4289 0.25 13.5 0.25C15.5711 0.25 17.25 1.92893 17.25 4ZM13.5 6.25C14.7426 6.25 15.75 5.24264 15.75 4C15.75 2.75736 14.7426 1.75 13.5 1.75C12.2574 1.75 11.25 2.75736 11.25 4C11.25 5.24264 12.2574 6.25 13.5 6.25Z"
            fill="#1C274C"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.75 14C4.75 16.0711 6.42893 17.75 8.5 17.75C10.5711 17.75 12.25 16.0711 12.25 14C12.25 11.9289 10.5711 10.25 8.5 10.25C6.42893 10.25 4.75 11.9289 4.75 14ZM8.5 16.25C7.25736 16.25 6.25 15.2426 6.25 14C6.25 12.7574 7.25736 11.75 8.5 11.75C9.74264 11.75 10.75 12.7574 10.75 14C10.75 15.2426 9.74264 16.25 8.5 16.25Z"
            fill="#1C274C"
          />
          <path
            d="M13.25 13.9585C13.25 13.5443 13.5858 13.2085 14 13.2085H21C21.4142 13.2085 21.75 13.5443 21.75 13.9585C21.75 14.3727 21.4142 14.7085 21 14.7085H14C13.5858 14.7085 13.25 14.3727 13.25 13.9585Z"
            fill="#1C274C"
          />
          <path
            d="M8 3.20852C8.41421 3.20852 8.75 3.54431 8.75 3.95852C8.75 4.37273 8.41421 4.70852 8 4.70852L1 4.70852C0.585786 4.70852 0.25 4.37273 0.25 3.95852C0.25 3.54431 0.585786 3.20852 1 3.20852L8 3.20852Z"
            fill="#1C274C"
          />
          <path
            d="M0.25 13.9585C0.25 13.5443 0.585787 13.2085 1 13.2085H3C3.41421 13.2085 3.75 13.5443 3.75 13.9585C3.75 14.3727 3.41421 14.7085 3 14.7085H1C0.585787 14.7085 0.25 14.3727 0.25 13.9585Z"
            fill="#1C274C"
          />
          <path
            d="M21 3.20852C21.4142 3.20852 21.75 3.54431 21.75 3.95852C21.75 4.37273 21.4142 4.70852 21 4.70852H19C18.5858 4.70852 18.25 4.37273 18.25 3.95852C18.25 3.54431 18.5858 3.20852 19 3.20852H21Z"
            fill="#1C274C"
          />
        </svg>
        <span className=" font-[Cairo] text-[clamp(12px,0.8333333333333334vw,16px)] font-[400] leading-[30px] text-[#000] ">
          {currentLang.filters}
        </span>
      </div>

      <div className="flex items-center justify-end gap-[clamp(8px,0.7291666666666666vw,14px)] w-full">
        <div className="flex items-center justify-start gap-[clamp(10px,1.0416666666666665vw,20px)]">
          <span className=" hidden sm:inline-block font-[Cairo] text-[clamp(12px,0.7291666666666666vw,14px)] font-[400] leading-[26px] text-[#000] ">
            {currentLang.Institutions2}
          </span>
          <button
            id="academyDropdownButton"
            data-dropdown-toggle="academyDropdown"
            className=" text-nowrap font-[Cairo] text-[clamp(12px,0.7291666666666666vw,14px)] font-[400] leading-[26px] text-[#000] flex items-center justify-center  "
            type="button"
            onClick={() => settypesopendropdown((prev) => !prev)}
          >
            {filters.type === "all"
              ? `${currentLang.allInstitutions}`
              : `${filters.type}`}
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
            id="academyDropdown"
            class={`z-10 ${
              typesopendropdown ? "block " : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
            style={{
              position: "absolute",
              inset:`0px auto auto 0px`,
              margin: "0px",
              transform: lang === "en" ? "translate3d(1177px, 492px, 0px)": "translate3d(604px, 492px, 0px)" ,
            }}
          >
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="academyDropdownButton"
            >
              <li
                onClick={() => choseInstitutions("all")}
              >
                <div class="block px-4 py-2 hover:bg-gray-100">
                  {currentLang.allInstitutions}
                </div>
              </li>
              <li onClick={() => choseInstitutions(currentLang.gym)}>
                <div class="block px-4 py-2 hover:bg-gray-100">
                  {currentLang.gym}
                </div>
              </li>
              <li onClick={() => choseInstitutions(currentLang.academy)}>
                <div class="block px-4 py-2 hover:bg-gray-100">
                  {currentLang.academy}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-l border-[#F1F1F2] h-[38px] w-[1px] "></div>
        {/* countries */}
        <div className="flex items-center justify-start gap-[clamp(10px,1.0416666666666665vw,20px)]">
          <span className="hidden sm:inline-block font-[Cairo] text-[clamp(12px,0.7291666666666666vw,14px)] font-[400] leading-[26px] text-[#000] ">
            {currentLang.country}
          </span>
          <button
            id="countryDropdownButton"
            data-dropdown-toggle="countryDropdown"
            className=" text-nowrap font-[Cairo] text-[clamp(12px,0.7291666666666666vw,14px)] font-[400] leading-[26px] text-[#000] flex items-center justify-center  "
            type="button"
            onClick={() => setcountriesopendropdown((prev) => !prev)}
          >
            {filters.country === "all"
              ? `${currentLang.allCountries}`
              : `${filters.country}`}
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
            id="countryDropdown"
            class={`z-10 ${
              countriesopendropdown ? "block " : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
            style={{
              position: "absolute",
              inset: "0px auto auto 0px",
              margin: "0px",
              transform: lang === "en" ? `translate3d(604px, 492px, 0px)` : "translate3d(410.5px, 492px, 0px)",
            }}
          >
            <ul
              class="py-2 text-sm text-gray-700"
              aria-labelledby="countryDropdownButton"
            >
              <li onClick={() => choseCountry("all")}>
                <div class="block px-4 py-2 hover:bg-gray-100">
                  {currentLang.allCountries}
                </div>
              </li>
              {countries.map((country) => {
                return (
                  <li
                    key={country.id}
                    onClick={() => choseCountry(country.name)}
                  >
                    <div class="block px-4 py-2 hover:bg-gray-100">
                      {country.name}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyFilters;
