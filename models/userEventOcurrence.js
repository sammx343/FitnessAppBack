const mongoose = require("mongoose");

const userEvent = new mongoose.Schema({
    eventOcurrenceId: String,
    userId: String,
});

const UserEventOcurrence = mongoose.model("UserEventOcurrence", userEvent);

module.exports = UserEventOcurrence;