const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");


exports.auth = (req,res,next) => {
  let token = req.header("x-api-key");
  if(!token){

    return res.status(401).json({msg:"you must send token to this endpoint"})
  }
  try{

    let decodeToken = jwt.verify(token,config.tokenSecret);
  
    req.tokenData = decodeToken

    next();
  }
  catch(err){
    return res.status(401).json({msg:"Token invalid or expired"})
  }
}


exports.iAdmin = (req,res,next) => {
  if(req.tokenData.role !== "admin"){
    res.status(401).json({msg:"your not admin"});
    next('route');
  }
  next();
}