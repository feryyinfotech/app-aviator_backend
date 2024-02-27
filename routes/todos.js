const express = require("express");
const router = express.Router();
const { aviatortest } = require("../controller/Aviator/aviator");



// aviator game api's
router.get('/testdata',aviatortest)

module.exports = router;
