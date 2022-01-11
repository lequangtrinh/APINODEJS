const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo đối tượng login
const Category = new Schema({
    masp: {type:String,required:true},
    tensp: {type:String,required:true},
    CreateAt: {type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
    state:{type:String,maxlength:2}
  });
module.exports=mongoose.model('CATEGO',Category);