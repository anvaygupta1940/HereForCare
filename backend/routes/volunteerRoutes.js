const { volunteer } = require("../controllers/volunteerControllers");

const router = require("express").Router();

router.post("/volunteer", volunteer)

module.exports = router;