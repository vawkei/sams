import classes from "../loader/Loader.module.css";
import spinnerImage from "../../../assets/spinner.jpg";
import ReactDOM from "react-dom";

const Spinner = () => {
  return ReactDOM.createPortal (
    
      <div className={classes.wrapper}>
        <div className={classes["image-container"]}>
          <img src={spinnerImage} alt="loader" />
        </div>
      </div>
    ,
    document.getElementById("spinner")
  );
};

export default Spinner;
