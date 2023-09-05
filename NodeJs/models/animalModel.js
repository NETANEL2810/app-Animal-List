const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  name: String,
  info: String,
  img_url: String,
  date_created: {
    type: Date, default: Date.now
  },
})
exports.AnimalModel = mongoose.model("animals", schema)

exports.validateAnimal = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    info: Joi.string().min(2).max(800).required(),
    img_url: Joi.string().min(2).max(400).required(),
  })
  return joiSchema.validate(_reqBody)
}