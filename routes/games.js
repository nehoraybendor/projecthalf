const express= require("express");
const { auth, iAdmin } = require("../middlewares/auth");
const { GameModel, validteGame } = require("../models/gameModel");
const router = express.Router();

router.get("/", async(req,res) => {
    let perPage = Number(req.query.perPage) || 10;
    let page = Number(req.query.page) || 1
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1;

    try{
        let data = await GameModel
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
    let validBody = validteGame(req.body);
    if(validBody.error){
        return res.status(400).json(validBody.error.details);
    }
    try{
        let game = new GameModel(req.body);
        await game.save();
        res.status(201).json(user)
    }
    catch(err){
        if(err.code == 11000){
            return res.status(401).json({msg:"Game already in system",code:11000})
        }
        console.log(err);
        res.status(500).json(err);
    }
})

router.get("/gener/:gen_name", async(req,res) => {
    let perPage = Number(req.query.perPage) || 10;
    let page = Number(req.query.page) || 1
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1;
  
    try{  
      let gen_name = req.params.gen_name;
      let data = await GameModel
      .find({Genre:gen_name})
      .limit(perPage)
      .skip((page-1) * perPage )
      .sort({[sort]:reverse})
      res.json(data); 
    }
    catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  })

router.get("/years", async(req,res) => {

    try{
      let min = req.query.min || 1990;
      let max = req.query.max ||2023;
  
      
      let data = await GameModel.find({Year:{$lte:max,$gte:min}})
      .limit(20)
      res.json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  })


  router.get("/search",async(req,res) => {
    try{
      let searchQ = req.query.s;
      
      let searchExp = new RegExp(searchQ,"i")
     
      let data = await GameModel.find({Game:searchExp})
   
      .limit(20)
      res.json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  })


router.delete("/:idDel", auth, iAdmin, async(req,res) => {
    let idDel = req.params.idDel;
    try{
    
      let data = await GameModel.deleteOne({_id:idDel,user_id:req.tokenData._id})
  
      res.json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  })

module.exports = router;