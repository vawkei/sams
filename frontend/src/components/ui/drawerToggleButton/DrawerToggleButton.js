import classes from "./DrawerToggleButton.module.css";


const DrawerToggleButton = (props) => {
    return ( 
            <button onClick={props.toggle}>
                <div className={classes["toggle-line"]} />
                <div className={classes["toggle-line"]} />
                <div className={classes["toggle-line"]} />
            </button>
     );
}
 
export default DrawerToggleButton;