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

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [urlParams] = useSearchParams();

  // console.log(urlParams.get("redirect"));

  const redirect = urlParams.get("redirect");

  const { isLoggedIn, user,isLoading } = useSelector((state) => state.auth);

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
    if (isLoggedIn && user) {
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
  }, [isLoggedIn, user, dispatch, navigate,redirect]);

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
              <div>
                <p className={classes.login}>
                  <Link to={"/register"}>Don't have an account</Link>
                </p>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Login;
