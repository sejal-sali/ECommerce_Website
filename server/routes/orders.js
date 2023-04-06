const router = require(`express`).Router();
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();

const {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOneOrder,
  getOrderProduct,
} = require("../controllers/orders");
const {
  verifyUsersJWTPassword,
  checkAdministrator,
} = require("../controllers/users");

router.get("/orders", verifyUsersJWTPassword, checkAdministrator, getAllOrders);
router.post("/orders", jsonParser, createOrder);
router.get("/orders/user/:userId", verifyUsersJWTPassword, getUserOrders);
router.get("/orders/:id", verifyUsersJWTPassword, getOneOrder);
router.get("/orders/product/:id", getOrderProduct);

module.exports = router;
