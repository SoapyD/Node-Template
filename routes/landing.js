const express = require("express");
const router = express.Router();
const controllers = require('../controllers');
const middleware = require("../middleware");

// 
router.get("/", controllers.landing.getLanding);


module.exports = router;