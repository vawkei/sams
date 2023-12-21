const express = require("express");

const {
  createCategory,
  getCategories,
  getSingleCategory,
  deleteCategory,
} = require("../controllers/categoryController");


const {authenticateUser,adminOnly} =require("../middlewares/authenticate-user");

const router = express.Router();

router.post("/",authenticateUser,adminOnly,createCategory);
router.get("/", authenticateUser,adminOnly,getCategories);
router.get("/:slug",getSingleCategory)
router.delete("/:slug",authenticateUser,adminOnly,deleteCategory);


module.exports = router;
