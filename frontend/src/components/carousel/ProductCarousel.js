import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./Responsive";

import CarouselItems from "./CarouselItems";

const ProductCarousel = () => {
  return (
    <div>
      <Carousel
        
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={300}
        customTransition="all 500ms ease"
        transitionDuration={1000}>
        <CarouselItems />
      </Carousel>
      {/* <CarouselItems /> */}
    </div>
  );
};

export default ProductCarousel;

// import React from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import CarouselItems from "./CarouselItems";

// const SimpleSlider =() => {
//   var settings = {
//     dots: true,
//     autoplay:true,
//     autoplaySpeed:3000,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1
//   };
//   return (
//     <Slider {...settings}>
//       <div>
//           <CarouselItems />
//       </div>
//     </Slider>
//   );
//   };
//   export default SimpleSlider;
