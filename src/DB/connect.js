const mongoose = require('mongoose');

async function connect(){
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://localhost:27017/APIText_Proc',{useNewUrlParser: true,
        useUnifiedTopology: true});
    }
    catch(error){
        console.log('faild');
    }
}
module.exports={connect}