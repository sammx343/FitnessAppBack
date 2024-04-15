const EventsModel = require("../models/events");
const { checkMissingParams } = require("../utils");

exports.createEvent = async (req, res, next) => {
    try {
        const { name, description, startHour, endHour, place, isWeekly } = req.body;
        const requiredParams = ["name", "startHour", "endHour", "place"];

        const missingParamsError = checkMissingParams(req, res, requiredParams);
        if (missingParamsError) {
            return missingParamsError;
        }

        const event = new EventsModel({ name, description, startHour, endHour, place, isWeekly });

        await event.save();
        return res.status(201).json({ message: "Data inserted successfully" });
    } catch (error) {
        console.error("Error adding event:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

};