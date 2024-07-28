const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    number: {
        type: String,
        unique: true,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    availability: {
        type: String,
        require: true,
    },
    skillsAndInterests: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});


const Volunteer = mongoose.model("Volunteer", volunteerSchema);
module.exports = Volunteer;
