const EventsModel = require("../models/events");
const UserModel = require("../models/users");
const BusinessModel = require("../models/businesses");
const { checkMissingParams } = require("../utils");

exports.createEvent = async (req, res, next) => {
    try {
        let { name, description, startHour, endHour, place, isWeekly, userId, businessId, openToAll, maxCapacity } = req.body;
        const requiredParams = ["name", "startHour", "endHour", "place", "userId", "businessId"];

        const missingParamsError = checkMissingParams(req, res, requiredParams);
        if (missingParamsError) {
            return missingParamsError;
        }

        const business = await BusinessModel.findById(businessId);
        if (!business) {
            return res.status(400).json({ error: "Business with id " + businessId + " was not found." });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "User with id " + userId + " was not found." });
        }

        if(!maxCapacity){
            maxCapacity = Infinity;
        }

        const event = new EventsModel({ name, description, startHour, endHour, place, isWeekly, userId, businessId, openToAll, maxCapacity, createdAt: new Date() });

        await event.save();
        return res.status(201).json({ message: "Data inserted successfully" });
    } catch (error) {
        console.error("Error adding event:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.editEvent = async (req, res, next) => {
    try {
        let { name, description, startHour, endHour, place, isWeekly, userId, businessId, openToAll, maxCapacity } = req.body;
        const { id: eventId } = req.params;
        const requiredParams = ["name", "startHour", "endHour", "place", "userId", "businessId"];

        const missingParamsError = checkMissingParams(req, res, requiredParams);
        if (missingParamsError) {
            return missingParamsError;
        }
        
        if(!maxCapacity){
            maxCapacity = Infinity;
        }

        const event = await EventsModel.findByIdAndUpdate(eventId,
            { $set: { name, description, startHour, endHour, place, isWeekly, userId, businessId, openToAll, maxCapacity } },
            { new: true, runValidators: true }
        );
        
        if (!event) {
            return res.status(400).json({ error: "Event with id " + eventId + " was not found." });
        }

        await event.save();
        return res.status(201).json({ message: "Event edited successfully" });
    } catch (error) {
        console.error("Error editing event: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteEvent = async (req, res, next ) => {
    try{
        const { id: eventId } = req.params;
        const event = await EventsModel.findByIdAndDelete(eventId);

        if (!event) {
            return res.status(400).json({ error: "Event with id " + eventId + " was not found and couldn't be deleted." });
        }
        return res.status(201).json({ message: "Event deleted successfully" });
    }catch(e){
        console.error("Error deleting event: ", e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getEventsByBusinessId = async (req, res, next) => {
    try {
        const { id, startDate, endDate } = req.query;
        const events = await EventsModel.find({
            businessId: id, startHour: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            },
            isWeekly: false,
        });
        const weekly = await getWeeklyEvents(id);

        return res.status(201).json({ events: [...events, ...weekly] });
    } catch (error) {
        console.error("Error getting event: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getWeeklyEvents = async (req, res) => {
    try {
        const { id } = req.query;
        const events = getWeeklyEvents(id)
        return res.status(201).json({ events });
    } catch (error) {
        console.error("Error getting event: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const getWeeklyEvents = async (idBusiness) => {
    const events = await EventsModel.find({
        businessId: idBusiness, isWeekly: true
    });
    return events;
}