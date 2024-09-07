
const user_model = require('./user_model');
const jwt=require('jsonwebtoken');
const auth_config=require('../config/auth.config');
const  verifySignUpBody =async (req, res, next) => {
    try{
        // check name is not empty
        if(!req.body.name){
            return res.status(400).send({message: "Name is required"});
        }
        // check email is not empty
        if(!req.body.email){
            return res.status(400).send({message: "Email is required"});
        }
        // check password is not empty
        if(!req.body.password){
            return res.status(400).send({message: "Password is required"});
        }
        // check user type is not empty
        if(!req.body.userType){
            return res.status(400).send({message: "User type is required"});
        }
        //check user is already present or not
        const user=await user_model.findOne({userId: req.body.userId});
        if(user){
            return res.status(500).send({
                message:"failed !user exist"

            })
        }
        next();
    }catch(error){
        console.log("error while verifying sign up body", error);
        res.status(500).send({message: "Internal server error"});
    }

}

// verify sign in body
const  verifySignInBody =async (req, res, next) => {
    try{
        // check userId is not empty
        if(!req.body.userId){
            return res.status(400).send({message: "User Id is required"});
        }
       
        // check password is not empty
        if(!req.body.password){
            return res.status(400).send({message: "Password is required"});
        }
        next();
    }catch(error){
        console.log("error while verifying sign in body", error);
        res.status(500).send({message: "Internal server error"});
    }
}
const verifyToken =async (req, res, next) => {
    const token=req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({message: "Token is required"});
    }
    jwt.verify(token, auth_config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({message: "Unauthorized"});
        }
        const user=await user_model.findOne({userId: decoded.id});
       if(!user){
           return res.status(400).send({message: "Unauthorized"});
       }
       req.user=user;
        next();
    });


   
}
const isAdmin=(req, res, next) => {
    const user=req.user;
    if(user && user.userType==="admin"){
        next();
    }else{
        return res.status(401).send({message: "Unauthorized"}); 
    }

}
// export it
module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody,
    verifyToken: verifyToken,
    isAdmin: isAdmin
 };
