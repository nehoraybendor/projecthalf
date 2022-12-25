const mongoose = require("mongoose");

const Joi = require("joi");

const gameSchema = new mongoose.Schema({
  Game:String,
  GameLink:String,
  Year:Number,
  Genre:String,
  Dev:String,
  DevLink:String,
  Publisher:String,
  PublisherLink:String,
  Platform:String,
  PlatformLink:String
})


exports.GameModel = mongoose.model("games",gameSchema);

exports.validteGame = (reqBody) => {
  let joiSchema = Joi.object({
    Game:Joi.string().min(2).max(150).required(),
    GameLink:Joi.string().min(2).max(150).allow(null,""),
    Year:Joi.number().min(1900).max(2023).allow(null,""),
    Genre:Joi.string().min(2).max(200).required(),
    Dev:Joi.string().min(2).max(200).required(),
    DevLink:Joi.string().min(2).max(200).allow(null,""),
    Publisher:Joi.string().min(2).max(300).required(),
    PublisherLink:Joi.string().min(2).max(300).allow(null,""),
    Platform:Joi.string().min(2).max(99).required(),
    PlatformLink:Joi.string().min(2).max(99).required()
  })
  return joiSchema.validate(reqBody);
}