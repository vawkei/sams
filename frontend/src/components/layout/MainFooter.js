import classes from "./MainFooter.module.css";
import {Link} from "react-router-dom";

const MainFooter = () => {
    
    const months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let month = new Date().getMonth();
    const year = new Date().getFullYear();
    let monthInFull =  months [month]
    //console.log(monthInFull,year)

    const days = [
        "Sun",
        "Mon",
        "Tues",
        "Wednesday",
        "Thurs",
        "Fri",
        "Sat"
    ];

    const date = new Date().getDate()
    
    const day = new Date().getDay();
    const dayInFull = days[day]
    //console.log(dayInFull)

    const brand = "<HowZ />"
    const dateInFull = ` ${dayInFull} ${date} ${monthInFull}, ${year}` 

    return ( 
        <div className={classes.footer}>
            <h2> <Link to={"/"}>&copy;{brand}</Link></h2>
            <p>{dateInFull}</p>
            
        </div>
     );
}
 
export default MainFooter;