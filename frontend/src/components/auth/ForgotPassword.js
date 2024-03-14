import classes from "./ForgotPassword.module.css";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { forgotPassword } from "../../store";
import { toast } from "react-toastify";
import { motion, spring } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const ForgotPassword = () => {
  //states, dispatch,  declarations,  useMediaQ.:
  const [email, setEmail] = useState("");

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const dispatch = useDispatch();

  //functions:
  //1.
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || email === "") {
      console.log("Please insert your email");
      toast.error("Please insert your email", { position: "top-left" });
      return;
    }

    const formData = { email: email };
    await dispatch(forgotPassword(formData));
  };

  return (
    <div>
      {isMobile ? (
        <>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 6, duration: 3 } }}>
            Forgot Password
          </motion.h2>
          <div className={classes.cardClass}>
            <motion.form
              initial={{ x: "-1000px" }}
              animate={{
                x: 0,
                transition: { delay: 3, type: "spring", stiffness: 500 },
              }}
              onSubmit={onSubmitHandler}
              className={classes.container}>
              <div className={classes.control}>
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <motion.div
                initial={{ y: "-1000px" }}
                animate={{
                  y: 0,
                  transition: { delay: 5, type: "spring", stiffness: 500 },
                }}
                className={classes.action}>
                <Button className={classes.btn}>Get Reset Password Link</Button>
              </motion.div>
            </motion.form>
          </div>
        </>
      ) : (
        <>
          <Card className={classes.cardClass}>
            <h2>Forgot Password</h2>
            <form onSubmit={onSubmitHandler} className={classes.container}>
              <div className={classes.control}>
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={classes.action}>
                <Button className={classes.btn}>Get Reset Password Link</Button>
              </div>
            </form>
          </Card>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;




