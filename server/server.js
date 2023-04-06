// Server-side global variables
require(`dotenv`).config({ path: `./config/.env` });

// Database
require(`./config/db`);

// Express
const express = require(`express`);

const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const path = require("path");
const appPath = path.join(__dirname, "..", "client", "build");
app.use(express.static(appPath));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(appPath, "index.html"));
});

app.get("/shop", (req, res) => {
  res.sendFile(path.resolve(appPath, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(appPath, "index.html"));
});

app.get("/account/*", (req, res) => {
  res.sendFile(path.resolve(appPath, "index.html"));
});

app.get("/shoppingcart", (req, res) => {
  res.sendFile(path.resolve(appPath, "index.html"));
});

app.get("/admindashboard", (req, res) => {
  res.sendFile(path.resolve(appPath, "index.html"));
});

app.get("/purchases", (req, res) => {
  res.sendFile(path.resolve(appPath, "index.html"));
});

app.get("/returns", (req, res) => {
  res.sendFile(path.resolve(appPath, "index.html"));
});

app.get("/editproduct/*", (req, res) => {
  res.sendFile(path.resolve(appPath, "index.html"));
});

// Routers
app.use(require(`./routes/products`));
app.use(require(`./routes/users`));
app.use(require(`./routes/cart`));
app.use(require(`./routes/orders`));
app.use(require(`./routes/returns`));

// Port
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Connected to port ` + process.env.SERVER_PORT);
});

// Error 404
app.use((req, res, next) => {
  next(createError(404));
});

// Error 404
app.use((req, res, next) => {
  next(createError(404));
});

// Handle errors
app.use(function (err, req, res, next) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }

  // check that all required parameters are not empty in any route
  if (err instanceof ReferenceError) {
    err.statusCode = 400;
    err.message =
      "Cannot reference a variable that has not been declared. This can be caused in run-time if the user did not input a parameter that is required by a router";
  }

  // Server-side error message
  console.log(err.message + "\nError Details...");
  // Server-side error details
  console.log(err);

  // return error message that will be displayed on client-side console
  res.status(err.statusCode).send(err.message);
});
