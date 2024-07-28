const Volunteer = require("../model/Volunteer");


const volunteer = async (req, res) => {
    try {

        const { name, email, number, address, availability, skillsAndInterests } = req.body;

        if (!name) {
            throw new Error("Please provide Name of the volunteer");
        }
        if (!email) {
            throw new Error("Please provide email of the volunteer");
        }
        if (!number) {
            throw new Error("Please provide phone number of the volunteer");
        }
        if (!address) {
            throw new Error("Please provide address of the volunteer");
        }
        if (!availability) {
            throw new Error("Please provide days of availability of the volunteer");
        }
        if (!skillsAndInterests) {
            throw new Error("Please provide domain of skills and interests of the volunteer");
        }

        const payload = {
            name,
            email,
            number,
            address,
            availability,
            skillsAndInterests
        }
        const newVolunteer = new Volunteer(payload);
        const savedVolunteer = await newVolunteer.save();

        return res.status(201).json({
            message: "Your request for being a volunteer has been added successfully..",
            error: false,
            data: savedVolunteer
        });

    } catch (err) {
        return res.status(500).json({
            message: err?.message || err,
            error: true
        });
    }
}


module.exports = { volunteer };