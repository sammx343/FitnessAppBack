const express = require("express");
const router = express.Router();
const { checkMissingParams } = require("../utils");

const userEventController = require("../controllers/userEvent");

const EventOcurrenceModel = require("../models/eventOcurrence");
const UserEventOcurrenceModel = require("../models/userEventOcurrence");
const EventsModel = require("../models/events");

router.post("/", async (req, res) => {
    let { userId, eventId, startDate, endDate } = req.body;
    const requiredParams = ["userId", "eventId", "startDate"];

    const missingParamsError = checkMissingParams(req, res, requiredParams);
    if (missingParamsError) {
      return missingParamsError;
    }

    let eventOcurrence = await EventOcurrenceModel.findOne({
        eventId, 
        startHour: startDate
    });

    console.log("Ya hay evento ocurrent: " + eventOcurrence);

    if(!eventOcurrence){
        eventOcurrence = await new EventOcurrenceModel({eventId, startHour: startDate, endHour: endDate }).save();
        console.log("aqui lo crea: " + eventOcurrence);
    }
    
    if(!eventOcurrence._id){
        return res.status(500).json({ error: "There's no event Ocurrence for this event and user"});
    }
    
    const userEventOcurrence = await UserEventOcurrenceModel.findOne({ userId, eventOcurrenceId: eventOcurrence._id});

    if(userEventOcurrence){
        return res.status(409).json({ error: "The user is already registered into this event"});
    } else {
        const userRegistration = await new UserEventOcurrenceModel({
            eventOcurrenceId: eventOcurrence._id,
            userId
        }).save();

        console.log("Saved newUserRegistration: " + userRegistration);
        return res.status(200).json({ message: "The user was registered succesfuly"});
    }
});

module.exports = router;