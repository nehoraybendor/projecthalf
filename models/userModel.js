const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");


const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    gender:String,
    age:Number,
    picture:String,
    company:String,
    role:{
        type:String,
        default:"user"
    },
    date_create:{
        type:Date,
        default:Date.now()
    }
})

exports.UserModel = mongoose.model("users",userSchema);

exports.createToken = (user_id,_role) => {
    let token = jwt.sign({id:user_id,role:_role},config.tokenSecret,{expiresIn:"600mins"});
    return token;
  }

exports.validteUser = (reqBody) => {
    let joiSchema = Joi.object({
        name:Joi.string().min(2).max(150).required(),
        email:Joi.string().min(2).max(150).email().required(),
        password:Joi.string().min(5).max(150).required(),
        gender:Joi.string().min(2).max(150),
        picture:Joi.string().min(2).max(9999),
        age:Joi.number().min(0).max(120),
        company:Joi.string().min(2).max(150),
        role:Joi.string().min(2).max(150)
    })
    return joiSchema.validate(reqBody);
}
exports.validteLogin = (reqBody) => {
    let joiSchema = Joi.object({
        email:Joi.string().min(2).max(150).email().required(),
        password:Joi.string().min(5).max(150).required()
    })
    return joiSchema.validate(reqBody);
}