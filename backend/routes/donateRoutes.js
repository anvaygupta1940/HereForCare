const { donate } = require("../controllers/donateControllers");

const router = require("express").Router();



router.post("/donate", donate);


module.exports = router;