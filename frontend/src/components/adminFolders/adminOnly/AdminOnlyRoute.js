import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/button/Button";
import classes from "./Disclaimer.module.css";

export const AdminOnlyRoute = (props) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/");
  };

  if (user?.role === "admin" && user?.name === "admin") {
    return props.children;
  } else {
    return (
      <div className={classes.disclaimer}>
        <p>You have no Access to this Route</p>
        <div className={classes.action}>
          <Button onClick={navigateHandler} className={classes.btn}>
            Click here to Go Home
          </Button>
        </div>
      </div>
    );
  }
};

export const AdminOnlyLink = (props) => {
  const { user } = useSelector((state) => state.auth);

  if (user?.role === "admin" && user?.name === "admin") {
    return props.children;
  } else {
    return null;
  }
};
