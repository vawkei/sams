const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  adminOnly,
} = require("../middlewares/authenticate-user");

const {
  createCoupon,
  getCoupons,
  getSingleCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

router.post("/", authenticateUser, adminOnly, createCoupon);

router.get("/", authenticateUser, adminOnly,getCoupons);

router.get("/:couponName",authenticateUser,getSingleCoupon);

router.delete("/:couponName",authenticateUser, adminOnly,deleteCoupon);

module.exports = router;

