const { modelNames } = require('mongoose')
const produce =require('../Model/Proc')
const Category =require('../Model/Category')
class ProduceController{
    Get(req,res){
      produce.find({state:1}).then(proc=>{res.json(proc)}).catch(error =>{
            res.statusCode=400,
            res.end(JSON.stringify({
                success:false,
                message:"vui lòng nhập lại thông tin nhé!!!",
            }))
        })
    };
    GetId(req,res){
      produce.find({_id:req.params.id,state:1}).then(proc=>{res.json(proc)}).catch(error =>{
            res.statusCode=400,
            res.end(JSON.stringify({
                success:false,
                message:"vui lòng nhập lại thông tin nhé!!!",
            }))
        })
    };
    create(req,res,next){
        Category.find({_id:(req.emp_id).toLowerCase()}).then(cate=>{
         
            if(cate.length !=0){
                produce.find({tensp:(req.tensp).toLowerCase(),emp_id:(req.emp_id).toLowerCase()}).then(proc=>{
                    if(proc.length != 0){
                     res.end(JSON.stringify({
                         success:false,
                         message:"Vui lòng kiểm tra thông tin",
                     })); 
                    }
                    else{
                     const Proc=new produce(req);
                     Proc.state=1;
                     Proc.updatedAt=null;
                     Proc.tensp=Proc.tensp.toLowerCase();
                     Proc.emp_id=Proc.emp_id.toLowerCase();
                     Proc.save();
                     res.end(JSON.stringify({
                      success:true,
                      message:"thêm thành công",
                  }));
                    }
                });
            }
            else{
                res.status(404).json({
                    success:false,
                    message:"Vui lòng kiểm tra thông tin id",
                }); 
            }
        }).catch(next)
     };
     update(req,res,next){
         if(req.body.emp_id ==undefined){
            res.status(404).json({
                success:false,
                message:"Vui lòng kiểm tra thông tin id danh mục",
            }); 
         }
         else{
            produce.find({tensp:(req.body.tensp).toLowerCase(),emp_id:(req.body.emp_id).toLowerCase()}).then(proc=>{
                if(proc.length != 0){
                 res.end(JSON.stringify({
                     success:false,
                     message:"sản phẩm đã tồn tại",
                 })); 
                }
                else{
                    req.body.updatedAt=Date.now();
                    if(req.body.tensp != undefined){
                      req.body.tensp=(req.body.tensp).toLowerCase();
                    }
                    else if(req.body.emp_id != undefined){
                      req.body.emp_id=(req.body.emp_id).toLowerCase();
                    }
                    produce.updateOne({_id:req.params.id},req.body,{upsert: true}).then(proc=>(res.send(JSON.stringify({
                        success:true,
                        message:"update thành công",
                    })))).catch(next);
            }
            }); 
         }
        
     };
     DELETE(req,res,next){
      produce.find({_id:req.params.id,state:1}).then(proc=>{
            if(proc.length == 0){
                res.end(JSON.stringify({
                    success:false,
                    message:"vui lòng kiểm tra thông tin",
                })); 
               }
               else{
                req.body.updatedAt=Date.now();
                produce.updateOne({_id:req.params.id,state:1},{state:0,updatedAt:req.body.updatedAt}).then(proc=>(res.send(JSON.stringify({
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
module.exports=new ProduceController;