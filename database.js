const mongoose = require("mongoose");

const connectToDatabase = async (req, res, next) => {
  try {
    const uri =
      "mongodb+srv://naitsabes29:uUMTVACphisxr01C@cluster0.dljaadi.mongodb.net/FitnessApp?retryWrites=true&w=majority";

    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    req.db = db;
    next();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    next(error);
  }
};

module.exports = connectToDatabase;
