const express = require('express');
const morgan = require('morgan');
const app = express();
const methodOverride = require('method-override')
const db=require('./src/DB/connect');
const port = 3000;
db.connect();
const loginController=require('./src/Controller/LoginController');
const categoryController=require('./src/Controller/CategoryController');
const prodController=require('./src/Controller/ProcsController');
const checkKey=require('./src/Model/CheckMiddle');
app.use(morgan('combined'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use((req,res)=>{
  checkKey.ckeck(req,res);
});

app.get('/api/Login',async(req,res)=>{
 await loginController.index(req,res);
 
});
app.get('/api/Login/DOLogin',async(req,res)=>{
  await loginController.DO_Login(req,res);
 });
app.get('/api/Login/:id',async(req,res)=>{ 
  await loginController.ShowId(req,res);
 
});

app.post('/api/Login',async(req,res)=>{
    if(req.body.username =='' || req.body.password ==''){
        res.statusCode=404,
        res.send(JSON.stringify({
            success:false,
            Error:"NOT FOUND",
            data:"vui lòng kiểm tra thông tin"
        }))
    }
    else{
      req=req.body;
        res.statusCode=201,
       
       await loginController.create(req,res);
    }; 
});
app.delete('/api/Login/:id',async(req,res)=>{
 await loginController.DELETE(req,res);
});
app.put('/api/Login/:id',(req,res)=>{
   loginController.update(req,res);
});
///api category
app.get('/api/Category',async(req,res)=>{
  await categoryController.Get(req,res);
 });
 app.get('/api/Category/:id',async(req,res)=>{
  await categoryController.GetId(req,res);
 });
app.post('/api/Category',async(req,res)=>{
  if(req.body.masp =='' || req.body.tensp ==''){
      res.statusCode=404,
      res.send(JSON.stringify({
          success:false,
          Error:"NOT FOUND",
          data:"vui lòng kiểm tra thông tin"
      }))
  }
  else{
    req=req.body;
      res.statusCode=201,
     await categoryController.create(req,res);
  }; 
});
app.put('/api/Category/:id',(req,res)=>{
  categoryController.update(req,res);
});
app.delete('/api/Category/:id',async(req,res)=>{
  await categoryController.DELETE(req,res);
 });
 /// api procduce
 app.get('/api/Procduce',async(req,res)=>{
  await prodController.Get(req,res);
 });
 app.get('/api/Procduce/:id',async(req,res)=>{
  await prodController.GetId(req,res);
 });
app.post('/api/Procduce',async(req,res)=>{
  if(req.body.masp =='' || req.body.tensp =='',req.body.emp_id==''){
      res.statusCode=404,
      res.send(JSON.stringify({
          success:false,
          Error:"NOT FOUND",
          data:"vui lòng kiểm tra thông tin"
      }))
  }
  else{
    req=req.body;
      res.statusCode=201,
     await prodController.create(req,res);
  }; 
});
app.put('/api/Procduce/:id',(req,res)=>{
  prodController.update(req,res);
});
app.delete('/api/Procduce/:id',async(req,res)=>{
  await prodController.DELETE(req,res);
 });
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})