import React from "react";
// import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";


const AcademyCard = ({ cardData }) => {
  const navigate = useNavigate()
  return (
    <div className="w-[clamp(171px,14.0625vw,270px)] border border-[#F1F1F2] rounded-[clamp(8px,0.625vw,12px)] p-[clamp(5px,0.5208vw,10px)] flex flex-col justify-between ">
      <div className="w-full rounded-[lamp(12px,1.197917vw,23px)] ">
        <img
          className="w-full rounded-[clamp(12px,1.197917vw,23px)] "
          src={
            cardData.outsite_image !== "https://api.sportiin.com"
              ? cardData.outsite_image
              : "https://via.assets.so/img.jpg?w=249&h=141"
          }
          alt="Academy"
        />
      </div>
      <div className="w-full mt-[5px]">
        <h2 className="font-[Cairo] text-[clamp(9px,0.729166vw,14px)] font-[700] leading-[clamp(15px,1.09375vw,21px)] text-[#000000] ">
          {cardData.title}
        </h2>
        <p
          dangerouslySetInnerHTML={{ __html: cardData.description }}
          className="card-desription line-clamp-2 font-[Cairo] text-[clamp(7px,0.625vw,12px)] font-[400] leading-[clamp(14px,0.9375vw,18px)] text-[#1B1B1BE5] "
        />

        <div className="flex w-full items-center justify-start gap-[3px] mt-[5px] ">
          {/* <ReactStars
            {...{
              count: 5,
              size: 11,
              activeColor: "#FFD130",
              edit: false,
              value: 4.5,
              isHalf: true,
              emptyIcon: <i className="far fa-star" />,
              halfIcon: <i className="fa fa-star-half-alt" />,
              filledIcon: <i className="fa fa-star" />,
            }}
          /> */}
          <span className="font-[Cairo] text-[clamp(9px,0.729166vw,14px)] font-[400] leading-[clamp(14px,0.9375vw,18px)] text-[#1B1B1B99] ">
            {cardData.country}
          </span>
        </div>
      </div>
      <div className="w-full mt-[20px] ">
        <button onClick={()=> navigate(`/academy/${cardData.id}`)} className="w-full font-[Cairo] text-[clamp(9px,0.729166vw,14px)] font-[400] leading-[clamp(14px,0.9375vw,18px)] text-[#fff] py-[13px] bg-[#075178] rounded-[8px] ">
          معرفه التفاصيل
        </button>
      </div>
    </div>
  );
};

export default AcademyCard;
