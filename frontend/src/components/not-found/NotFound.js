import { useNavigate } from "react-router-dom";
import Button from "../ui/button/Button";
import classes from "../adminFolders/adminOnly/Disclaimer.module.css"

const NotFound = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/");
  };

  return (
    <div className={classes.disclaimer}>
        <p>This Page doesn't exist...</p>
        <div className={classes.action}>
          <Button onClick={navigateHandler} className={classes.btn}>
            Click here to Go Home
          </Button>
        </div>
      </div>
  );
};

export default NotFound;
