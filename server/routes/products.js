const router = require(`express`).Router();
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();
const multer = require("multer");
const upload = multer({ dest: `${process.env.UPLOADED_FILES_FOLDER}` });

const {
  getAllProducts,
  getOneProduct,
  addProduct,
  deleteProduct,
  editProduct,
  getProductPhoto,
  deleteProductPhoto,
} = require("../controllers/products");

const {
  verifyUsersJWTPassword,
  checkAdministrator,
} = require("../controllers/users");

router.get(`/products`,  getAllProducts);
router.get(`/products/:id`, getOneProduct);
router.get(`/products/photo/:filename`, getProductPhoto);
router.post(
  `/products`,
  verifyUsersJWTPassword,
  checkAdministrator,
  upload.array(
    "productPhotos",
    parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)
  ),
  jsonParser,
  addProduct
);
router.delete(
  `/products/:id`,
  verifyUsersJWTPassword,
  checkAdministrator,
  deleteProduct
);
router.put(
  `/products/photo/:id/:filename`,
  verifyUsersJWTPassword,
  checkAdministrator,
  deleteProductPhoto
);
router.put(
  `/products/:id`,
  verifyUsersJWTPassword,
  checkAdministrator,
  upload.fields([
    {
      name: "productPhotos",
      maxCount: parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED),
    },
    {
      name: "newProductPhotos",
      maxCount: parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED),
    },
  ]),
  jsonParser,
  editProduct
);

module.exports = router;
