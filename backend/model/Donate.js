const mongoose = require("mongoose");

const donateSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    number: {
        type: String,
        require: true
    },
    donation: {
        type: String,
        require
    },
    message: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});


const Donate = mongoose.model("Donate", donateSchema);
module.exports = Donate;