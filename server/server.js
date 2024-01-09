import express, { json } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import  jwt from 'jsonwebtoken';
import cors from 'cors'; // receive data from any where(any port);
//schema
import User from './Schema/User.js';
import { nanoid } from 'nanoid';
import admin from 'firebase-admin';
import ServiceAccountKey from './bloghive-f8d94-firebase-adminsdk-8r8oc-c9aecb1240.json' assert{"type":"json"};
import {getAuth} from 'firebase-admin/auth'


const server=express();
let PORT=3000;

admin.initializeApp({
  credential:admin.credential.cert(ServiceAccountKey)
})

// mongoose.connect(process.env.DB_URL,{
//     autoIndex:true
// });

mongoose.connect("mongodb://0.0.0.0:27017/mernBlogHive",{
  autoIndex:true
});

server.use(express.json());

server.use(cors());

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

const formatDataSend=(user)=>{
  const access_token=jwt.sign({id:user._id},process.env.SECRET_ACCESS_KEY);

   return {
    access_token,
     profile_img:user.personal_info.profile_img,
     username:user.personal_info.username,
     fullname:user.personal_info.fullname
   }
}



server.post('/signup',(req,res)=>{

let {fullname,email,password}=req.body;


 if(!fullname || fullname.length<3){
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

  user.save().then((userData)=>{
    return res.status(200).json(formatDataSend(userData));
  }).catch((err)=>{
    if(err.code===11000){
      return res.status(500).json({"error":"Email is already exist"});
    }
    return res.status(403).json({"error":err.message});
  });

});

});


 
server.post('/signin', async(req,res)=>{
  let {email,password} = req.body;

  await User.findOne({"personal_info.email":email})
   .then((user)=>{
      if(!user){
        return res.status(403).json({'error':"Email not found"});
      }

      if(user.google_auth){
        return res.status(403).json({"error":"This email was sign-Up with google. please log in with google !!"});
      }

       bcrypt.compare(password, user.personal_info.password, (err,result) => {
        
          if(err){
            return res.status(403).json({"error":"Error occur while login try again"});
          }
        

          if(!result){
              return res.status(403).json({"error":"Incorrect password"});
          } 

          else{
            return res.status(200).json(formatDataSend(user));
          }
          
      });

   })
   .catch(err=>{
    return res.status(500).json({"error":err.message});
   })
 
});



// google auth route
server.post('/google-auth',async(req,res)=>{
  let {access_token}=req.body;
   
  getAuth()
  .verifyIdToken(access_token).then(async(user)=>{
         let{email,name,picture}=user;
        
         // get higth resolution pic
         picture=picture.replace('s96-c','s384-c');

         let  userData=await User.findOne({"personal_info.email":email}).select("personal_info.fullname personal_info.username personal_info.profile_img google_auth")
         .then((u)=>{ 
          return u || null;
         })
         .catch(err=>{
          return res.status(500).json({'error':err.message});
         })

      
          // if user alredy login without google_Auth
          if(userData && !userData.google_auth){
                  return res.status(403).json({"error":"This email was sign-Up without google. please log in with password to access the account"});
          }
        

          else{
               
            let username = await generateUserName(email);

            userData= new User({personal_info:{fullname:name,email,profile_img:picture,username}
              , google_auth:true
            });
            
            await userData.save().then((u)=>{
              userData=u;
            })
            .catch(err=>{
              return res.status(500).json({"error":err.message});
            })
          }
          console.log(" UserLoginData ",userData);
          return res.status(200).json(formatDataSend(userData));

         

  }).catch(err=>{

    return res.status(500).json({'error':"failed to authrntication ,try with some other account"});
  })
});



 
server.listen(PORT,()=>{ 
    console.log('listening on port '+PORT);
});  