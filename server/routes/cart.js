const router = require(`express`).Router();
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();

const {
  addToCart,
  getCartItem,
  increaseQuantity,
  getUserCart,
  decreaseQuantity,
  deleteItem,
} = require("../controllers/cart");

router.get("/cart/:productid/:userid", getCartItem);
router.get("/cart/:userid", getUserCart);
router.post("/cart/:productid", jsonParser, addToCart);
router.put("/cart/increaseQuantity/:id/:productid", increaseQuantity);
router.put("/cart/decreaseQuantity/:id/:productid", decreaseQuantity);
router.delete("/cart/:id", deleteItem);

module.exports = router;
