// creating category controller
const mongoose = require('mongoose');
const category_model = require('../Model/category.model');

exports.createCategory = async (req, res) => {
   const cat_data={
    name:req.body.name,
    description:req.body.description

   }
   try{
    const category = await category_model.create(cat_data);
    return res.status(201).send({message:"Category created successfully",category:category});
   }catch(err){
    console.log("error while creating category",err);
   return res.status(500).send({message: "Internal server error"});
   }
   
}