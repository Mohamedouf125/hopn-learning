import { useSelector } from "react-redux";
import cvImg from "../../assets/images/home/cvImg.png";
import { ar, en } from "../../assets/langs/translation";
import useCopyToClipboard from "../../assets/hooks/useCopyToClipboard";
import { toast } from "react-toastify";

const Cv = ({ cv, setchosedCv, setopencvpopup }) => {
  const { copyToClipboard } = useCopyToClipboard();

  // to set lang
  const { lang } = useSelector((state) => state.settings);
  const currentLang = lang == "en" ? en : ar;
  return (
    <div
      onClick={() => {
        setchosedCv(cv);
        setopencvpopup(true);
      }}
      className="bg-[#D9D9D9] cursor-pointer rounded-lg border border-[#D9D9D9] p-[2px] flex flex-col items-start justify-start w-[49%] md:w-[260px]"
    >
      <div className="w-full">
        <img
          src={cv.image || cvImg}
          alt="cv image"
          className="w-full rounded h-[150px] md:h-[200px]"
        />
      </div>
      <div className="w-full relative p-2 mt-2">
        <h3 className="text-[16px] w-full text-center font-[500]">
          {cv.country}
        </h3>
        <p
          style={{ direction: "ltr" }}
          className="font-[400] text-[14px] w-full text-left line-clamp-1 "
        >
          <span className="font-[600]">Job:</span> {cv.job}
        </p>
        <p
          style={{
            direction: "ltr",
            minHeight: "calc(1.4rem * 2)",
          }}
          className="font-[400] text-[14px] leading-[1.5] line-clamp-2 md:line-clamp-1 w-full text-left"
        >
          <span className="font-[600]">About:</span> {cv.about_you}
        </p>

        <p
          style={{ direction: "ltr" }}
          className="font-[400] text-[14px] w-full text-left line-clamp-1 "
        >
          <span className="font-[600]">Age:</span> {cv.age}
        </p>
        {cv.travel === "yes" && (
          <p className="font-[400] text-[14px] mt-2 ">
            {currentLang.canTravel}
          </p>
        )}
        <a
          target="_blank"
          href={`https://wa.me/${cv.whatsnumber}`}
          className="font-[400] rounded-lg block text-center text-white px-5 py-1 w-full bg-[#25d366] text-[14px] mt-2 "
        >
          {currentLang.whatsapp}
        </a>
        <button
          onClick={() => {
            copyToClipboard(window.location.href);
            toast.success("Link copied to clipboard");
          }}
          className="font-[400] rounded-lg block text-center text-white px-5 py-1 w-full bg-[#1c6596] text-[14px] mt-2 "
        >
          {currentLang.share}
          <i className="fas fa-share text-white"></i>
        </button>
        {/* <p
          className="font-[400] text-[14px] mt-2 "
          dangerouslySetInnerHTML={{ __html: cv.description }}
        /> */}
      </div>
      {/* <div
      onClick={() => navigate(`/user/profile/${cv.id}`)}
      className="bg-white cursor-pointer w-full absolute bottom-0 left-0 px-5 rounded-lg p-3 flex items-center justify-between gap-2"
    >
      <img
        src={cv.photo}
        alt={"cv"}
        className="mt-[-60px] w-[66px] h-[66px] rounded-full "
      />
      <div className="flex flex-col items-center justify-center">
        <h3 className="font-[600] ">{cv.name}</h3>
        <p className="font-[400]">{cv.job}</p>
      </div>
    </div> */}
    </div>
  );
};

export default Cv;