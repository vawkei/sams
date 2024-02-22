const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const sendPasswordResetEmail = require("../utils/sendPasswordReset.Email");
//const sendPasswordResetEmail = require("../utils/sendPasswordResetEmail");
const sendContactEmail = require("../utils/sendContactEmail");

//1. register====================================================================:
const register = async (req, res) => {
  const { name, email, password, confirmedPassword } = req.body;

  //console.log(name,email,password,confirmedPassword);

  //first user registered as admin:
  const isFirstAccount = (await User.countDocuments({})) === 0;
  //const role = isFirstAccount ? "admin":"customer"

  if (!name || !email || !password || !confirmedPassword) {
    return res.status(400).json({ msg: "Input fields shouldn't be empty" });
  }

  if (password.length < 6) {
    return res.status(400).json({ msg: "Password characters should be > 6" });
  }

  if (password !== confirmedPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  //const data = { name, email, password };

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const tempData = {
    name: name,
    email: email,
    password: hashedPassword,
    verificationToken: verificationToken,
  };

  const origin = process.env.REACT_APP_FRONTEND_URL;
  try {
    const user = await User.create(tempData);
    await sendVerificationEmail({
      name: user.name,
      email: user.email,
      verificationToken: user.verificationToken,
      origin: origin,
    });
    res
      .status(201)
      .json({ msg: "Please check your email box to verify your account" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//2. verifyEmail===================================================================:
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });

  if (!verificationToken || !email) {
    return res.status(401).json({ msg: "lisa lipps for life" });
  }
  if (verificationToken !== user.verificationToken) {
    return res.status(401).json({ msg: "Verification failed" });
  }

  user.isVerified = true;
  user.verificationToken = "";
  user.verifiedDate = Date.now();

  await user.save();
  res.status(200).json({ msg: "Email verified successfully", user });
};

//3. login======================================================================== :
const login = async (req, res) => {
  const { email, password } = req.body;
  //console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({ msg: "Input fields shouldn't be empty" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User doesn't exist" });
    }

    if (user.isVerified === false) {
      return res.status(401).json({ msg: "Please verify your email" });
    }

    const passwordValidity = async (incominPwd, pwInDB) => {
      const isValid = await bcrypt.compare(incominPwd, pwInDB);
      return isValid;
    };

    const validPassword = await passwordValidity(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET_V,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    if (user && validPassword) {
      const oneDay = 1000 * 60 * 60 * 24;

      const { _id, name, email, role, phone, photo } = user;
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        // secure:true, should be commented out during development
        // sameSite:"none"
        secure: true,
        sameSite: "none",
      });
      res.status(201).json({
        msg: "User loggedin",
        user: { _id, name, email, role, phone, photo },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//4. logout======================================================================:
const logout = (req, res) => {
  try {
    res.cookie("token", " ", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ msg: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//forgotPassword===============================================================

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Please enter an email" });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      const passwordToken = crypto.randomBytes(70).toString("hex");
      const tenMins = 100 * 60 * 10;
      const passwordTokenExpirationDate = new Date(Date.now() + tenMins);

      user.passwordToken = passwordToken;
      user.passwordTokenExpirationDate = passwordTokenExpirationDate;

      await user.save();

      const origin = process.env.REACT_APP_FRONTEND_URL;

      await sendPasswordResetEmail({
        name: user.name,
        origin: origin,
        token: passwordToken,
        email: user.email,
      });

      res
        .status(200)
        .json({ msg: "email sent check your email box for a link" });
    }
  } catch (error) {
    res.status(500).json(error);
  }

  // res.send("forgotPassword route");
};

//resetPassword==============================================================
const resetPassword = async (req, res) => {
  const { password, token, email } = req.body;

  if (!password || !token || !email) {
    return res.status(400).json({ msg: "missing important credentials" });
  }

  const currentDate = new Date();

  try {
    const user = await User.findOne({ email });
    if (
      user.passwordTokenExpirationDate > currentDate &&
      user.passwordToken === token
    ) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;

      await user.save();
      res.status(200).json({ msg: "password changed" });
    }
  } catch (error) {
    res.status(500).json(error);
  }

  // res.send("resetPassword route");
};

//5. getAllUsers===============================================================:
const getAllUsers = async (req, res) => {
  try {
    const U = await User.find().select("-password");
    
    const users = U.filter((x)=>{
      return x.isVerified
    })
    
    console.log(users);
    
    if (!users) {
      return res.status(404).json({ msg: "No users found" });
    }
    res.status(200).json({ users, nbhits: users.length });
  } catch (error) {
    res.status(500).json(error);
  }
};

//6. getSingleUser====================================================================:
const getSingleUser = async (req, res) => {
  const id = req.user.userId;
  //console.log(id)

  try {
    const user = await User.findOne({ _id: id }).select("-password");
    if (!user) {
      return res.status(404).json({ msg: `No user with id: ${id}` });
    }
    res.status(200).json(user);
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ msg: `No user with id: ${id}` });
    }
    console.log(error);
    res.status(500).json(error);
  }
};

