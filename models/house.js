const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = new Schema({
  address: { type: String, required: true },
  county: { type:String},
  building_type: String,
  finished_size: Number,
  year_built: Number,
  email:String,
  school:String,
  price:Number
  //date: { type: Date, default: Date.now }
});
const House = mongoose.model("House", houseSchema);

module.exports = House;
