import classes from "./ResetPassword.module.css";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { resetPassword } from "../../store";
import Spinner from "../ui/spinner/Spinner";
import { toast } from "react-toastify";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const query = useQuery();

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!password) {
      console.log("Please insert your new password");
      toast.error("Please insert your new password",{position:"top-left"})
      return;
    }

    const token = query.get("token");
    const email = query.get("email");
    const formData = { password: password, email: email, token: token };

    await dispatch(resetPassword(formData));
    setPassword("");
    navigate("/login");
  };

  return (
    <Card className={classes.cardClass}>
      {isLoading && <Spinner />}
      <h2>Reset Password</h2>
      <form onSubmit={onSubmitHandler} className={classes.container}>
        <div className={classes.control}>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes.action}>
          <Button className={classes.btn}>New Password</Button>
        </div>
      </form>
    </Card>
  );
};

export default ResetPassword;
