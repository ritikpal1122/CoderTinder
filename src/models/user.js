const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        // required:true,
        // unique:true,
    },
    password:{
        type:String,
        // required:true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
    }
})

const User =  mongoose.model("User", userSchema);
module.exports = {
    User
}