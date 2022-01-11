const Login =require('../Model/Login')
class LoginController{
    index(req,res,next){
              Login.find({state:1}).then(login=>res.json(login)).catch(error=>(res.statusCode=404))
    }
    create(req,res,next){
       Login.find({username:req.username}).then(user=>{
           if(user.length != 0){
            res.end(JSON.stringify({
                success:false,
                message:"tên tài khoản đã tồn tại",
            })); 
           }
           else{
            const login=new Login(req);
            login.state=1;
            login.updatedAt=null;
            login.username=login.username.toLowerCase();
            login.password=login.password.toLowerCase();
            login.save();
            res.end(JSON.stringify({
             success:true,
             message:"thêm thành công",
         }));
           }
       })
    }
    DO_Login(req,res){
        console.log("ket qua:",req.body);
        Login.find({username:req.body.username,password:req.body.password,state:1}).then(user=>{
            if(user.length == 0){
                res.statusCode=404,
             res.end(JSON.stringify({
                 success:false,
                 message:"vui lòng nhập lại thông tin nhé!!!",
             })); 
            }
            else{
                res.statusCode=200,
             res.end(JSON.stringify({
              success:true,
              message:"đăng nhập thành công",
          }));
            }
        }).catch(error=>(res.statusCode=404,res.send(JSON.stringify({
            success:false,
            message:"vui lòng nhập lại thông tin nhé!!!",
        }))));
    }
    ShowId(req,res,next){
        Login.find({_id:req.params.id,state:1}).then(login=>res.json(login)).catch(error=>(res.statusCode=404,res.send(JSON.stringify({
            success:false,
            message:"vui lòng nhập lại thông tin nhé!!!",
        }))));
    };
    update(req,res,next){
        Login.find({username:(req.body.username).toLowerCase(),state:1}).then(login=>{
            if(login.length != 0){
             res.end(JSON.stringify({
                 success:false,
                 message:"tài khoản đã tồn tại",
             })); 
            }
            else{
                if(req.body.password !=undefined){
                    req.body.password=(req.body.password).toLowerCase();
                }
                else if(req.body.username!= undefined){
                    req.body.username=(req.body.username).toLowerCase();}
                req.body.updatedAt=Date.now();
                Login.updateOne({_id:req.params.id},req.body,{upsert: true}).then(login=>(res.send(JSON.stringify({
                   success:true,
                   message:"update thành công",
               })))).catch(next);
        }
        }); 
      
    
    }
    DELETE(req,res,next){
        Category.find({_id:req.params.id,state:1}).then(login=>{
            if(login.length == 0){
                res.end(JSON.stringify({
                    success:false,
                    message:"vui lòng kiểm tra thông tin",
                })); 
               }
               else{
                req.body.updatedAt=Date.now();
        Login.updateOne({_id:req.params.id,state:1},{state:0,updatedAt:req.body.updatedAt}).then(login=>(res.send(JSON.stringify({
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
module.exports=new LoginController;