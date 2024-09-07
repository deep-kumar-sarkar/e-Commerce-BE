// extarct mongoose
const mongoose = require("mongoose");
// define user schema with name, email, password,userType,userId, and address
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
      minLength:10,
        lowercase: true,  
    },
    password:{
        type: String,
        required: true,
        unique: true,
    
    },
    userType:{
        type: String,
        required: true,
        default: "customer",
        enum:["customer","admin"]
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    
    }
},{timestamps: true,versionKey: false});
// create user model with user schema
const userModel = mongoose.model("users", userSchema);
// export user model
module.exports = userModel;