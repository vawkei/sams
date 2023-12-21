import { useState, useEffect } from "react";
import classes from "./Profile.module.css";
import ProfileHeader from "./ProfileHeader";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";
import Loader from "../ui/loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, updateUser, updateUserPhoto } from "../../store/index";

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  //console.log(user);


  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail,setEnteredEmail] = useState("" );
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [useStateIsLoading, setUseStateIsLoading] = useState(false);


  useEffect(() => {
    if (user === null) {
      dispatch(getSingleUser());
    }
  }, [dispatch, user]);

  useEffect(()=>{
    if( isLoggedIn && user){
      setEnteredName(user.name || "");
      setEnteredEmail(user.email || "")
      setEnteredPhone(user.phone || "");
      setEnteredAddress(user.address ||"");
    }
  },[user]);

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
  const submitHandler =async (e) => {
    e.preventDefault();
    const userData = {
      name: enteredName,
      phone: enteredPhone,
      address: enteredAddress,
    };
   // console.log(profileData);
   await dispatch(updateUser(userData))
    setEnteredName("");
    setEnteredPhone("");
    setEnteredAddress("");
  };

  return (
    <>
      {useStateIsLoading && <Loader />}

      <div className={classes["over-all-container"]}>
        <ProfileHeader />
        <h2>
          {isLoggedIn
            ? (user
              ? `Welcome ${user.name}`
              : "You are UNAUTHORIZED")
            : "You are UNAUTHORIZED"}
        </h2>
        {/* {isLoggedIn ? (user ?  `hi ${user.name}` : "Hello!") : "Hello!"} */}
        <Card className={classes.container}>
          <div className={classes["image-area"]}>
            <img
              src={imagePreview ? imagePreview : (user ? user.photo: "You are UNAUTHORIZED")
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
                Role: {isLoggedIn ? (user ? user.role : "") : ""}
              </label>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                placeholder="Please enter name"
                value={enteredName}
                required
                onChange={(e) => setEnteredName(e.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="email">Email:</label>
              <input type="text" disabled value={enteredEmail} />
            </div>
            <div className={classes.control}>
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                placeholder="Please enter phone number"
                value={enteredPhone}
                required
                onChange={(e) => setEnteredPhone(e.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="phone">Address:</label>
              <input
                type="text"
                placeholder="Please enter residential address, city, state"
                value={enteredAddress}
                required
                onChange={(e) => setEnteredAddress(e.target.value)}
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

export default Profile;



// const uploadImageToCloudinary = async () => {
//   try {
//     const image = new FormData();
//     image.append('file', profileImage);

//     if (
//       profileImage &&
//       (profileImage.type === 'image/jpeg' ||
//         profileImage.type === 'image/jpg' ||
//         profileImage.type === 'image/png')
//     ) {
//       const cloudinaryUrl = 'YOUR_CLOUDINARY_UPLOAD_URL'; // Replace with your Cloudinary upload URL

//       const response = await fetch(cloudinaryUrl, {
//         method: 'POST',
//         body: image,
//         headers: {
//           'X-Requested-With': 'XMLHttpRequest',
//         },
//       });

//       if (response.ok) {
//         const reader = response.body.getReader();

//         const contentLength = +response.headers.get('Content-Length');
//         let receivedLength = 0;
//         let chunks = [];

//         while (true) {
//           const { done, value } = await reader.read();

//           if (done) {
//             break;
//           }

//           chunks.push(value);
//           receivedLength += value.length;

//           const progress = (receivedLength / contentLength) * 100;
//           setUploadProgress(progress);
//         }

//         const blob = new Blob(chunks);
//         const imageDataUrl = URL.createObjectURL(blob);

//         // Handle the Cloudinary response as needed
//         console.log('Upload complete:', imageDataUrl);
//       } else {
//         console.error('Failed to upload image to Cloudinary:', response.statusText);
//       }
//     }
//   } catch (error) {
//     console.error('Error uploading image:', error);
//   }
// };
