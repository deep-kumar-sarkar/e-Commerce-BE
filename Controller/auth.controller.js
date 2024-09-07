//logic to register a user
const user_model = require("../Model/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret=require("../config/auth.config");
exports.signup=async (req,res)=>{
    const request_body=req.body;
    const userObject={
        name: request_body.name,
        email: request_body.email,
        password: bcrypt.hashSync(request_body.password,8),
        userType: request_body.userType
    };
    try{
const userCreated=await user_model.create(userObject);
res.status(201).send({message:"User created successfully",user:userCreated});
    }catch(err){
        console.log("error while creating user",err);
        res.status(500).send({message: "Internal server error while registering"});
    }
}

//logic to login a user

exports.signin=async (req,res)=>{
   const user=await user_model.findOne({userId:req.body.userId})
   if(!user){
       return res.status(401).send({message:"User not found"});
   }
   //verify password
   const passwordIsValid=bcrypt.compareSync(req.body.password,user.password);
   if(!passwordIsValid){
       return res.status(401).send({message:"Invalid password"});
   }
   res.status(200).send({message:"User logged in successfully",user:user});

   //make jwt token
   const token=jwt.sign({id:user._id},secret.secret,{expiresIn: 86400});
   res.status(200).send({
    name: user.name,
    email: user.email,
    userType: user.userType,
    accessToken: token,
    userId: user._id,
    userType: user.userType
   });
}

