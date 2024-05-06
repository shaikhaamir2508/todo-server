const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type : String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    cpassword:{
        type:String
    }
});

const user = new mongoose.model("user",userSchema);

module.exports = user;