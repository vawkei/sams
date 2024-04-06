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
         <h1>404 - Page Not Found</h1>
        <div className={classes.action}>
          <Button onClick={navigateHandler} className={classes.btn}>
            Click here to Go Home
          </Button>
        </div>
      </div>
  );
};

export default NotFound;
