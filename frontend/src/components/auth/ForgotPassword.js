import classes from "./ForgotPassword.module.css";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";
import {useDispatch} from "react-redux";
import { useState } from "react";
import { forgotPassword } from "../../store";

const ForgotPassword = () => {

  const [email,setEmail] =useState("");

  const dispatch = useDispatch()

  const onSubmitHandler =async (e)=>{
    e.preventDefault();

    if(!email || email===""){
      console.log("Please insert your email")
      return
    };

    const formData ={email:email}
    await dispatch(forgotPassword(formData))
  };

  return (
    <Card className={classes.cardClass}>
      <h2>Forgot Password</h2>
      <form onSubmit={onSubmitHandler} className={classes.container}>
        <div className={classes.control}>
          <label htmlFor="">Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className={classes.action}>
          <Button className={classes.btn}>Get Reset Password Link</Button>
        </div>
      </form>
    </Card>
  );
};

export default ForgotPassword;
