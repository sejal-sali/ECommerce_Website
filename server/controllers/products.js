const productsModel = require("../models/products");
const fs = require("fs");
const createError = require("http-errors");

// get all products
exports.getAllProducts = (req, res, next) => {
  const query = {};
  if (req.query.categories) {
    query.categories = req.query.categories;
  }
  if (req.query.minprice || req.query.maxprice) {
    query.price = { $gte: req.query.minprice, $lte: req.query.maxprice };
  }

  if (req.query.colours) {
    query.colours = { $all: req.query.colours };
  }

  if (req.query.q) {
    query.$or = [
      { productName: { $regex: req.query.q, $options: "i" } },
      { categories: { $regex: req.query.q, $options: "i" } },
    ];
  }

  const sortQuery = {};
  if (req.query.sortBy || req.query.orderBy) {
    if (req.query.sortBy === "productName") {
      sortQuery.productName = parseInt(req.query.orderBy);
    } else if (req.query.sortBy === "price") {
      sortQuery.price = parseInt(req.query.orderBy);
    } else if (req.query.sortBy === "stock") {
      sortQuery.stock = parseInt(req.query.orderBy);
    }
  }

  productsModel
    .find(query, (error, data) => {
      if (error) {
        return next(error);
      }

      if (!data) {
        return next(createError(500, "Products not read"));
      }

      res.json(data);
    })
    .sort(sortQuery);
};

// Read one record
exports.getOneProduct = (req, res, next) => {
  productsModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    }

    if (!data) {
      return next(createError(500, "Product not read"));
    }

    res.json(data);
  });
};

// add new product
exports.addProduct = (req, res, next) => {
  if (req.body.productName === "") {
    return next(createError(400, "Product name is required."));
  } else if (req.body.description === "") {
    return next(createError(400, "Product description is required."));
  } else if (req.body.price < 0) {
    return next(createError(400, "Price must be a positive number."));
  } else if (req.body.stock < 0) {
    return next(createError(400, "Stock must be a positive number."));
  } else {
    let productDetails = new Object();
    (productDetails.productName = req.body.productName),
      (productDetails.description = req.body.description),
      (productDetails.categories = req.body.categories),
      (productDetails.colours = req.body.colours),
      (productDetails.price = req.body.price),
      (productDetails.stock = req.body.stock),
      (productDetails.photos = []);

    req.files.map((file, index) => {
      productDetails.photos[index] = { filename: `${file.filename}` };
    });

    productsModel.create(productDetails, (error, data) => {
      res.json(data);
    });
  }
};

// delete product
exports.deleteProduct = (req, res) => {
  productsModel.findByIdAndRemove(req.params.id, (error, data) => {
    res.json(data);
  });
};

// edit product
exports.editProduct = (req, res) => {
  if (req.body.productName === "") {
    return next(createError(400, "Product name is required."));
  } else if (req.body.description === "") {
    return next(createError(400, "Product description is required."));
  } else if (req.body.price < 0) {
    return next(createError(400, "Price must be a positive number."));
  } else if (req.body.stock < 0) {
    return next(createError(400, "Stock must be a positive number."));
  } else {
    let productDetails = new Object();
    (productDetails.productName = req.body.productName),
      (productDetails.description = req.body.description),
      (productDetails.categories = req.body.categories),
      (productDetails.colours = req.body.colours),
      (productDetails.price = req.body.price),
      (productDetails.stock = req.body.stock),
      (productDetails.photos = []);

    if (req.files.newProductPhotos) {
      if (req.body.productPhotos) {
        if (typeof req.body.productPhotos !== "string") {
          req.files.newProductPhotos.map((file, index) => {
            productDetails.photos[index] = { filename: `${file.filename}` };
          });

          req.body.productPhotos.map((file, index) => {
            productDetails.photos[index + req.files.newProductPhotos.length] = {
              filename: JSON.parse(file).filename,
            };
          });
        } else {
          productDetails.photos[0] = {
            filename: JSON.parse(req.body.productPhotos).filename,
          };
          req.files.newProductPhotos.map((file, index) => {
            productDetails.photos[index + 1] = { filename: `${file.filename}` };
          });
        }
      } else {
        req.files.newProductPhotos.map((file, index) => {
          productDetails.photos[index] = { filename: `${file.filename}` };
        });
      }
    } else {
      if (typeof req.body.productPhotos !== "string") {
        req.body.productPhotos.map((file, index) => {
          productDetails.photos[index] = {
            filename: JSON.parse(file).filename,
          };
        });
      } else {
        productDetails.photos[0] = {
          filename: JSON.parse(req.body.productPhotos[0]).filename,
        };
      }
    }

    productsModel.findByIdAndUpdate(
      req.params.id,
      productDetails,
      (error, data) => {
        res.json(data);
      }
    );
  }
};

// get product photo
exports.getProductPhoto = (req, res) => {
  fs.readFile(
    `${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`,
    "base64",
    (err, fileData) => {
      if (fileData) {
        res.json({ image: fileData });
      } else {
        res.json({ image: null });
      }
    }
  );
};

exports.deleteProductPhoto = (req, res) => {
  productsModel.findByIdAndUpdate(
    req.params.id,
    { $pull: { photos: { filename: req.params.filename } } },
    (error, data) => {
      res.json(data);
    }
  );

  fs.unlink(
    `${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`,
    (err) => {}
  );
};
