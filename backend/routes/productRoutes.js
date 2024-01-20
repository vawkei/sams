const express = require("express");
const router = express.Router();

const {
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    review,
    deleteProductReview,
    updateReview,
    upLoadProductImage
  } = require("../controllers/productController");
const { authenticateUser, adminOnly } = require("../middlewares/authenticate-user");

router.get("/",getProducts);

router.get("/:id",getSingleProduct);

router.post("/upLoadProductImage", upLoadProductImage)

router.post("/",authenticateUser,adminOnly, createProduct);

router.patch("/:id",authenticateUser,adminOnly,updateProduct);//the id is productId

router.delete("/:id",authenticateUser,adminOnly,deleteProduct);//the id is productId

router.patch("/review/:id",authenticateUser,review);//the id is productId

router.patch("/deleteProductReview/:id",authenticateUser,deleteProductReview);//the id is productId

router.patch("/updateReview/:id",authenticateUser,updateReview);//the id is productId



module.exports = router


