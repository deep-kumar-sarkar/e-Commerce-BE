const authController=require("../Controller/auth.controller");
//connect middle ware
const authMw = require('../middleware/auth.middleware');


module.exports=(app)=>{
    app.post("/signup",[authMw.verifySignUpBody],authController.signup);
    //route for POST login
    app.post("/login",[authMw.verifyLoginBody],authController.signin);
   
}