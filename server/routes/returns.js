const router = require(`express`).Router();
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();

const {
  returnOrder,
  getAllReturns,
  getOneReturn,
  getUserReturns,
} = require("../controllers/returns");
const {
  verifyUsersJWTPassword,
  checkAdministrator,
} = require("../controllers/users");

router.post("/return", jsonParser, returnOrder);
router.get(
  "/return",
  verifyUsersJWTPassword,
  checkAdministrator,
  getAllReturns
);
router.get("/return/user/:userId", verifyUsersJWTPassword, getUserReturns);
router.get("/return/:id", verifyUsersJWTPassword, getOneReturn);

module.exports = router;
