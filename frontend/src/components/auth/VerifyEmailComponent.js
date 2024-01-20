import classes from "./VerifyEmail.module.css";
import {useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import Button from "../ui/button/Button";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../../store";


function useQuery(){
    return new URLSearchParams(useLocation().search);
}

const VerifyEmailComponent = () => {
    const dispatch = useDispatch();
    const query = useQuery();

    useEffect(() => {
        const verificationToken = query.get("token");
        const email = query.get("email");

        dispatch(verifyEmail({ verificationToken, email }));
    }, [dispatch]);

    return ( 
        <div className={classes["account-confirmation"]}>
            <h2>Account Confirmed</h2>
            <Link to={"/login"}><Button className={classes.btn}>Please Login</Button></Link>
        </div>
     );
}

export default VerifyEmailComponent;
