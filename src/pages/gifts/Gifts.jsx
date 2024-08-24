import gift from "../../assets/images/gifts/gift.png";
import balanceBg from "../../assets/images/gifts/balanceBg.jpg";

const Gifts = () => {
  return (
    <main className="container mx-auto">
      <div className="flex items-start justify-between mt-10">
        <div className="flex relative mb-20 w-[60%] flex-col items-start justify-start gap-3 border border-[#F1F1F2] rounded bg-[#F1F1F2] p-5 ">
          <h3 className="text-[18px] font-[600]  ">Withdrawal Notes</h3>
          <div>
            <span className="text-[14px] font-[500]">
              you can read the terms and conditions and learn how to get
              rewards.
            </span>
            <ul className="mt-3 flex flex-col items-start justify-start list-disc p-5 gap-1 ">
              <li className="text-[14px] font-[500]">
                you can read the terms and condition
              </li>
              <li className="text-[14px] font-[500]">
                you can read the terms and condition
              </li>
              <li className="text-[14px] font-[500]">
                you can read the terms and condition
              </li>
              <li className="text-[14px] font-[500]">
                you can read the terms and condition
              </li>
            </ul>
          </div>
          <img
            src={gift}
            alt="gift"
            className="absolute right-0 bottom-[-90px]"
          />
        </div>

        <div className="w-[30%] flex flex-col  ">
          <div
            className="flex items-center justify-between w-full p-5 rounded"
            style={{
              backgroundImage: `url(${balanceBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col items-start justify-start">
              <h3 className="text-[17px] font-[500]">Account Balance</h3>
              <span className="text-[22px] font-[600] flex items-center justify-center gap-1">
                200 <small className="text-[16px] text-[#414141]">L.E</small>
                <svg
                  className="cursor-pointer ml-1"
                  width="30"
                  height="31"
                  viewBox="0 0 30 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_468_2799)">
                    <path
                      d="M15 19.2502C17.0711 19.2502 18.75 17.5713 18.75 15.5002C18.75 13.4291 17.0711 11.7502 15 11.7502C12.9289 11.7502 11.25 13.4291 11.25 15.5002C11.25 17.5713 12.9289 19.2502 15 19.2502Z"
                      fill="black"
                    />
                    <path
                      d="M23.134 8.77245C20.5723 7.01581 17.8307 6.12518 14.9859 6.12518C12.426 6.12518 9.93047 6.8869 7.56855 8.37987C5.18672 9.88866 2.85176 12.6291 0.9375 15.5002C2.48555 18.0783 4.60312 20.7291 6.80859 22.249C9.33867 23.9916 12.0896 24.8752 14.9859 24.8752C17.857 24.8752 20.6021 23.9922 23.148 22.2508C25.3893 20.715 27.5221 18.0678 29.0625 15.5002C27.5168 12.9555 25.3769 10.3111 23.134 8.77245ZM15 21.1252C13.8875 21.1252 12.7999 20.7953 11.8749 20.1772C10.9499 19.5591 10.2289 18.6806 9.80318 17.6528C9.37743 16.6249 9.26604 15.4939 9.48308 14.4028C9.70012 13.3117 10.2359 12.3094 11.0225 11.5227C11.8092 10.736 12.8115 10.2003 13.9026 9.98327C14.9938 9.76622 16.1248 9.87762 17.1526 10.3034C18.1804 10.7291 19.0589 11.4501 19.677 12.3751C20.2951 13.3001 20.625 14.3877 20.625 15.5002C20.6233 16.9915 20.0301 18.4213 18.9756 19.4758C17.9211 20.5303 16.4913 21.1235 15 21.1252Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_468_2799">
                      <rect
                        width="30"
                        height="30"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </div>
            <div>
              <svg
                width="76"
                height="76"
                viewBox="0 0 76 76"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_479_1520)">
                  <path
                    d="M75.9993 72.8335C75.9993 73.6733 75.6656 74.4788 75.0718 75.0726C74.4779 75.6665 73.6724 76.0001 72.8326 76.0001H3.16591C2.32606 76.0001 1.5206 75.6665 0.926739 75.0726C0.332874 74.4788 -0.000756172 73.6733 -0.000756172 72.8335C-0.000756172 71.9936 0.332874 71.1881 0.926739 70.5943C1.5206 70.0004 2.32606 69.6668 3.16591 69.6668H72.8326C73.6724 69.6668 74.4779 70.0004 75.0718 70.5943C75.6656 71.1881 75.9993 71.9936 75.9993 72.8335ZM0.920744 27.0814C0.238398 25.8158 -0.0777231 24.385 0.00785852 22.9497C0.0934402 21.5144 0.577337 20.1314 1.40524 18.9558C2.75823 16.9707 4.57015 15.3412 6.68724 14.2058L30.4404 1.84311C32.7751 0.629112 35.3678 -0.00469971 37.9992 -0.00469971C40.6307 -0.00469971 43.2234 0.629112 45.5581 1.84311L69.3081 14.2153C71.4252 15.3507 73.2371 16.9802 74.5901 18.9653C75.418 20.1409 75.9019 21.5239 75.9875 22.9592C76.0731 24.3946 75.7569 25.8253 75.0746 27.091C74.34 28.4806 73.2382 29.642 71.8892 30.4488C70.5402 31.2557 68.9957 31.6769 67.4239 31.6668H66.4993V57.0001H69.6659C70.5058 57.0001 71.3112 57.3337 71.9051 57.9276C72.499 58.5215 72.8326 59.3269 72.8326 60.1668C72.8326 61.0066 72.499 61.8121 71.9051 62.406C71.3112 62.9998 70.5058 63.3335 69.6659 63.3335H6.33258C5.49273 63.3335 4.68727 62.9998 4.09341 62.406C3.49954 61.8121 3.16591 61.0066 3.16591 60.1668C3.16591 59.3269 3.49954 58.5215 4.09341 57.9276C4.68727 57.3337 5.49273 57.0001 6.33258 57.0001H9.49924V31.6668H8.57458C7.00125 31.6766 5.45543 31.2542 4.10574 30.4456C2.75605 29.637 1.65433 28.4733 0.920744 27.0814ZM15.8326 57.0001H25.3326V31.6668H15.8326V57.0001ZM31.6659 31.6668V57.0001H44.3326V31.6668H31.6659ZM60.1659 31.6668H50.6659V57.0001H60.1659V31.6668ZM6.53208 24.146C6.73076 24.5123 7.02644 24.8168 7.3867 25.0263C7.74697 25.2358 8.15794 25.342 8.57458 25.3335H67.4239C67.8406 25.342 68.2515 25.2358 68.6118 25.0263C68.9721 24.8168 69.2677 24.5123 69.4664 24.146C69.6111 23.9039 69.6811 23.6245 69.6676 23.3428C69.6541 23.0611 69.5577 22.7897 69.3904 22.5626C68.6232 21.4223 67.5923 20.4838 66.3853 19.8266L42.6352 7.45445C41.2039 6.71162 39.615 6.32386 38.0024 6.32386C36.3898 6.32386 34.8009 6.71162 33.3696 7.45445L9.61958 19.8266C8.41303 20.4859 7.38242 21.4253 6.61441 22.5658C6.44686 22.7919 6.34969 23.0624 6.33504 23.3435C6.3204 23.6245 6.38893 23.9036 6.53208 24.146Z"
                    fill="#374957"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_479_1520">
                    <rect width="76" height="76" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flex w-full items-center justify-between mt-3">
            <button className="w-[48%] text[18px] py-3 font-[700] text-[#075178] border border-[#075178] rounded-lg ">
              Deposit
            </button>
            <button className="w-[48%] text[18px] text-white border-[#075178] bg-[#075178] rounded-lg py-3 font-[700] ">withdraw</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Gifts;
