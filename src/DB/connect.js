const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/APIText_Proc');
    }
    catch(error){
        console.log('faild');
    }
}
module.exports={connect}