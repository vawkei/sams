import classes from "./ProfileHeader.module.css"
import {Link} from "react-router-dom";

const ProfileHeader = () => {
    return ( 
        <div className={classes["profile-header"]}>
            <ul className={classes["profile-header-ul"]}>
                <li><Link>Profile</Link></li>
                <li><Link>My Wallet</Link></li>
                <li><Link>Favourites</Link></li>
            </ul>
        </div>
     );
}
 
export default ProfileHeader;