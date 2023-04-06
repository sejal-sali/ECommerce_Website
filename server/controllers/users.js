const usersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
let createError = require("http-errors");
const JWT_PRIVATE_KEY = fs.readFileSync(
  process.env.JWT_PRIVATE_KEY_FILENAME,
  "utf8"
);

// verify user JWT password (if user is signed in)
exports.verifyUsersJWTPassword = (req, res, next) => {
  jwt.verify(
    req.headers.authorization,
    JWT_PRIVATE_KEY,
    { algorithm: "HS256" },
    (err, decodedToken) => {
      if (err) {
        return next(createError(500, "User not signed in"));
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    }
  );
};

// verify if user is administrator
exports.checkAdministrator = (req, res, next) => {
  if (req.decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
    return next();
  } else {
    return next(createError(401, "User is not an administrator"));
  }
};

// check if image file is valid type
exports.checkImageFileType = (req, res, next) => {
  if (!req.file) {
    return next();
  } else {
    if (
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/jpeg"
    ) {
      fs.unlink(
        `${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`,
        (error) => {
          res.json({
            errorMessage: `Only .png, .jpg and .jpeg format accepted`,
          });
        }
      );
    } else {
      return next();
    }
  }
};

// check if user exists
exports.checkThatUserExists = (req, res, next) => {
  usersModel.findOne({ email: req.params.email }, (err, data) => {
    if (err) {
      return next(err);
    }

    if (!data) {
      return next(createError(500, "Email not registered"));
    }

    req.data = data;
    return next();
  });
};

// check if user doesn't exist
exports.checkThatUserNotExists = (req, res, next) => {
  usersModel.findOne({ email: req.params.email }, (err, data) => {
    if (err) {
      return next(err);
    }
    if (data) {
      return next(createError(401, "User with this email already exists"));
    }
  });
  return next();
};

exports.checkThatPasswordIsValid = (req, res, next) => {
  bcrypt.compare(req.params.password, req.data.password, (err, result) => {
    if (err) {
      return next(err);
    }

    if (!result) {
      return next(createError(401, "Wrong password"));
    }

    return next();
  });
};

// user register
exports.userRegister = (req, res, next) => {
  bcrypt.hash(
    req.params.password,
    parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS),
    (err, hash) => {
      if (err) {
        return next(err);
      }
      usersModel.create(
        {
          name: req.params.name,
          email: req.params.email,
          password: hash,
          accessLevel: 1,
          phone: "",
          profilePhoto: "",
        },
        (error, data) => {
          if (error) {
            return next(createError(401, "User not registered"));
          }

          const token = jwt.sign(
            { email: data.email, accessLevel: data.accessLevel },
            JWT_PRIVATE_KEY,
            { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRY }
          );
          return res.json({
            name: data.name,
            accessLevel: data.accessLevel,
            token: token,
          });
        }
      );
    }
  );
};

// user sign in
exports.userSignIn = (req, res, next) => {
  const token = jwt.sign(
    { email: req.data.email, accessLevel: req.data.accessLevel },
    JWT_PRIVATE_KEY,
    { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRY }
  );

  fs.readFile(
    `${process.env.UPLOADED_FILES_FOLDER}/${req.data.profilePhoto}`,
    "base64",
    (err, fileData) => {
      if (fileData) {
        res.json({
          name: req.data.name,
          accessLevel: req.data.accessLevel,
          _id: req.data._id,
          profilePhoto: fileData,
          token: token,
        });
      } else {
        res.json({
          name: req.data.name,
          accessLevel: req.data.accessLevel,
          _id: req.data._id,
          profilePhoto: null,
          token: token,
        });
      }
    }
  );
};

// find user by id
exports.findUserById = (req, res, next) => {
  usersModel.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    }

    req.data = data;
    return next();
  });
};

// edit user password
exports.editUserPassword = (req, res, next) => {
  bcrypt.hash(
    req.body.password,
    parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS),
    (err, hash) => {
      if (err) {
        return next(err);
      }
      usersModel.findByIdAndUpdate(
        req.params.id,
        { password: hash },
        (error, data) => {
          if (error) {
            return next(error);
          }
          res.json(data);
        }
      );
    }
  );
};

// edit user
exports.editUser = (req, res, next) => {
  let object = {};
  if (req.file) {
    object = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      profilePhoto: req.file.filename,
    };

    usersModel.findById(req.params.id, (error, data) => {
      if (data) {
        fs.unlink(
          `${process.env.UPLOADED_FILES_FOLDER}/${data.profilePhoto}`,
          (err) => {}
        );
      }
    });

    usersModel.findByIdAndUpdate(req.params.id, object, (error, data) => {
      if (data) {
        fs.readFile(
          `${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`,
          "base64",
          (err, fileData) => {
            res.json({
              name: data.name,
              accessLevel: data.accessLevel,
              profilePhoto: fileData,
            });
          }
        );
      }
    });
  } else {
    object = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    usersModel.findByIdAndUpdate(req.params.id, object, (error, data) => {
      if (data) {
        res.json(data);
      }
    });
  }
};

// get all users
exports.getAllUsers = (req, res) => {
  usersModel.find((error, data) => {
    res.json(data);
  });
};

// get one user
exports.getOneUser = (req, res) => {
  usersModel.findById(req.params.id, (error, data) => {
    if (data) {
      fs.readFile(
        `${process.env.UPLOADED_FILES_FOLDER}/${data.profilePhoto}`,
        "base64",
        (err, fileData) => {
          res.json({
            name: data.name,
            phone: data.phone,
            email: data.email,
            accessLevel: data.accessLevel,
            profilePhoto: fileData,
          });
        }
      );
    }
  });
};

// sign out
exports.userSignOut = (req, res) => {
  res.json({});
};

// delete one user
exports.deleteUser = (req, res) => {
  usersModel.findByIdAndRemove(req.params.id, (error, data) => {
    res.json(data);
  });
};
