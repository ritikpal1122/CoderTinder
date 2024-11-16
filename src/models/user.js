const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  password: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Invalid Gender");
      }
    },
    default: "Male",
  },
  skills:{
    type: Array,
    default: []
  },
  photoUrl:{
    type: String,
    default: ""
  },
  about:{
    type: String,
    default: ""
  }

  
},
{
  timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
