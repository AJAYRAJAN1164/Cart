const express=require('express');
const router =express.Router();
const User=require('../models/user');
const jwt =require('jsonwebtoken');
const Products=require('../models/products');
var objectId = require("mongodb").ObjectID;


const admin={
    id:65874, 
    email:"admin@gmail.com",
    password:123456,
    role:'admin'
}


function verifyToken(req,res,next){
    if(!req.headers.Authorization){
        return res.status(401).send('Unauthorized request')  
    }
    let token =req.headers.Authorization.split('')[1]

    if(token==='null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload=jwt.verify(token,'secretKey')
    
    
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId=payload.subject
    next() 
}


router.get('/',verifyToken,(req,res)=>{
res.send('From Api Route')
})

router.post('/register',(req,res)=>{
let userData=req.body
let user= new User(userData)
user.save((err,registeredUser)=>{
        if(err){
            console.log(err)
        }else{
            let payload={subject:registeredUser._id}
            Role=registeredUser.userType
           
            let token = jwt.sign(payload,'secretKey');
            res.status(200).send( {token,Role})
        }
});
 
})

router.post('/login',async (req,res)=>{
   
   
    let userData =req.body
    
    if(userData.email==admin.email&&userData.password==admin.password){
        let payload = {subject:admin.id}
       userDetails={
           Role:admin.role
       }
        let token=jwt.sign(payload,'secretKey')
        res.status(200).json({token,userDetails})
    }

     const user= await User.findOne({email:userData.email})
        if(!user){   
            return res.status(400).send("User not found");
        }
      else if (user.password !==userData.password){
       return res.status(400).send("Invalid Password");
      }
      else{ 
        let payload={subject:user._id} 
       userDetails={
        _id:user._id,
        Role:user.userType,
        name:user.name,
        userName:user.userName,
        phoneNo:user.phoneNo,
        email:user.email,   

       }
        let token=jwt.sign(payload,'secretKey')    
        res.status(200).json({token,userDetails})
      
         
      }
        


    })

    router.post('/add-products',(req,res)=>{
        let body=req.body
        var detailsone = new Products(body)
        
        detailsone.save((err,data)=>{ 
        if (err)
        res.send(err)
        else
        res.send({status:200,message:"user added sucessfully",Studobj:data})
        })
        })




router.get('/list-products',(req,res)=>{
    Products.find((err,data)=>{
        if(err)
        res.status(401)(err)
        else
        res.status(200).send(data);
    }) 
   
})




router.get('/edit-products/:id',(req,res)=>{
    
    Products.findOne({_id:req.params.id},(err,data)=>{
        if(err)
        res.send(err)
        else
        res.status(200).send(data)
        
})
})

router.delete('/delete-products/:id',(req,res)=>{
    const id=req.params.id  
     Products.findByIdAndDelete(id,(err,data)=>{
     if(err)
     res.send(err)
     else 
     res.status(200).send(data)
    })
    })

    router.put('/edit-products/:id',(req,res)=>{
        const id=req.params.id 
         Products.findByIdAndUpdate(id,{
            $set: {
              name: req.body.name,
              description:req.body.description,
              price:req.body.price,
              category: req.body.category,
            }
          },(err,data)=>{
         if(err)
         res.send(err)
         else
         res.status(200).send(data)
        })
        })

   router.get('/get-users/:id',async (req,res)=>{
        const id=req.params.id
       
        await User.findOne({_id:objectId(id)},(err,data)=>{
            if(err)
            res.send(err)
            else 
            res.status(200).send(data)
            console.log('data2'+data)
            
    })
    })  

    router.put('/edit-users/:id',async (req,res)=>{
        const id=req.params.id 
         await User.findByIdAndUpdate(id,{
            $set: {
              name: req.body.name,
              userName:req.body.userName,
              phoneNo:req.body.phoneNo,
              email: req.body.email,
            }
          },(err,data)=>{
         if(err)
         res.send(err)
         else
         res.status(200).json({data})
         console.log("server data is "+data)
        })
        })

  

module.exports=router;