import Card from "../ui/card/Card";
import classes from "./Auth.module.css";
import signImage from "../../assets/veeshopsignin.jpg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { authActions, login } from "../../store/index";

import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { getCartDb, saveCartDb } from "../../store/cart/cartIndex";
import Spinner from "../ui/spinner/Spinner";

import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [urlParams] = useSearchParams();

  // console.log(urlParams.get("redirect"));

  const redirect = urlParams.get("redirect");

  const { isLoggedIn, user, isLoading, isSuccess } = useSelector(
    (state) => state.auth
  );

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function passwordTypeToggle() {
    setShowPassword((prevState) => !prevState);
  }

  const enteredEmailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const enteredPasswordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0 ||
      !enteredEmail ||
      !enteredPassword
    ) {
      console.log("Please fill out the inputs");
      return;
    }

    const userData = { email: enteredEmail, password: enteredPassword };
    //console.log(userData);
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      if (redirect === "cart") {
        dispatch(
          saveCartDb({
            cartItems: JSON.parse(localStorage.getItem("cartItems")),
          })
        );
        return navigate("/cart");
        // The return statement in the useEffect hook in ds code is used to provide a cleanup function that runs when the component unmounts or before the effect runs again. However, in ds specific case, the return statement is being used to immediately exit the function once the condition if (redirect === "cart") is met.
      }
      dispatch(getCartDb());
    }
    dispatch(authActions.RESET_AUTH());
  }, [isLoggedIn, isSuccess, dispatch, navigate, redirect]);

  // useEffect(() => {
  //   if (isLoggedIn && user) {
  //     if (redirect === "cart") {
  //       const savedCart = JSON.parse(localStorage.getItem("cartItems"));
  //       if (savedCart && savedCart.length > 0) {
  //         dispatch(
  //           saveCartDb({
  //             cartItems: savedCart,
  //           })
  //         );
  //         return navigate("/cart");
  //       } else {
  //         return navigate("/home");
  //       }
  //     }
  //     dispatch(getCartDb());
  //   }
  //   dispatch(authActions.RESET_AUTH());
  //  }, [isLoggedIn, user, dispatch, navigate, redirect]);

  return (
    <div>
      {isLoading && <Spinner />}
      <h1>Login</h1>
      <section className={classes.auth}>
        <div className={classes.image}>
          <img src={signImage} alt="" width={400} height={300} />
        </div>
        <div className={classes.cardDiv}>
          <Card className={classes.cardClass}>
            {/* animationsEmail ===================================================*/}
            {isMobile ? (
              <motion.form 
              exit={{x:1000,transition:{delay:1.5,type:'spring',stiffness:500}}}
              //this is to exit the form and nothin else

              action="" className={classes.form} onSubmit={submitHandler}>
                <motion.div
                  initial={{ x: -600 }}
                  animate={{
                    x: 0,
                    transition: {
                      delay: 3,
                      type: "spring",
                      stiffness: 500,
                    },
                  }}
                  className={classes.control}>
                  <label htmlFor="">Your Email</label>
                  <input
                    type="email"
                    value={enteredEmail}
                    onChange={enteredEmailChangeHandler}
                  />
                </motion.div>
                {/* animation4Password====================================== */}
                <motion.div
                  initial={{ x: 600 }}
                  animate={{
                    x: 0,
                    transition: {
                      delay: 4,
                      type: "spring",
                      stiffness: 500,
                    },
                  }}
                  className={classes.control}>
                  <label htmlFor="">Your Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={enteredPassword}
                    onChange={enteredPasswordChangeHandler}
                  />
                  {showPassword ? (
                    <AiOutlineEye
                      size={24}
                      onClick={passwordTypeToggle}
                      className={classes.passwordToggle}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      size={24}
                      onClick={passwordTypeToggle}
                      className={classes.passwordToggle}
                    />
                  )}
                </motion.div>
                {/* animation4Login ================================*/}
                <div className={classes.action}>
                  {isMobile ? (
                    <motion.span
                      initial={{ y: -600 }}
                      animate={{
                        y: 0,
                        transition: {
                          delay: 7,
                          type: "spring",
                          stiffness: 500,
                        },
                      }}>
                      <Button className={classes.btn}>Login</Button>
                    </motion.span>
                  ) : (
                    <Button className={classes.btn}>Login</Button>
                  )}
                </div>
                {/* animation4Links ================================*/}
                <div className={classes.links}>
                  <>
                    <motion.p
                      initial={{ y: -600 }}
                      animate={{
                        y: 0,
                        transition: {
                          delay: 5,
                          type: "spring",
                          stiffness: 500,
                        },
                      }}
                      className={classes.login}>
                      <Link to={"/register"}>Don't have an account ?</Link>
                    </motion.p>
                    <motion.p
                      initial={{ y: -600 }}
                      animate={{
                        y: 0,
                        transition: {
                          delay: 6,
                          type: "spring",
                          stiffness: 500,
                        },
                      }}
                      className={classes.forgot}>
                      <Link to={"/forgot-password"}>
                        Forgot your password ?
                      </Link>
                    </motion.p>
                  </>
                </div>
              </motion.form>
            ) : (
              <form action="" className={classes.form} onSubmit={submitHandler}>
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
                    type={showPassword ? "text" : "password"}
                    value={enteredPassword}
                    onChange={enteredPasswordChangeHandler}
                  />
                  {showPassword ? (
                    <AiOutlineEye
                      size={24}
                      onClick={passwordTypeToggle}
                      className={classes.passwordToggle}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      size={24}
                      onClick={passwordTypeToggle}
                      className={classes.passwordToggle}
                    />
                  )}
                </div>

                <div className={classes.action}>
                  <Button className={classes.btn}>Login</Button>
                </div>
                <div className={classes.links}>
                  <p className={classes.login}>
                    <Link to={"/register"}>Don't have an account ?</Link>
                  </p>
                  <p className={classes.forgot}>
                    <Link to={"/forgot-password"}>Forgot your password ?</Link>
                  </p>
                </div>
              </form>
            )}
            {/* animationsEnds ===================================================*/}
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Login;
