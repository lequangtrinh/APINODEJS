

class CheckKey{
    ckeck(req,res,next){
        var key="1234567890";
        if(key === req.query.key){
          
          return req.next();
        }
        else{
            res.status(401).json({
                success:false,
                message:"vui lòng nhập key",
            });
        }
    }
    
}
module.exports=new CheckKey;