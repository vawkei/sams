//Original:
const express = require("express");
const router = express.Router();

const {
  createOrder,
  updateOrderWebhook,
  getAdminOrders,
  getOrders,
  updateOrderStatus,
  getSingleOrder,

} = require("../controllers/orderController");

const {
  authenticateUser,
  adminOnly,
} = require("../middlewares/authenticate-user");

router.post("/", authenticateUser, createOrder);
router.patch("/updateOrderWebhook", authenticateUser, updateOrderWebhook);
router.get("/getAdminOrders", authenticateUser, adminOnly, getAdminOrders);
router.get("/", authenticateUser, getOrders);
router.get("/:id", authenticateUser, getSingleOrder);
router.patch(
  "/updateOrderStatus/:id",
  authenticateUser,
  adminOnly,
  updateOrderStatus
);

module.exports = router;

// // ctrl + shift + c is used to copy from cli



//secondOne
// routes/orderRoutes.js
// const express = require("express");
// const router = express.Router();

// const {
//   createOrder,
//   updateOrderWebhook,
//   getAdminOrders,
//   getOrders,
//   updateOrderStatus,
//   getSingleOrder,
// } = require("../controllers/orderController");

// const { authenticateUser, adminOnly } = require("../middlewares/authenticate-user");

// // Pass io to the orderRoutes function
// const orderRoutes = (io) => {
//   router.post("/", authenticateUser, createOrder(io));
//   router.patch("/updateOrderWebhook", authenticateUser, updateOrderWebhook);
//   router.get("/getAdminOrders", authenticateUser, adminOnly, getAdminOrders);
//   router.get("/", authenticateUser, getOrders);
//   router.get("/:id", authenticateUser, getSingleOrder);
//   router.patch("/updateOrderStatus/:id", authenticateUser, adminOnly, updateOrderStatus);

//   return router;
// };

// module.exports = orderRoutes;
