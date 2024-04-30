import classes from "./ContactForm.module.css";
import Card from "../ui/card/Card";
import Button from "../ui/button/Button";
import { BsEnvelope } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { BsTelephoneInbound } from "react-icons/bs";
import { useState, useRef, Fragment, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { authActions, sendContactMail } from "../../store";
import {useNavigate} from "react-router-dom"

const ContactForm = () => {
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

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredSubject = subjectInputRef.current.value;
    // const enteredEmail = emailInputRef.current.value;
    const enteredMessage = messageInputRef.current.value;


    const enteredFirstNameIsValid = enteredFirstName.trim() !== "";
    const enteredSubjectIsValid = enteredSubject.trim() !== "";
    //const enteredEmailIsValid = enteredEmail.trim() !== "";
    const enteredMessageIsValid = enteredMessage.trim() !== "";

    setFormValidity({
      firstName: enteredFirstNameIsValid,
      subject: enteredSubjectIsValid,
      // email: enteredEmail,
      message: enteredMessageIsValid,
    });

    const formIsValid =
      enteredFirstNameIsValid &&
      enteredSubjectIsValid &&
      // enteredEmailIsValid &&
      enteredMessageIsValid;

    if (!formIsValid) {
      return;
    }
    

    const formData = {
      name: enteredFirstName,
      subject: enteredSubject,
      message: enteredMessage,
    };
    console.log({
      name: enteredFirstName,
      subject: enteredSubject,
      message: enteredMessage,
    });
    await dispatch(sendContactMail(formData));
    
  };
  useEffect(()=>{
    if(message === "email sent successfully"){
      navigate("/")
     dispatch(authActions.RESET_MESSAGE())
    }

  },[message,navigate,dispatch])

  return (
    <Fragment>
      <form className={classes.contact} onSubmit={submitHandler}>
        <Card className={classes.cardClass1}>
          <div
            className={`${classes.control} ${
              formValidity.firstName ? "" : classes.invalid
            }`}>
            <label>Name</label>
            <input
              placeholder="Enter your full name here"
              type={"text"}
              ref={firstNameInputRef}
              name="user_name"
            />
            {!formValidity.firstName && (
              <p>Please fill out the first name input</p>
            )}
          </div>
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
          {/* <div
            className={`${classes.control} ${
              formValidity.email ? "" : classes.invalid
            }`}>
            <label>Email Address</label>
            <input
              placeholder="Enter your email address here"
              type="email"
              ref={emailInputRef}
              name="user_email"
            />
            {!formValidity.email && <p>Please fill in your email address</p>}
          </div> */}
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
            <Button className={classes.btn}>Send message</Button>
          </div>
          {/* {!formValidity && <p>What is wrong with you</p>} */}
        </Card>

        <Card className={classes.cardClass2}>
          <div>
            <Card>
              <div>
                <BsEnvelope
                  size={50}
                  style={{
                    backgroundColor: "purple",
                    borderRadius: "8px",
                    padding: "1rem",
                    color: "white",
                  }}
                />
              </div>
              <h4>
                <b>Chat to Sales</b>
              </h4>
              <p>Speak to our friendly team</p>
              <br />
              <p>
                <b>sales@sams.com</b>
              </p>
            </Card>
          </div>
          <br />
          <div>
            <br />
            <Card>
              <div>
                <GoLocation
                  size={50}
                  style={{
                    backgroundColor: "purple",
                    borderRadius: "8px",
                    padding: "1rem",
                    color: "white",
                  }}
                />
              </div>
              <h4>
                <b>Visit us</b>
              </h4>
              <p>Visit our office HQ</p>
              <br />
              <p>
                <b>100 Smiths Way, Lakewood O-Town,Delta.</b>
              </p>
            </Card>
          </div>
          <br />
          <div>
            <Card>
              <div>
                <BsTelephoneInbound
                  size={50}
                  style={{
                    backgroundColor: "purple",
                    borderRadius: "8px",
                    padding: "1rem",
                    color: "white",
                  }}
                />
              </div>
              <h4>
                <b>Call us</b>
              </h4>
              <p>Mon-Sun from 8am to 5pm</p>
              <br />
              <p>
                <b>04024024401k</b>
              </p>
            </Card>
          </div>
        </Card>
      </form>
    </Fragment>
  );
};

export default ContactForm;
