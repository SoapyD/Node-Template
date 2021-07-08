const express = require("express");
const router = express.Router();
const controllers = require('../controllers');
const middleware = require("../middleware");

let controller_name = 'template'

//GET
router.get("/", middleware.access, controllers[controller_name].getAll);

//NEW
router.get("/new", middleware.access, controllers[controller_name].getFormCreate)

//SHOW
router.get("/:id", middleware.access, controllers[controller_name].get)

//CREATE
router.post("/", middleware.access, controllers[controller_name].create)

//EDIT
router.get("/:id/edit", middleware.access, controllers[controller_name].getEdit)

//UPDATE
router.put("/:id", middleware.access, controllers[controller_name].update)

//DESTOY
router.delete("/:id", middleware.access, controllers[controller_name].delete)

module.exports = router;