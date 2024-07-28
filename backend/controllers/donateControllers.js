const Donate = require("../model/Donate");



const donate = async (req, res) => {
    try {
        const { name, address, number, donation, message } = req.body;

        if (!name) {
            throw new Error("Please provide Name of the donor");
        }
        if (!address) {
            throw new Error("Please provide address of the donor");
        }
        if (!number) {
            throw new Error("Please provide number of the donor");
        }
        if (!donation) {
            throw new Error("Please provide donation type");
        }
        if (!message) {
            throw new Error("Please provide a message to send to the world");
        }

        const payload = {
            name,
            address,
            number,
            donation,
            message
        };

        const newDonation = new Donate(payload);
        const savedDonation = await newDonation.save();


        return res.status(201).json({
            message: "Your request for donation has been added successfully..",
            error: false,
            data: savedDonation
        });



    } catch (err) {
        return res.status(500).json({
            message: err?.message,
            error: true
        })
    }
}



module.exports = { donate };