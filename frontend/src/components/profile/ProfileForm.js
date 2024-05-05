import { useState, useEffect } from "react";
import classes from "./ProfileForm.module.css";
import ProfileHeader from "./ProfileHeader";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";
import Loader from "../ui/loader/Loader";
import Spinner from "../ui/spinner/Spinner";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, updateUser, updateUserPhoto } from "../../store/index";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, user, isLoading } = useSelector((state) => state.auth);
  //console.log(user);

  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredTown, setEnteredTown] = useState("");
  const [enteredState, setEnteredState] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [useStateIsLoading] = useState(false);

  useEffect(() => {
    if (user === null) {
      dispatch(getSingleUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (isLoggedIn && user) {
      setEnteredName(user.name || "");
      setEnteredEmail(user.email || "");
      setEnteredPhone(user.phone || "");
      setEnteredAddress(user.address || "");
      setEnteredSurname(user.surname || "");
      setEnteredState(user.state || "");
      setEnteredTown(user.town || "");
    }
  }, [user]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveImage = async (e) => {
    e.preventDefault();

    try {
      const image = new FormData();
      image.append("image", profileImage);

      if (
        imagePreview !== null &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/uploadUserPhoto`,
          {
            method: "POST",
            body: image,
          }
        );
        const imageData = await response.json();
        console.log(imageData);

        //updateUserPhoto to mongoDB:
        const userData = {
          photo: imageData.msg.src,
        };
        await dispatch(updateUserPhoto(userData));
        // setImagePreview(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update form inputs to mongdb:
  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      name: enteredName,
      surname: enteredSurname,
      phone: enteredPhone,
      address: enteredAddress,
      town: enteredTown,
      state: enteredState,
    };
    // console.log(profileData);
    await dispatch(updateUser(userData));
    setEnteredName("");
    setEnteredSurname("");
    setEnteredPhone("");
    setEnteredAddress("");
    setEnteredTown("");
    setEnteredState("");
  };

  return (
    <>
      {useStateIsLoading && <Loader />}
      <div className={classes.spinner}>{isLoading && <Spinner />}</div>

      <div className={classes["over-all-container"]}>
        <ProfileHeader />
        <h2>
          {isLoggedIn
            ? user
              ? `Welcome ${user.name}`
              : "You are UNAUTHORIZED"
            : "You are UNAUTHORIZED"}
        </h2>
        {/* {isLoggedIn ? (user ?  `hi ${user.name}` : "Hello!") : "Hello!"} */}
        <Card className={classes.container}>
          <div className={classes["image-area"]}>
            <img
              src={
                imagePreview
                  ? imagePreview
                  : user
                  ? user.photo
                  : "You are UNAUTHORIZED"
              }
            />
            {imagePreview ? (
              <div className={classes["save-PhotoButton"]}>
                <Button onClick={saveImage} className={classes.btn}>
                  Save Photo
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>

          <form action="" onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="name">
                <b>Role:</b> {isLoggedIn ? (user ? user.role : "") : ""}
              </label>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="name">
                <b>Name:</b>
              </label>
              <input
                type="text"
                placeholder="Please enter name"
                value={enteredName}
                required
                onChange={(e) => setEnteredName(e.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="name">
                <b>Surname:</b>
              </label>
              <input
                type="text"
                placeholder="Please enter your surname"
                value={enteredSurname}
                required
                onChange={(e) => setEnteredSurname(e.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="email">
                <b>Email:</b>
              </label>
              <input type="text" disabled value={enteredEmail} />
            </div>
            <div className={classes.control}>
              <label htmlFor="phone">
                <b>Phone:</b>
              </label>
              <input
                type="text"
                placeholder="Please enter phone number"
                value={enteredPhone}
                required
                onChange={(e) => setEnteredPhone(e.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="address">
                <b>Address:</b>
              </label>
              <input
                type="text"
                placeholder="Please enter residential address here"
                value={enteredAddress}
                required
                onChange={(e) => setEnteredAddress(e.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="phone">
                <b>Town:</b>
              </label>
              <input
                type="text"
                placeholder="Please enter town of residence"
                value={enteredTown}
                required
                onChange={(e) => setEnteredTown(e.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="state">
                <b>State:</b>
              </label>
              <input
                type="text"
                placeholder="Please enter state of residence"
                value={enteredState}
                required
                onChange={(e) => setEnteredState(e.target.value)}
              />
            </div>
            <div className={classes.action}>
              <Button className={classes.btn}>Submit</Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ProfileForm;
