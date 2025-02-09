const express=require("express");
const router=express.Router();
const User =require("../mongodb/User");

const middleware=require("../Middleware/Middleware");



const Connectionreq = require("../mongodb/Connectionreq");

router.use(express.json());

router.post("/:toUserId/:status",middleware,async(req,res)=>{
  const fromUserId=req.user._id
   const toUserId=req.params.toUserId;
   const status=req.params.status; 
   try{

      if(!fromUserId||!toUserId){
        return res.status(400).send("fill the required field  ")


      }
      const existreq = await Connectionreq.findOne({ toUserId, fromUserId });

      if(existreq){
        return res.status(400).send("this is not in db....");
      }
    
     if(!["ignore","interest"].includes(status)){
      return res.status(400).send("status is not correct...")  
       }
     

              const request = new Connectionreq({
              fromUserId,
              toUserId,
               status
              })
   
      await request.save();
      res.status(200).send("sendrequset succesfully");

   }
   catch(err){
      console.log("something error ",err);
      res.status(500).send("there is something error");
      
   }
              
})
router.post("/",middleware,async(req,res)=>{
  try{
    const fromUserId=req.user._id;
 const {toUserId,status}=req.body;
 if(!toUserId||!status){
  return res.status(400).send("give all required data");

 };
 if(status==="ignore"){
  return res.status(500).send("there is no change ");
 }
 
 if(!["accepted","rejected"].includes(status)){
  return res.status(400).send("status eror ....");
 }


const filtered=Connectionreq.findOne({ fromUserId, toUserId })
  .populate("fromUserId", "name")  
  .populate("toUserId", "name")
  .select("fromUserId toUserId") 
  .then(result => {
    if (!result) {
      console.log("No data found");
      return;
    }

   
    const fromUserName = result.fromUserId?.name || "Unknown";
    const toUserName = result.toUserId?.name || "Unknown";

    console.log({ fromUserName, toUserName });
   
  })
  .catch(error => console.error("Error:", error));

 
 const response=new Connectionreq({
  toUserId,
  fromUserId,
  status
 })
 filtered.status = status;
 await response.save();
res.status(200).send("it respose to the fromUserId");
 }
 catch(err){
  console.log("err",err);
  res.status(500).send("something err...")
 }



})





module.exports=router;