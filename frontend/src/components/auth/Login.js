import Card from "../ui/card/Card";
import classes from "./Auth.module.css";
import signImage from "../../assets/veeshopsignin.jpg";
import { Link,useNavigate } from "react-router-dom";

import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch,useSelector } from "react-redux";
import { authActions,login } from "../../store/index";

import { useEffect, useState } from "react";
import Button from "../ui/button/Button";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {isLoggedIn,user} = useSelector((state)=>state.auth);

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

  const submitHandler =async (e) => {
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

  useEffect(()=>{
    if(isLoggedIn && user){
      navigate("/");
      dispatch(authActions.RESET_AUTH())
    }
  },[isLoggedIn,user,dispatch,navigate])

  return (
    <div>
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
