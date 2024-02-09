import ProductCarousel from "../carousel/ProductCarousel";
//import SimpleSlider from "../carousel/ProductCarousel";
import Slider from "../slider/Slider";
import HomeInfoBox from "./HomeInfoBox";
import Notifier from "../ui/notifier/Notifier";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { authActions } from "../../store";

const Home = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.auth);
  console.log(notification);

  let timeDuration = 5000;
  let notificationClearer;

  useEffect(() => {
    if (notification) {
      notificationClearer = setTimeout(() => {
        dispatch(authActions.UPDATE_NOTIFICATION("false"));
      }, timeDuration);
    }
    return () => {
      clearTimeout(notificationClearer);
    };
  }, [notification]);

  return (
    <div>
      {notification && (
        <Notifier title={"Login Successful"} message={"You are Now LoggedIn"} />
      )}
      <Slider />
      <HomeInfoBox />
      <ProductCarousel />
      {/* <SimpleSlider /> */}
    </div>
  );
};

export default Home;
