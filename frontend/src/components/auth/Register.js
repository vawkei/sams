import Card from "../ui/card/Card";
import classes from "./Auth.module.css";
import registerImage from "../../assets/veeshopregister.jpg";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { register,authActions } from "../../store";
import Loader from "../ui/loader/Loader";

const Register = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [confirmEnteredPassword, setConfirmEnteredPassword] = useState("");

  const { isLoading, isLoggedIn, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const enteredNameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const enteredEmailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const enteredPasswordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };
  const confirmEnteredPasswordChangeHandler = (e) => {
    setConfirmEnteredPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      enteredName.trim().length === 0 ||
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0 ||
      confirmEnteredPassword.trim().length === 0 ||
      !enteredName ||
      !enteredEmail ||
      !enteredPassword ||
      !confirmEnteredPassword
    ) {
      console.log("Please fill out the inputs");
      return;
    }

    if (enteredPassword < 6) {
      console.log("Password characters should be more than six");
    }

    if (enteredPassword !== confirmEnteredPassword) {
      console.log("Please check your passwords");
      return;
    }

    const userData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      confirmedPassword: confirmEnteredPassword
    };
   // console.log(userData);
    await dispatch(register(userData));

    
  };

  useEffect(()=>{
    if (isLoggedIn && user) {
      navigate("/");
      dispatch(authActions.RESET_AUTH())
    }
  },[isLoggedIn,user,dispatch,navigate]);

  return (
    <div>
      {isLoading && <Loader />}
      <h1>Register</h1>
      <section className={classes.auth}>
        <div className={classes.image}>
          <img src={registerImage} alt="" width={400} height={300} />
        </div>
        <div className={classes.cardDiv}>
          <Card className={classes.cardClass}>
            <form action="" className={classes.form} onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor="">Your Name</label>
                <input
                  type="text"
                  value={enteredName}
                  onChange={enteredNameChangeHandler}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="">Your Email</label>
                <input
                  type="email"
                  value={enteredEmail}
                  onChange={enteredEmailChangeHandler}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="">Your Password</label>
                <input
                  type="password"
                  value={enteredPassword}
                  onChange={enteredPasswordChangeHandler}
                />
              </div>

              <div className={classes.control}>
                <label htmlFor="">Confirm Your Password</label>
                <input
                  type="password"
                  value={confirmEnteredPassword}
                  onChange={confirmEnteredPasswordChangeHandler}
                />
              </div>

              <div className={classes.action}>
                <Button className={classes.btn}>Register</Button>
              </div>
              <div>
                <p className={classes.login}>
                  <Link to={"/login"}>Login with existing account</Link>
                </p>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Register;
