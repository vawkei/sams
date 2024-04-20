import Card from "../../ui/card/Card";
import classes from "./SendNewsletter.module.css";
import { useDispatch,useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { useState, useRef, Fragment, useEffect } from "react";
import Button from "../../ui/button/Button";
import { sendNewsletter } from "../../../store";
import Loader from "../../ui/loader/Loader";

const SendNewsletter = () => {

  const { isLoading } = useSelector((state) => state.auth);

    const [formValidity, setFormValidity] = useState({
        firstName: true,
        subject: true,
        //email: true,
        message: true,
      });
    
      const navigate = useNavigate();
    
      const message = useSelector((state)=>state.auth.message);
      const dispatch = useDispatch();

      const firstNameInputRef = useRef();
      const subjectInputRef = useRef();
      // const emailInputRef = useRef();
      const messageInputRef = useRef();


      const submitHandler = async (e) => {
        e.preventDefault();
    
        const enteredSubject = subjectInputRef.current.value;
        const enteredMessage = messageInputRef.current.value;
    

        const enteredSubjectIsValid = enteredSubject.trim() !== "";
        const enteredMessageIsValid = enteredMessage.trim() !== "";
    
        setFormValidity({
          subject: enteredSubjectIsValid,
          message: enteredMessageIsValid,
        });
    
        const formIsValid =

          enteredSubjectIsValid &&
          enteredMessageIsValid;
    
        if (!formIsValid) {
          return;
        }
        
    
        const formData = {
          subject: enteredSubject,
          message: enteredMessage,
        };
        console.log({
          subject: enteredSubject,
          message: enteredMessage,
        });
        console.log(formData)
        await dispatch(sendNewsletter(formData));
        navigate("/admin/home")
        
      };
      // useEffect(()=>{
      //   if(message === "email sent successfully"){
      //     navigate("/")
      //   //  dispatch(authActions.RESET_MESSAGE())
      //   }
    
      // },[message,navigate,dispatch])

  return (
    <Fragment>
        <h2>Send Newsletter</h2>
        {isLoading && <Loader />}
      <form className={classes.contact} onSubmit={submitHandler}>
        <Card className={classes.cardClass1}>
          <div
            className={`${classes.control} ${
              formValidity.subject ? "" : classes.invalid
            }`}>
            <label>Subject</label>
            <input
              placeholder="Enter subject  of your email here"
              type="text"
              name="subject"
              ref={subjectInputRef}
            />
            {!formValidity.subject && (
              <p>Please fill out the last name input</p>
            )}
          </div>
          <div
            className={`${classes.control} ${
              formValidity.message ? "" : classes.invalid
            }`}>
            <label>Message</label>
            <textarea
              cols={"5"}
              rows={"5"}
              type={"text"}
              ref={messageInputRef}
              name="user_message"></textarea>
            {!formValidity.message && <p>Please drop a message</p>}
          </div>
          <div className={classes.action}>
            <Button className={classes.btn}>Send Newsletter</Button>
          </div>
        </Card>
      </form>
    </Fragment>
  );
};

export default SendNewsletter;
