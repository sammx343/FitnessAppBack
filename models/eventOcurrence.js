const mongoose = require("mongoose");

const eventOccurence = new mongoose.Schema({
    eventId: String,
    startHour: String,
    endHour: String
});

const EventOccurence = mongoose.model("EventOcurrence", eventOccurence);

module.exports = EventOccurence;