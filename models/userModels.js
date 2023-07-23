const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { 
    type: String,
    required: [true, "please provide email" ]
  },
  displayName: { 
    type: String
  },
  password: { 
    type: String,
    required: [true, "please provide password"]
  }
},{timestamps: true});

//const users = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
