const EventsModel = require("../models/events");
const UserModel = require("../models/users");
const BusinessModel = require("../models/businesses");
const { checkMissingParams } = require("../utils");

exports.createEvent = async (req, res, next) => {
    try {
        const { name, description, startHour, endHour, place, isWeekly, userId, businessId } = req.body;
        const requiredParams = ["name", "startHour", "endHour", "place", "userId", "businessId"];

        const missingParamsError = checkMissingParams(req, res, requiredParams);
        if (missingParamsError) {
            return missingParamsError;
        }

        const business = await BusinessModel.findById(businessId);
        if(!business){
            return res.status(400).json({ error: "Business with id " + businessId + " was not found." });
        }
        
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(400).json({ error: "User with id " + userId + " was not found." });
        }

        const event = new EventsModel({ name, description, startHour, endHour, place, isWeekly, userId, businessId});

        await event.save();
        return res.status(201).json({ message: "Data inserted successfully" });
    } catch (error) {
        console.error("Error adding event:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

};