const mongoose = require("mongoose");

const events = new mongoose.Schema({
  name: String,
  description: String,
  startHour: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => dateValidator(value)
      ,
      message: 'Date is not valid',
    }
  },
  endHour: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => dateValidator(value)
      ,
      message: 'Date is not valid',
    }
  },
  place: String,
  isWeekly: Boolean,
  userId: String,
  businessId: String,
});

const dateValidator = (value) => {
  return value instanceof Date && !isNaN(value.getTime());
};

const Events = mongoose.model("Events", events);

module.exports = Events;
