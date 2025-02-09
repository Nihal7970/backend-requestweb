const mongoose = require('mongoose');
const uri="mongodb://127.0.0.1:27017/tinder";
const connection= async()=>{
   try{
   await mongoose.connect(uri);
   console.log("data is connected ")
   }
   catch(err){
      console.log("there is some error ",err)
   }
}




const userSchema=mongoose.Schema({
   name:{
      type:String,
      max:20,
      min:2,
      reqired:true
   },
   email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true,
   },
   password:{
    type:String,
    required:true,
    unique:true,
    trim:true
   
   },
   gender:{
      type:String,
      enum:{
         values:["male","female","others"],
         message:`{VALUE} is not a valid gender`

      }
   },
   skills:{
      type:[String]
   },

   



},{timestamps:true})
connection()
const User=mongoose.model("User",userSchema)
module.exports= User;
