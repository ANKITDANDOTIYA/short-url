const mongoose = require('mongoose');

// User Schema...Structure of user that will be stored in the mongoDB
const userSchema = new mongoose.Schema({
    name : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    role: {
        type: String,
        required: true,
        default: "NORMAL"
    }
},{timestamps: true});

const User = mongoose.model('user', userSchema);

module.exports = User;