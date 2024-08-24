import React from "react";
import FullPagePopup from "../popups/FullPagePopup";

const ExceptionalGifts = () => {
  return (
    <FullPagePopup>
      <div className="bg-white mt-20 rounded-lg overflow-auto max-h-[80vh] scrollbar-hide">
        <h2 className="w-full text-center bg-[#075178] text-white py-3 font-[600] text-[20px] ">
          Exceptional gifts
        </h2>
        <div>
          <h3>Did you know that you can get exceptional gifts?</h3>
        </div>
        <div>
          <ul>
            <li>
              You can get other training programs for free, just invite 10
              friends to get another free training program.
            </li>
            <li>
              Also for every 10 friends who register through your invitation
              link you will get another free training program with a maximum of
              10 training programs.
            </li>
            <li>
              Just copy the following invitation link and share it with your
              friends.
              <span className="bg-[#075178] flex items-center justify-center">
                Copy invitation code
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 20.0001C12.3256 19.9985 13.5964 19.4712 14.5338 18.5339C15.4711 17.5965 15.9984 16.3257 16 15.0001V6.24308C16.0016 5.71744 15.8988 5.19672 15.6976 4.7111C15.4964 4.22548 15.2008 3.78462 14.828 3.41408L12.586 1.17208C12.2155 0.799252 11.7746 0.503681 11.289 0.302499C10.8034 0.101316 10.2826 -0.00147692 9.757 7.84247e-05H5C3.67441 0.00166628 2.40356 0.52896 1.46622 1.4663C0.528882 2.40364 0.00158786 3.67448 0 5.00008V15.0001C0.00158786 16.3257 0.528882 17.5965 1.46622 18.5339C2.40356 19.4712 3.67441 19.9985 5 20.0001H11ZM2 15.0001V5.00008C2 4.20443 2.31607 3.44137 2.87868 2.87876C3.44129 2.31615 4.20435 2.00008 5 2.00008C5 2.00008 9.919 2.01408 10 2.02408V4.00008C10 4.53051 10.2107 5.03922 10.5858 5.41429C10.9609 5.78936 11.4696 6.00008 12 6.00008H13.976C13.986 6.08108 14 15.0001 14 15.0001C14 15.7957 13.6839 16.5588 13.1213 17.1214C12.5587 17.684 11.7956 18.0001 11 18.0001H5C4.20435 18.0001 3.44129 17.684 2.87868 17.1214C2.31607 16.5588 2 15.7957 2 15.0001ZM20 8.00008V19.0001C19.9984 20.3257 19.4711 21.5965 18.5338 22.5339C17.5964 23.4712 16.3256 23.9985 15 24.0001H6C5.73478 24.0001 5.48043 23.8947 5.29289 23.7072C5.10536 23.5196 5 23.2653 5 23.0001C5 22.7349 5.10536 22.4805 5.29289 22.293C5.48043 22.1054 5.73478 22.0001 6 22.0001H15C15.7956 22.0001 16.5587 21.684 17.1213 21.1214C17.6839 20.5588 18 19.7957 18 19.0001V8.00008C18 7.73486 18.1054 7.48051 18.2929 7.29297C18.4804 7.10544 18.7348 7.00008 19 7.00008C19.2652 7.00008 19.5196 7.10544 19.7071 7.29297C19.8946 7.48051 20 7.73486 20 8.00008Z"
                    fill="white"
                  />
                </svg>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </FullPagePopup>
  );
};

export default ExceptionalGifts;
