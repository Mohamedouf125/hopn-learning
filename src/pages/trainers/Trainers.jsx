import Masonry from "react-masonry-css";
import "./trainers.css";

import image1 from "../../assets/images/academy/academyCover.jpeg";
import image2 from "../../assets/images/academy/academyLogo.png";
import image3 from "../../assets/images/academy/traImg.png";

const images = [image1, image2, image3, image1, image2, image3, image1, image2];

const Trainers = () => {
  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="container mx-auto lg:max-w-[1060px] flex flex-col items-center justify-center px-[5px] sm:px-0 mb-[50px] mt-[20px]">
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {images.map((src, index) => (
          <div key={index} className="masonry-item">
            <img className="!rounded-[10px]" src={src} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Trainers;
