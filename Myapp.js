const express=require("express");
const app=express();
let port=9090
app.get("/",(req,res)=>{
   console.log("this is home ")
   res.send("this is for sending ")

})
app.listen(port,()=>{
   console.log(`this is on port ${port}`)

})
