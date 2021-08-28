const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username:  {
    type: String,
    require: [true, "Ususario deve ter username"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Usuario deve ter uma senha"]
  }
})

const User = mongoose.model("User", userSchema)

module.exports = User;
