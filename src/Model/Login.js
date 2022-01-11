const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo đối tượng login
const Login = new Schema({
    username: {type:String,required:true},
    password: {type:String,required:true},
    CreateAt: {type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
    state:{type:String,minlength:1}
  });
module.exports=mongoose.model('Login',Login);