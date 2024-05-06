const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect("mongodb://localhost:27017/MERN-TODO")
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
  });
