const mongoose = require("mongoose");

const User= require("../mongodb/User");
const connections = async () => {
  const connecturi = "mongodb://127.0.0.1:27017/tinder";  
  try{
    await mongoose.connect(connecturi);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error: ", err);
  }
};

const connectionrequestSchema = mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    enum: {
      values: ["ignore", "interest", "accepted", "rejected"],
      message: "{VALUE} is not a valid status"
    }
  }
}, { timestamps: true });

connections(); 

const Connectionreq = mongoose.model("Connectionreq", connectionrequestSchema);

module.exports = Connectionreq;
