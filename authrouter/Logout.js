const express=require("express");
const router= express.Router();



 router.post("/logout",async(req,res)=>{
   res.cookie("token",null,{expires:Date.now(),httpOnly:true}).send("logout successfully");
 })
module.exports=router;