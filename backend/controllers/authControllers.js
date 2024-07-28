const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {

        // console.log("reached");
        // console.log("data in backend>>", req?.body);


        const { email, username, password } = req.body;



        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                message: "User already exist.",
                error: true
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const payload = {
            email,
            username,
            password: hashedPassword
        };

        const newUser = new User(payload);
        const savedUser = await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            error: false,
            data: {
                _id: savedUser?._id,
                email: savedUser?.email,
                username: savedUser?.username,
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: err?.message || err,
            error: true
        })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide passowrd");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User does not exist");
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (isMatched) {
            const accessToken = jwt.sign({
                id: user._id,
                email: email
            }, process.env.JWT_SEC_KEY, { expiresIn: "1d" });

            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            }
            res.status(200).cookie("token", accessToken, tokenOption).json({
                message: "User Login successfully ...",
                error: false,
                success: true,
                data: accessToken
            })
        } else {
            throw new Error("Password does not match");
        }
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = { signup, login };