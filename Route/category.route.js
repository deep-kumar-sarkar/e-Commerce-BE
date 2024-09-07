//controller for category
const category_controller = require('../Controller/category.controller');
auth_mw=require('../middleware/auth.middleware');
module.exports =(app)=> {

    app.post("/create",[auth_mw.verifyToken] ,category_controller.createCategory);

}

