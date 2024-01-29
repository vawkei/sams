import Card from "../ui/card/Card";
import classes from "./Auth.module.css";
import styles from "./VerifyEmail.module.css";
import registerImage from "../../assets/veeshopregister.jpg";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { register, authActions } from "../../store";
import Loader from "../ui/loader/Loader";

import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1, delayChildren: 1.9, staggerChildren: 0.5 },
  },
};

const items = {
  hidden: {
    opacity: 0,
    y: -600,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const Register = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [confirmEnteredPassword, setConfirmEnteredPassword] = useState("");

  const { isLoading, isLoggedIn, user, showRegForm, message } = useSelector(
    (state) => state.auth
  );
  console.log(showRegForm);
  console.log(message);

  const isMobile = useMediaQuery({ maxWidth: 640 });

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
      confirmedPassword: confirmEnteredPassword,
    };
    // console.log(userData);
    await dispatch(register(userData));
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      // navigate("/");
      dispatch(authActions.RESET_AUTH());
    }
  }, [isLoggedIn, user, dispatch, navigate]);

  return (
    <div>
      {isMobile ? (
        <>
          {isLoading && <Loader />}
          <h1>Register</h1>
          {showRegForm ? (
            <section className={classes.auth}>
              <div className={classes.image}>
                <img src={registerImage} alt="" width={400} height={300} />
              </div>
              <div className={classes.cardDiv}>
                <Card className={classes.cardClass}>
                  <motion.form
                    variants={containerVariant}
                    initial="hidden"
                    animate="visible"
                    exit={{x:1000,transition:{delay:1,type:"spring",stiffness:500}}}
                    action=""
                    className={classes.form}
                    onSubmit={submitHandler}>
                    <motion.div variants={items} className={classes.control}>
                      <label htmlFor="">Your Name</label>
                      <input
                        type="text"
                        value={enteredName}
                        onChange={enteredNameChangeHandler}
                      />
                    </motion.div>
                    {/* animationEmail ==========================================================*/}
                    <motion.div variants={items} className={classes.control}>
                      <label htmlFor="">Your Email</label>
                      <input
                        type="email"
                        value={enteredEmail}
                        onChange={enteredEmailChangeHandler}
                      />
                    </motion.div>
                    {/* animationPassword ===========================================*/}
                    <motion.div variants={items} className={classes.control}>
                      <label htmlFor="">Your Password</label>
                      <input
                        type="password"
                        value={enteredPassword}
                        onChange={enteredPasswordChangeHandler}
                      />
                    </motion.div>
                    {/* animationC.Password======================================================*/}
                    <motion.div variants={items} className={classes.control}>
                      <label htmlFor="">Confirm Your Password</label>
                      <input
                        type="password"
                        value={confirmEnteredPassword}
                        onChange={confirmEnteredPasswordChangeHandler}
                      />
                    </motion.div>
{/* animationButton ==========================================================*/}
                    <motion.div
                      initial={{ y: 600 }}
                      animate={{
                        y: 0,
                        transition: {
                          delay: 5,
                          type: "spring",
                          stiffness: 500,
                        },
                      }}
                      className={classes.action}>
                      <Button className={classes.btn}>Register</Button>
                    </motion.div>

                    {/* animationlogin ==============================================*/}
                    <motion.div variants={items}>
                      <p className={classes.login}>
                        <Link to={"/login"}>Login with existing account</Link>
                      </p>
                    </motion.div>
                  </motion.form>
                </Card>
              </div>
            </section>
          ) : (
            <div className={styles["account-confirmation"]}>
              <h3>Please check your email box to verify your account</h3>
            </div>
          )}
        </>
      ) 
      
      :
       
      (
        
        <>
          {isLoading && <Loader />}
          <h1>Register</h1>
          {showRegForm ? (
            <section className={classes.auth}>
              <div className={classes.image}>
                <img src={registerImage} alt="" width={400} height={300} />
              </div>
              <div className={classes.cardDiv}>
                <Card className={classes.cardClass}>
                  <form
                    action=""
                    className={classes.form}
                    onSubmit={submitHandler}>
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
          ) : (
            <div className={styles["account-confirmation"]}>
              <h3>Please check your email box to verify your account</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Register;
