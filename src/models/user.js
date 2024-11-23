const mongoose = require("mongoose");
const validator = require('validator'); // Importing the validator library

const userSchema = mongoose.Schema(
  {
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email Id is not valid ");
        }
      }
    },
    age: {
      type: Number,
      min: 18,
      default: 20
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
      default: "male",
    },
    skills: {
      type: Array,
      default: [],
    },
    photoUrl: {
      type: String,
      default: "",
      // validate(value) {
      //   if (!validator.isURL(value)) {
      //     throw new Error("PhotoUrl is not valid ");
      //   }
      // }
    },
    about: {
      type: String,
      default: "hi this user wants to sign up thanks ",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User ", userSchema);
module.exports = {
  User,
};