import classes from "./Loader.module.css";
import ReactDom from "react-dom";
import loaderImage from "../../../assets/veeshoploading.gif";

const Loader = () => {
  return ReactDom.createPortal(
    <div className={classes.wrapper}>
      <div className={classes["image-container"]}>
        <img src={loaderImage} alt="loader"  />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
