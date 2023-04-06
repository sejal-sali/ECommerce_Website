const router = require(`express`).Router();
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();
const multer = require("multer");
const upload = multer({ dest: `${process.env.UPLOADED_FILES_FOLDER}` });

const {
  userRegister,
  userSignIn,
  userSignOut,
  getAllUsers,
  getOneUser,
  deleteUser,
  editUser,
  editUserPassword,
  verifyUsersJWTPassword,
  checkAdministrator,
  checkImageFileType,
  checkThatUserExists,
  checkThatPasswordIsValid,
  checkThatUserNotExists,
  findUserById,
} = require("../controllers/users");

// get all users
router.get("/users", verifyUsersJWTPassword, checkAdministrator, getAllUsers);

// get one user
router.get("/users/:id", verifyUsersJWTPassword, getOneUser);

// register user
router.post(
  "/users/register/:name/:email/:password",
  checkThatUserNotExists,
  userRegister
);

// login user
router.post(
  "/users/login/:email/:password",
  checkThatUserExists,
  checkThatPasswordIsValid,
  userSignIn
);

// logout user
router.post("/users/logout", userSignOut);
router.delete(
  `/users/:id`,
  verifyUsersJWTPassword,
  checkAdministrator,
  deleteUser
);

// edit user
router.put(
  `/users/:id`,
  verifyUsersJWTPassword,
  upload.single("profilePhoto"),
  jsonParser,
  checkImageFileType,
  editUser
);

// edit user password
router.put(
  `/users/:id/:password`,
  verifyUsersJWTPassword,
  findUserById,
  checkThatPasswordIsValid,
  jsonParser,
  editUserPassword
);

module.exports = router;
