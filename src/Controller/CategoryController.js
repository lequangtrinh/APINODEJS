const { modelNames } = require('mongoose')
const Category =require('../Model/Category')

class CategoryController{
    Get(req,res){
        Category.find({state:1}).then(category=>{res.json(category)}).catch(error =>{
            res.statusCode=400,
            res.end(JSON.stringify({
                success:false,
                message:"vui lòng nhập lại thông tin nhé!!!",
            }))
        })
    };
    GetId(req,res){
        Category.find({_id:req.params.id,state:1}).then(category=>{res.json(category)}).catch(error =>{
            res.statusCode=400,
            res.end(JSON.stringify({
                success:false,
                message:"vui lòng nhập lại thông tin nhé!!!",
            }))
        })
    };
    create(req,res,next){
        Category.find({tensp:(req.tensp).toLowerCase()}).then(cate=>{
            if(cate.length != 0){
             res.end(JSON.stringify({
                 success:false,
                 message:"sản phẩm đã tồn tại",
             })); 
            }
            else{
             const Cate=new Category(req);
             Cate.state=1;
             Cate.updatedAt=null;
            Cate.tensp=Cate.tensp.toLowerCase();
             Cate.save();
             res.end(JSON.stringify({
              success:true,
              message:"thêm thành công",
          }));
            }
        });
     };
     update(req,res,next){
        Category.find({tensp:(req.body.tensp).toLowerCase()}).then(cate=>{
            if(cate.length != 0){
             res.end(JSON.stringify({
                 success:false,
                 message:"sản phẩm đã tồn tại",
             })); 
            }
            else{
                req.body.updatedAt=Date.now();
                req.body.tensp=(req.body.tensp).toLowerCase();
                Category.updateOne({_id:req.params.id},req.body,{upsert: true}).then(login=>(res.send(JSON.stringify({
                    success:true,
                    message:"update thành công",
                })))).catch(next);
        }
        });   
     };
     DELETE(req,res,next){
        Category.find({_id:req.params.id,state:1}).then(cate=>{
            console.log(cate);
            if(cate.length == 0){
                res.end(JSON.stringify({
                    success:false,
                    message:"vui lòng kiểm tra thông tin",
                })); 
               }
               else{
                req.body.updatedAt=Date.now();
                Category.updateOne({_id:req.params.id,state:1},{state:0,updatedAt:req.body.updatedAt}).then(login=>(res.send(JSON.stringify({
                            success:true,
                            message:"xóa thành công",
                        })))).catch(next);
           }

        }).catch(error =>{
            res.statusCode=400,
            res.end(JSON.stringify({
                success:false,
                message:"vui lòng nhập lại thông tin nhé!!!",
            }))
        })
      
    };

}
module.exports=new CategoryController;