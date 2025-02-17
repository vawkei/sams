export const responsive = {
  superLargeDesktop:{
    breakpoint: { max: 4000, min: 3020 },
    items: 5,    
  },  
  desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
     // slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };