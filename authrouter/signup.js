const express=require("express")
const router = express.Router();
const User = require("../mongodb/User"); 
const bcrypt = require("bcrypt");




router.post("/", async (req, res) => {
   try {
      

       const { name, email, password, skill } = req.body;
       if (!name || !email || !password) {
           console.log("Missing required fields");
           return res.status(400).send("Fill the required field");
       }

       const user = await User.findOne({ email });
       if (user) {
           
           return res.status(400).send("User already exists");
       }

       const hashpassword = await bcrypt.hash(password, 10);
       

       const newuser = new User({ name, email, password: hashpassword, skill });
       await newuser.save();

      
       res.status(200).send("Signup successfully");
   } catch (err) {
       console.error("Error in signup route:", err);
       res.status(500).send("Something went wrong...");
   }
});
module.exports=router;