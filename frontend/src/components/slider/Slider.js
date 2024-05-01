import { SliderData } from "./SliderData";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import classes from "./Slider.module.css";
import { useEffect, useState } from "react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideLength = SliderData.length;
  //console.log(slideLength);

  const next = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };
  const prev = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  let timeInterval = 3000;
  let slideInterval;

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    function auto() {
      slideInterval = setInterval(next, timeInterval);
    }
    auto();
    return () => {
      clearInterval(slideInterval);
    };
  }, [currentSlide, slideInterval]);

  return (
    <div className={classes.slider}>
      <AiOutlineArrowLeft className={classes.prev} onClick={prev} />
      <AiOutlineArrowRight className={classes.next} onClick={next} />
      {SliderData.map((slide, index) => {
        return (
          <div
            key={index}
            className={
              index === currentSlide
                ? `${classes.slide} ${classes.current}`
                : `${classes.slide}`
            }>
            {index === currentSlide && (
              <div className={classes.slideFirstDiv}>
                <div
                  className={`${classes["main-image"]} ${classes["blur-load"]}`}>
                  <img src={slide.image} alt={slide.heading} loading="lazy" />
                </div>

                <div className={classes.content}>
                  <h3>{slide.heading}</h3>
                  <p>{slide.desc.slice(0, 50)}...</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
