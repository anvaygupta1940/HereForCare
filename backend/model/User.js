const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    }
}, {
    timestamps: true
});


const User = mongoose.model("User", userSchema);
module.exports = User;