const express = require("express");
const router = express.Router();
const eventController = require("../controllers/events");

router.post("/", eventController.createEvent);
router.get("/list", eventController.getEventsByBusinessId);

module.exports = router;