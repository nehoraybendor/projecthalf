const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel, validteUser, validteLogin, createToken } = require("../models/userModel");
const { auth, iAdmin } = require("../middlewares/auth");
const router = express.Router();



router.get("/",auth,iAdmin,async(req,res) => {
    let perPage = Number(req.query.perPage) || 10;
    let page = Number(req.query.page) || 1
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1;

    try{
        let data = await UserModel
        .find({})
        .limit(perPage)
        .skip((page-1) * perPage)
        .sort({[sort]:reverse})
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

router.post("/", async(req,res) => {
    let validBody = validteUser(req.body);
    if(validBody.error){
        return res.status(400).json(validBody.error.details);
    }
    try{
        let user = new UserModel(req.body);
        user.password = await bcrypt.hash(user.password ,10);
        await user.save();

        user.password ="*****";
        res.status(201).json(user)
    }
    catch(err){
        if(err.code == 11000){
            return res.status(401).json({msg:"Email already in system, try log in",code:11000})
        }
        console.log(err);
        res.status(500).json(err);
    }
})

router.post("/login",async(req,res) => {    
    let validBody = validteLogin(req.body);
    if(validBody.error){
        return res.status(400).json(validBody.error.details);
    }
    try{
        let user = await UserModel.findOne({email:req.body.email})
        if(!user){
            return res.status(401).json({msg:"User or password not match , code:1"})
        }
        let passwordValid = await bcrypt.compare(req.body.password,user.password)
        if(!passwordValid){
            return res.status(401).json({msg:"User or Password not match , code:2"})
        }
        
        let ntoken = createToken(user.id,user.role);
        res.json({token:ntoken});
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

router.patch("/test", auth, iAdmin, async(req, res) => {
    let target = req.query.target;
    if (!target) {
      return res.status(401).json({
        msg: 'query "target" is empty or invalid please provide target for update'
      })
    }
    try {
      let data = req.body;
     
      let updatedUser =  await UserModel.findOneAndUpdate({ _id: target }, data)
      res.status(200).json({ msg: updatedUser })
  
    } catch (error) {
      res.status(400).json({ error: error });
    }
  
  })

module.exports = router;