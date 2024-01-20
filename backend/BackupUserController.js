//This is a backup for userController. before the email verification:
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//1. register:
const register = async (req, res) => {
  const { name, email, password, confirmedPassword } = req.body;

  //console.log(name,email,password,confirmedPassword);
  

  //first user registered as admin:
  const isFirstAccount = await User.countDocuments({}) ===0;
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
  // const tempData = { name: name, email: email, password: hashedPassword,role:role };
  const tempData = { name: name, email: email, password: hashedPassword};

  try {
    const user = await User.create(tempData);

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET_V,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    if (user) {
      const oneDay = 1000 * 60 * 60 * 24;

      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
      });
      return res.status(201).json({ msg: "User created", user, token });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
  
};

//2. login :
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

//3. logout:
const logout = (req, res) => {
  try {
    res.cookie("token", " ", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ msg: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//4. getAllUsers:
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    console.log(users);
    if (!users) {
      return res.status(404).json({ msg: "No users found" });
    }
    res.status(200).json({ users, nbhits: users.length });
  } catch (error) {
    res.status(500).json(error);
  }
};

//5. getSingleUser:
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

//6. updateUser:
const updateUser = async (req, res) => {
  const userId = req.user.userId;
  //console.log(userId);
  const { name, phone, address } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId},
      { name:name, phone:phone, address:address },
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

//7. getLoginStatus:
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

//8. upLoaddUserPhoto:
const uploadUserPhoto = async (req, res) => {
  
  try {
    
    if(!req.files){
      return res.status(400).json({msg:"No files uploaded"})
    };

  const maxSize = 1024 * 1024;
  if(req.files.image.size > maxSize){
    return res.status(400).json({msg:"Please upload image smaller than 1mb"})
  };
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

//9. updateUserPhoto:

const updateUserPhoto =async  (req, res) => {
  const userId = req.user.userId;
  console.log(userId)
  const { photo } = req.body;
  try {
    const user = await User.findOne({ _id: userId }).select("-password");
    user.photo = photo;
    const updatedUser = await user.save();
    res.status(201).json(updatedUser );
  } catch (error) {
    console.log(error);
  }
};

//10. getCartDb:
const getCartDb =async (req,res)=>{
  const {userId}  = req.user;
  //console.log(userId);

  try{
    const user = await User.findOne({_id:userId})
    console.log(user)
    res.status(200).json({userCart:user.cartItems})
  }catch(error){
    res.status(500).json(error)
  }
};

//11. saveCartDb:
const saveCartDb = async(req,res)=>{
  
  const id = req.user.userId;
  // console.log(id)
  const {cartItems} = req.body;
  console.log(cartItems);

  try{
    const user =await User.findOne({_id:id}).select("-password");
    //console.log(user)
    if(!user){
      return res.status(400).json({msg:"User doesn't exist"})
    }
    user.cartItems = cartItems;
    await user.save()
    console.log(user)
    res.status(200).json({msg:"cart saved to DB",cartItems}) 
  }catch(error){
    res.status(500).json(error)
  }
}; 

module.exports = {
  register,
  login,
  logout,
  getAllUsers,
  getSingleUser,
  updateUser,
  getLoginStatus,
  uploadUserPhoto,
  updateUserPhoto,
  getCartDb,
  saveCartDb
};
