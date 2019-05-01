const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: false },
  password: { type:String},
  email: String
  //date: { type: Date, default: Date.now }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
