

const jwt = require("jsonwebtoken");

const User = require("../mongodb/User");



const tokenverify = async (req, res, next) => {
  const token = req.cookies.token;
 

  if (!token) {
    return res.status(400).send("Bad request: No token");
  }

  try {
    const decoded = jwt.verify(token, "tinder24105"); 
  
    const {email} = decoded;

    const user = await User.findOne({email}); 
   

    if (!user) {
      return res.status(400).send("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("JWT Verification Error:", err.message);
    res.status(500).send("Something went wrong: Invalid token");
  }
};



module.exports = tokenverify;
