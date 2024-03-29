const Order = require("../models/orders");
const User = require("../models/user");
const { orderSuccessEmail } = require("../emailTemplates/orderTemplates");
const sendEmail = require("../utils/sendEmail");
const {io} = require("../server")

const { updateProductQuantity } = require("../utils/index");

//======================================================start here
//createOrder:=====================================================================
const createOrder = async (req, res) => {
  const {
    firstName,
    surname,
    residentialAddress,
    town,
    state,
    cartItems,
    coupon,
    orderStatus,
    cartTotalQty,
    orderAmount,
    paymentMethod,
  } = req.body;

  if (
    !firstName ||
    !surname ||
    !residentialAddress ||
    !town ||
    !state ||
    !cartItems ||
    !orderStatus ||
    !paymentMethod
  ) {
    return res.status(400).json({ msg: "Please fill out all inputs bitch!" });
  }

  //const orderDate=new Date().toDateString();
  const orderDate = new Date();
  // If you want to display the local time, you can use toLocaleString():
  const orderTime = new Date();
  //.toLocaleTimeString();
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  if ( firstName !== user.name ) {
    return res.status(404).json({ msg: "invalid credentials" });
  };
  // if(residentialAddress !== user.address){
  //   return res.status(404).json({msg: "invalid credentials"})
  // }

  const orderData = {
    firstName,
    surname,
    residentialAddress,
    town,
    state,
    cartItems,
    orderDate,
    orderTime,
    orderStatus,
    orderAmount,
    cartTotalQty,
    coupon,
    email: user.email,
    paymentMethod,
    createdBy: user._id,
  };
  try {
    const order = await Order.create(orderData);
    await updateProductQuantity(cartItems);

    console.log("Start Emitting the newly Created Order...")
    io.emit("newlyCreatedOrder",order)
    console.log("Finished Emitting the newly Created Order...")

    //send order email to user:
    const subject = "New order placed. sams";
    const send_to = user.email;
    const template = orderSuccessEmail(user.name, cartItems);
    const reply_to = "no_reply@sams.com";

    await sendEmail(subject, send_to, template, reply_to);

    res.status(201).json({ msg: "Order created", order:order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
  //res.send("createOrders route");
};



//updateOrderWebkook:==============================================================
const updateOrderWebhook =async (req,res)=>{

  const {webhookResponse} = req.body;
  console.log("This is the webhook1:",req.body);
  console.log("This is the webhook2:",webhookResponse);

  if(!webhookResponse){
    return res.status(404).json({msg:"No webhook response found"})
  }
  
  try{

    const currentUsersMostRecentOrder = await Order.findOne({createdBy:req.user.userId}).sort("-createdAt");

    if(!currentUsersMostRecentOrder){
      return res.status(404).json("no recent order for current user")
    }

    if(req.user.userId !== webhookResponse.createdBy){
      return res.status(401).json({msg:"user ids don't match"})
    }

    currentUsersMostRecentOrder.paystackWebhook = webhookResponse;
    await currentUsersMostRecentOrder.save()

    res.status(200).json({msg:"paystack webhook updated"})
  }catch(error){
    res.status(500).json({msg:error.message})
  }
}

//getAdminOrders:==================================================================
const getAdminOrders = async (req, res) => {
  const { userId } = req.user;
  //console.log(userId);

  try {
    const allOrders = await Order.find({}).sort("-createdAt");

    if (!allOrders) {
      return res.status(404).json({ msg: "No order found" });
    }

    return res.status(200).json({
      msg: "These are all the others",
      allOrders: allOrders,
      nbhits: allOrders.length,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//getOrders===========================================================================
const getOrders = async (req, res) => {
  const { userId } = req.user;
  console.log(userId);

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json(`${user} does not exist`);
  }

  try {
    const userOrders = await Order.find({ createdBy: userId }).sort(
      "-createdAt"
    );

    //console.log(userOrders);

    if (!userOrders) {
      return res.status(404).json({ msg: "No order found" });
    }
    res.status(200).json({
      msg: `here is ${user.name}'s orders`,
      userOrders,
      nbhits: userOrders.length,
    });
  } catch (error) {
    res.status(500).json(error);
  }

  //res.send("getOrders route");
};

//getSingleOrder:===================================================================
const getSingleOrder = async (req, res) => {
  const orderId = req.params.id;
  //console.log(orderId);

  if (!orderId) {
    return res.status(404).json({ msg: `No order with id: ${orderId}` });
  }

  try {
    const user = await User.findOne({ _id: req.user.userId });

    if (user.role === "admin") {
      const order = await Order.findOne({ _id: orderId });

      if (!order) {
        return res.status(404).json({ msg: `No order found` });
      }

      return res.status(200).json(order);
    }

    const order = await Order.findOne({
      createdBy: req.user.userId,
      _id: orderId,
    });

    if (!order) {
      return res.status(404).json({ msg: `No order found` });
    } //some adminorderIds:
    // 6597763a8cf5bad9286f23ac
    //6597762d8cf5bad9286f23a9
    res.status(200).json(order);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(500).json({ msg: `id:${error.value} doesn't exist` });
    }
    return res.status(500).json(error.message);
  }
  //res.send("getSingleOrder route");
};

//updateOrderStatus:==================================================================
const updateOrderStatus = async (req, res) => {
  const { orderStatus } = req.body;
  console.log(orderStatus);
  const orderId = req.params.id;

  console.log(orderStatus, orderId);

  if (!orderStatus) {
    return res.status(400).json({ msg: "Please pass in an order status" });
  }

  try {
    const updatedStatus = await Order.findOneAndUpdate(
      { _id: orderId },
      { orderStatus: orderStatus },
      { new: true, runValidators: true }
    );
    res.status(201).json({ msg: "Status updated", updatedStatus });
  } catch (error) {
    res.status(500).json(error);
  }
  //OR:
  // const order = await Order.findOne({orderId});
  // order.orderStatus = orderStatus ;
  // await order.save()
  // res.status(201).json({msg:"Status updated",updatedOrder:order.orderStatus})
};

module.exports = {
  createOrder,
  updateOrderWebhook,
  getAdminOrders,
  getOrders,
  getSingleOrder,
  updateOrderStatus,
};
