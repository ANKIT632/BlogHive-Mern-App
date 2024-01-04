import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';

//schema
import User from './Schema/User.js';
import { nanoid } from 'nanoid';

const server=express();
let PORT=3000;


// mongoose.connect(process.env.DB_URL,{
//     autoIndex:true
// });

mongoose.connect("mongodb://0.0.0.0:27017/mernBlogHive",{
  autoIndex:true
});

server.use(express.json());

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password



  // servive
   const generateUserName=async(email)=>{
    let username =email.split("@")[0];

    let isUserExist=await User.exists({"personal_info.username": username}).then((result)=>result).catch((err)=>{console.log(err)});
    console.log(isUserExist);

    isUserExist ? username+=nanoid().substring(0,6):"";

    return username;
   }


server.post('/signup',(req,res)=>{

let {fullname,email,password}=req.body;

 if(fullname.length<3){
    return res.status(403).json({"error":"Fullname must be at least 3  letter long"});
 }

  if(!email.length){
     return res.status(403).json({"error":"Enter email"});
  }

  if(!emailRegex.test(email)){ 
    return res.status(403).json({"error":"Email is invalid"});
  }

  if(!passwordRegex.test(password)){
    return res.status(403).json({"error":"Password should be 6 to 20 characters long with a numeric , 1 lowercase and 1 uppercase"});
  }

 
  bcrypt.hash(password,10,async(err,hashed_Password)=>{
   
   let username= await generateUserName(email);

  let user =new User({
    personal_info:{fullname,email,password:hashed_Password,username}
  });

  user.save().then((user)=>{
    return res.status(200).json({"success":user+ "save created successfully"});
  }).catch((err)=>{
    if(err.code===11000){
      return res.status(500).json({"error":"Email is already exist"});
    }
    return res.status(403).json({"error":err.message});
  });

});

});


 

server.post('/signin',(req,res)=>{
    console.log(req.body);
    res.json(req.body);
})

server.listen(PORT,()=>{ 
    console.log('listening on port '+PORT);
});