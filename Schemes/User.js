const { Schema, model } = require("mongoose");


const userSchema = new Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token:    { type: String, default: '' },
  points:   { type: Array, default: [] }
});

const User = model("User", userSchema);

module.exports = User;