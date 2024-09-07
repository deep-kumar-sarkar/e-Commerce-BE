// import express and mongoose
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server_config=require("./config/server.config");
const db_config=require("./config/db.config");
const user_model=require("./Model/user.model");
const bcrypt = require('bcryptjs');
// connect to mongodb   
mongoose.connect(db_config.DB_URL)
const db = mongoose.connection;
//middle ware
app.use(express.json());
db.on('error', ()=>{
    console.log("Error in connection to mongo");
});
db.once('open',  ()=> {
    console.log("Connected successfully to mongo");  // server is running    
    init()
});


async function init(){
let user=await user_model.findOne({userType: "admin"});
if(user){
    console.log("User already exists"); 
    return;
}
 try{
    user=await user_model.create({
        name: "DEEP", 
        userId: "admin", 
        email: "deep@example.com",
        password: bcrypt.hashSync("deep123",8),
        userType: "admin"  });
    
    console.log("User created successfully",user);
 }catch(err){
    console.log("error while creating user",err);
 }  
 }

 // stich route to server
require("./Route/auth.route")(app);
require("./Route/category.route")(app);

// app.post("/signup", authController.signup);

//start server
app.listen(server_config.port, () => {
    console.log(`Server is running on port ${server_config.port}`);
})  