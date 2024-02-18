const express = require("express");
const router = express.Router();

const {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  //getAllUsers, 
  getSingleUser,
  updateUser,
  getLoginStatus,
  uploadUserPhoto,
  updateUserPhoto,
  clearCart,
  saveCartDb,
  getCartDb,
  getAllUsers,
  sendContactMail
} = require("../controllers/userController");

const {authenticateUser, adminOnly} =require("../middlewares/authenticate-user");

router.post("/register",register);

router.post("/verifyEmail", verifyEmail)

router.post("/login",login);

router.get("/logout",logout);

router.post("/forgotPassword",forgotPassword)

router.post("/resetPassword",resetPassword);

router.get("/getAllUsers",getAllUsers)

router.get("/getSingleUser",authenticateUser, getSingleUser);

router.patch("/updateUser",authenticateUser, updateUser);

router.get("/loginstatus/getstatus",getLoginStatus);

router.post("/uploadUserPhoto", uploadUserPhoto);

router.patch("/updateUserPhoto",authenticateUser, updateUserPhoto);

//sendContactMail:
router.post("/sendContactMail",authenticateUser, sendContactMail);

//user Cart:
// router.patch("/clearCart",authenticateUser,clearCart);
router.get("/getCartDb",authenticateUser,getCartDb);
router.patch("/saveCartDb",authenticateUser,saveCartDb)

module.exports = router


// not needed:
//router.get("/",authenticateUser,adminOnly, getAllUsers)
//router.get("/:id",authenticateUser, getSingleUser);
