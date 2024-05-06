const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect("mongodb+srv://shaikhaamir2508:1lIJgUwp9kAjdVSy@cluster0.tajozc7.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
  });
