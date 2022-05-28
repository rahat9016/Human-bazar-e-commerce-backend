//import
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/auth");
const adminRoutes = require("./src/routes/admin/auth");
const categoryRoutes = require("./src/routes/category");
const productRoutes = require("./src/routes/product");
const cartRoutes = require("./src/routes/cart");
const initialDataRoutes = require("./src/routes/admin/initialdata");
const morgan = require("morgan");
const cors = require("cors");
const env = require("dotenv").config();
const path = require("path");
//Express App
const app = express();
//Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database Error -------->", error);
  });

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "src/uploads")));
console.log(path.join(__dirname, "uploads"));
//Router
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);

//404 error handler
app.use((req, res, next) => {
  next("Requested url not found");
});

//Error handler
app.use((error, req, res, next) => {
  if (error) {
    res.status(500).send(error);
  } else {
    res.status(500).send("There was an Error!");
  }
});
//Listen port
port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
