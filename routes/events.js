const express = require("express");
const router = express.Router();
const eventController = require("../controllers/events");

router.post("/", eventController.createEvent);

module.exports = router;