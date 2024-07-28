const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donateRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");


// middlewares
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: '35mb' }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '35mb',
        parameterLimit: 50000,
    }),
);
// app.use(cors({
//     origin: process.env.FRONTEND_URL,  // front end url
//     credentials: true
// }));
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
    headers: ['Content-Type', 'Authorization'] // Allow these headers
}));
app.use(cookieParser());




// routes
app.use("/api/auth", authRoutes);
app.use("/api", donationRoutes);
app.use("/api", volunteerRoutes);



const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URL).then(app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    console.log(`Database is connected successfully ...`);
})).catch((err) => {
    console.log(`Error in connecting with database ${err}`);
})