import classes from "./HomeInfoBox.module.css";
import ProductCarousel from "../carousel/ProductCarousel";
//import SimpleSlider from "../carousel/ProductCarousel";
import Slider from "../slider/Slider";
import Button from "../ui/button/Button";
import HomeInfoBox from "./HomeInfoBox";
import { useDispatch, useSelector } from "react-redux";
import { newsletterSubscription } from "../../store";
import { useEffect, useState } from "react";

const Home = () => {
  const [showSubButton, setShowButton] = useState(true);

  const { user,message } = useSelector((state) => state.auth);
  console.log(user);
  console.log(message)
  const dispatch = useDispatch();

  const newsletterSubscriptionHandler = async () => {
    console.log("sending subscription...");
    await dispatch(newsletterSubscription());
  };

  useEffect(() => {
    if (user?.newsletterSubscription === "yes") {
      setShowButton(false);
    }
    if (message === "Congratulations you have subscribed to our newsletter") {
      setShowButton(false);
    }
  }, [user,message]);

  return (
    <div>
      <Slider />
      <HomeInfoBox />
      <ProductCarousel />
      <div className={classes.subscribe}>
        {showSubButton && (
          <Button
            onClick={newsletterSubscriptionHandler}
            className={classes.btn}>
            Subscribe to newsletter
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
