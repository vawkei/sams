const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  //getAllUsers, 
  getSingleUser,
  updateUser,
  getLoginStatus,
  uploadUserPhoto,
  updateUserPhoto
} = require("../controllers/userController");

const {authenticateUser, adminOnly} =require("../middlewares/authenticate-user");

router.post("/register",register);

router.post("/login",login);

router.get("/logout",logout);

//router.get("/",authenticateUser,adminOnly, getAllUsers)

//router.get("/:id",authenticateUser, getSingleUser);
router.get("/getSingleUser",authenticateUser, getSingleUser);

router.patch("/updateUser",authenticateUser, updateUser);

router.get("/loginstatus/getstatus",getLoginStatus);

router.post("/uploadUserPhoto", uploadUserPhoto);

router.patch("/updateUserPhoto",authenticateUser, updateUserPhoto)

module.exports = router

