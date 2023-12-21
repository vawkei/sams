import Button from "../button/Button";
import classes from "./DeleteNotifier.module.css";
import ReactDOM from "react-dom"

const DeleteNotifier = (props) => {
    return ReactDOM.createPortal( 
        <div className={classes.backdrop}>
            <div className={classes.modal}>
                <div className={classes.header}>
                    <header>{props.heading}</header>
                </div>
                <p>{props.body}</p>
                <div className={classes.footer}>
                    <Button className={classes.btnOne} onClick={props.onConfirm}>Delete</Button>
                    <Button className={classes.btnTwo} onClick={props.cancel}>Cancel</Button>
                </div>
            </div>
        </div>,document.getElementById("deleteModal")
     )
}
 
export default DeleteNotifier;