const Coupon = require("../models/coupon");

//createCoupon:
const createCoupon = async (req, res) => {
  const { name, discount, expiryDate } = req.body;
  // console.log(new Date());
  // 2023-12-29T17:09:44.667Z

  try {
    const coupon = await Coupon.create({ name, discount, expiryDate });
    res.status(201).json({ msg: "coupon created", coupon });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
  //res.send("Create coupon route")
};

//getCoupons:
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort("-createdAt");
    if (!coupons) {
      return res.status(404).json({ msg: "No coupons found" });
    }

    res.status(200).json({ coupons: coupons, nbhits: coupons.length });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

  // res.send("Get coupon route")
};

//getSingleCoupon:
const getSingleCoupon = async (req, res) => {
  const { couponName } = req.params;
  // console.log(couponName);
  // console.log(req)

  try{
    const coupon = await Coupon.findOne({
      name: couponName,
      expiryDate:{ $gt: Date.now()}
    });
  
    if (!coupon) {
      return res.status(404).json({ msg: "Coupon not found or expired" });
    }
    res.status(200).json({msg:"coupon applied successfully",coupon})
  
  }catch(error){
    res.status(500).json(error)
  }
  
 // res.send("getSingleCoupon route");
};

//deleteCoupon:
const deleteCoupon = async (req, res) => {
  const { couponName } = req.params;
  console.log(couponName);

  try {
    const deletCoupon = await Coupon.findOneAndDelete({ name: couponName });
    if (!deletCoupon) {
      return res.status(404).json({ msg: `${couponName} doesn't exist` });
    }
    res.status(200).json({ msg: `${couponName} Coupon deleted` });
  } catch (error) {
    res.status(500).json(error.message);
  }

  //res.send("Delete coupon route");
};

module.exports = { createCoupon, getCoupons, getSingleCoupon, deleteCoupon };
