//import
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/auth");
const adminRoutes = require("./src/routes/admin/auth");
const morgan = require("morgan");
const cors = require("cors");
const env = require("dotenv").config();

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
//Router
app.use("/api", authRoutes);
app.use("/api", adminRoutes);

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
