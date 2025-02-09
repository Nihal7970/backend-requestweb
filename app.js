const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const User = require("./mongodb/User");
const signup = require("./authrouter/signup");
const Login = require("./authrouter/Login");
const logout = require("./authrouter/Logout");
const profile = require("./Profiles/Userprofile");
const Connectionreq =require("./mongodb/Connectionreq");

const Fromconnection=require("./Connection/Fromconnection");

app.use(cookieParser());
app.use(express.json()); 

app.use("/api/signup", signup); 

app.use("/api/Login", Login);
app.use("/api/logout", logout);
app.use("/api/Userprofileview", profile);
app.use("/api/profileupdate",profile);
app.use("/api/forgotpassword",profile);
app.use("/api/Fromconnection",Fromconnection);
app.use("/api/toconnection",Fromconnection);


const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