//7. updateUser========================================================================:
const updateUser = async (req, res) => {
  const userId = req.user.userId;
  //console.log(userId);
  const { name, surname, phone, address, town, state } = req.body;

  if (!name || !surname || !phone || !address || !town || !state) {
    return res.status(400).json({ msg: "Input fields shouldn't be empty" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        name: name,
        surname: surname,
        phone: phone,
        address: address,
        town: town,
        state: state,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ msg: "User updated", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//8. getLoginStatus===================================================================:
const getLoginStatus = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("No token");
    return res.json(false);
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET_V);
  if (verified) {
    console.log("Token verified");
    return res.json(true);
  } else {
    return res.json(false);
  }
  // res.send("<h1>Get login status route</h1>");
};

//9. upLoaddUserPhoto:
const uploadUserPhoto = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ msg: "No files uploaded" });
    }

    const maxSize = 1024 * 1024;
    if (req.files.image.size > maxSize) {
      return res
        .status(400)
        .json({ msg: "Please upload image smaller than 1mb" });
    }
    //console.log(req.files.image);
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      { use_filename: true, folder: "samsUserProfilePhoto" }
    );
    res
      .status(200)
      .json({ msg: { src: result.secure_url, publicID: result.public_id } });
    fs.unlinkSync(req.files.image.tempFilePath);
  } catch (error) {
    console.log(error);
  }
};

//10. updateUserPhoto=================================================================:

const updateUserPhoto = async (req, res) => {
  const userId = req.user.userId;
  console.log(userId);
  const { photo } = req.body;
  try {
    const user = await User.findOne({ _id: userId }).select("-password");
    user.photo = photo;
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

//11.
//getCartDb========================================================================:
const getCartDb = async (req, res) => {
  const { userId } = req.user;
  //console.log(userId);

  try {
    const user = await User.findOne({ _id: userId });
    console.log(user);
    res.status(200).json({ userCart: user.cartItems });
  } catch (error) {
    res.status(500).json(error);
  }
};

//12. saveCartDb=====================================================================:
const saveCartDb = async (req, res) => {
  const id = req.user.userId;
  // console.log(id)
  const { cartItems } = req.body;
  console.log(cartItems);

  try {
    const user = await User.findOne({ _id: id }).select("-password");
    //console.log(user)
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }
    user.cartItems = cartItems;
    await user.save();
    console.log(user);
    res.status(200).json({ msg: "cart saved to DB", cartItems });
  } catch (error) {
    res.status(500).json(error);
  }
};

//13
//sendContactMail===================================================================
const sendContactMail = async (req, res) => {
  const { name, subject, message } = req.body;
  console.log({ name: name, subject: subject, message: message });

  if (!name || !subject || !message) {
    return res.status(400).json({ msg: "inputs shouldn't be empty" });
  }

  try {
    const user = await User.findOne({ _id: req.user.userId });

    if(user.name !== name){
      return res.status(404).json({msg:"Please use your first name"})
    };

    if (!user) {
      return res
        .status(401)
        .json({ msg: "You are unauthorized to send a mail" });
    }

    const userEmail = user.email;
    console.log(userEmail)

    console.log("Before sending email");

    await sendContactEmail({
      name: name,
      subject: subject,
      senderEmailAddress: userEmail,
      message: message,
    });
    console.log("After sending email");

    res.status(200).json({ msg: "email sent successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message || "Internal Server Error" });
  }
};

//14.
//clearCart==================================================================:
const clearCart = async (req, res) => {
  //const { cartItems } = req.body;


  try {

    const user = await User.findById(req.user.userId);

    user.cartItems = [];
    await user.save();
    res.status(200).json({ message: "User's cart cleared in DB" });
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getSingleUser,
  updateUser,
  getLoginStatus,
  uploadUserPhoto,
  updateUserPhoto,
  clearCart,
  getCartDb,
  saveCartDb,
  sendContactMail,
};
