import { Link } from "react-router-dom";
import footerLogo from "../../assets/images/logo/footerLogo.png";

import hopnLogo from "../../assets/images/logo/hopnLogo.png";
import { ar, en } from "../../assets/langs/translation";
import { useSelector } from "react-redux";

const Footer = () => {
  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang == "en" ? en : ar;
  return (
    <footer className="w-full bg-[#0A142F] flex items-center justify-center text-white">
      <div className="container mx-auto flex flex-col items-center justify-center p-5 pb-2">
        <div className="flex items-center justify-between gap-10 lg:gap-0 flex-col lg:flex-row w-full">
          <div className="flex w-full flex-col lg:flex-row items-start justify-between gap-8 lg:gap-0">
            <div className="w-full lg:w-[20%] flex items-center justify-center mt-5  ">
              <img
                className="w-[200px] md:w-full"
                src={footerLogo}
                alt="footerLogo"
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full lg:w-[30%] ">
              <div className="text-[16px] font-[700] w-full text-start ">
                {currentLang.Links}
              </div>
              <ul className="flex p-5 flex-col items-start w-full justify-start mt-3 gap-3 list-disc">
                <li className="text-[16px] font-[400] text-[#ffffffb4]">
                  <a
                    href="https://wa.me/4915252455276?text=مرحباً،%20تواصلي%20معكم%20بخصوص%20الشكاوي%20وخدمة%20العملاء"
                    target="_blank"
                  >
                    {currentLang.customerService}
                  </a>
                </li>
                <li className="text-[16px] font-[400] text-[#ffffffb4]">
                  <Link to={"/about#rulesCourse"}>
                    {currentLang.coursesRules}
                  </Link>
                </li>
                <li className="text-[16px] font-[400] text-[#ffffffb4]">
                  <Link to={"/about#rulesCertificates"}>
                    {currentLang.certificatesRules}
                  </Link>
                </li>
                <li className="text-[16px] font-[400] text-[#ffffffb4]">
                  <a
                    href="https://wa.me/4915252455276?text=مرحبا،%20هل%20يمكنني%20التحقق%20من%20الشهادة%20التالية"
                    target="_blank"
                  >
                    {currentLang.verifyCertificates}
                  </a>
                </li>
                <li className="text-[16px] font-[400] text-[#ffffffb4]">
                  <a href="https://hopn.online/" target="_blank">
                    {currentLang.Partners}
                  </a>
                </li>
                <li className="text-[16px] font-[400] text-[#ffffffb4]">
                  <a href="https://forms.gle/xNpk6WDVaSKJZeiu8" target="_blank">
                    {currentLang.workWithUs}
                  </a>
                </li>
                <li className="text-[16px] font-[400] text-[#ffffffb4]">
                  <a
                    href="https://wa.me/4915252455276?text=مرحبا،%20هل%20يمكنني%20،%20التعرف%20علي%20المزيد%20من%20باقات%20الإعلان%20علي%20موقعكم"
                    target="_blank"
                  >
                    {currentLang.advertiseWithUs}
                  </a>
                </li>
                <li className="text-[16px] font-[400] text-[#ffffffb4]">
                  <Link to="/about#privacy">{currentLang.privacy}</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start justify-start w-full lg:w-[40%] ">
              <div className=" w-full text-start">
                <h4 className="text-[16px] font-[700]">
                  {currentLang.aboutSportsIn}
                </h4>
                <p className="text-[14px] font-[500] text-[#ffffffe1]">
                  {currentLang.goals}
                </p>
              </div>
              <ul className="flex p-5 flex-col items-start w-full justify-start mt-3 gap-3 list-disc">
                <li className="text-[16px] font-[400] text-[#ffffffb4]">
                  {currentLang.goal1}
                </li>
                <li className="text-[16px] font-[400] text-[#ffffffb4]">
                  {currentLang.goal2}
                </li>
                <li className="text-[16px] font-[400] text-[#ffffffb4]">
                  {currentLang.goal4}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center flex-col lg:flex-row gap-10 lg:gap-0 justify-between mt-10 border-b border-[#ffffff42] p-5">
          <div className=" flex items-center justify-center gap-5">
            <div className="text-[14px] font-[500]">
              <a href="/">{currentLang.home}</a>
            </div>
            <div className="text-[14px] font-[500]">
              <a href="/courses">{currentLang.Courses}</a>
            </div>
            <div className="text-[14px] font-[500]">
              <a href="/about">{currentLang.About}</a>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5">
            <a target="_blank" href="https://wa.me/4915252455276">
              <div className="flex items-center justify-center py-2 rounded-full border border-[#ffffff50] w-[35px] h-[35px]">
                <i class="fab fa-whatsapp"></i>
              </div>
            </a>
            <a
              target="_blank"
              href={
                "https://www.facebook.com/profile.php?id=61564821815728&mibextid=ZbWKwL"
              }
            >
              <div className="flex items-center justify-center py-2 rounded-full border border-[#ffffff50] w-[35px] h-[35px]">
                <i className="fab fa-facebook-f"></i>
              </div>
            </a>
            <a href="mailto:info@sportiin.com?subject=Inquiry&body=Hello, I would like to inquire about...">
              <div className="flex items-center justify-center py-2 rounded-full border border-[#ffffff50] w-[35px] h-[35px]">
                <i class="fas fa-envelope"></i>
              </div>
            </a>
          </div>
        </div>
        <div className="w-full mt-3 flex items-center justify-between flex-col md:flex-row">
          <div>{currentLang.rights}</div>
          <div className="flex items-center justify-start gap-2">
            <span> {currentLang.cooperation}</span>
            <img className="w-[63px]" src={hopnLogo} alt="hopn logo" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
