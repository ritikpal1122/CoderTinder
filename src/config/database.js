const mongoose = require('mongoose');

const connectDB  = async () => {
    await  mongoose.connect('mongodb+srv://ritikpal:ritik12@namastenode.zdkxi.mongodb.net/');
}

module.exports = connectDB;