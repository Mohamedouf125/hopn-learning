import cvImg from "../../assets/images/home/cvImg.png";

const Cv = ({ cv }) => {
  return (
    <div className="bg-[#D9D9D9] p-5 rounded-lg md:h-[492px] relative border border-[#D9D9D9] flex flex-col items-start justify-start w-full md:w-[260px]">
      <a target="_blank" href={cv.image}>
        <img
          src={cv.image || cvImg}
          alt="cv image"
          className="w-full rounded  "
        />
      </a>
      <div>
        <h3 className="text-[16px] font-[600] mt-2 ">{cv.title}</h3>
        <p
          className="font-[400] text-[14px] mt-2 "
          dangerouslySetInnerHTML={{ __html: cv.description }}
        />
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
