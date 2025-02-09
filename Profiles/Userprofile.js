const express= require("express");
const router=express.Router();
const middleware = require("../Middleware/Middleware");
const User = require("../mongodb/User");
const bcrypt = require("bcrypt");

router.get("/",middleware,(req,res)=>{

   console.log(req.user);
   res.status(200).send(req.user);
});

router.patch("/",middleware,async(req,res)=>{
  const {email}=req.user;
  const { name, skill } = req.body;
  console.log(email)
  try{
const user = await User.findOne({email})
if(!user){
   return res.status(400).send("there is error...")
}


if(name){
   user.name=name;
   
}

if(skill){
   user.skill=skill;
   
}
await user.save();
res.status(200).send("successfully ");
}catch(err){
   console.log("there is some err",err);
   res.status(500).send("there is some error ....");
}

})

 router.post("/",async(req,res)=>{
   const {email,password}=req.body;
   console.log(email)
   console.log(password);
   const user = await User.findOne({email});
   try{
      if(!user){
         return res.status(400).send("there is no email ");
      }
     
         const newpassword=await bcrypt.hash(password,10);
         user.password=newpassword;
         await user.save();
         res.status(200).send({message:"succeseful forgot password "})
      
   } 
   catch(err){
      console.log("there is domething error ",err);
      res.status(500).send("there is error ....");
   }
 
})



module.exports=router













