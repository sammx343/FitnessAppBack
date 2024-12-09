const express = require("express");
const router = express.Router();
const StudentsModel = require("../models/students");
const userBusinessController = require("../controllers/userBusiness");
const UserBusiness = require("../models/userBusiness");

router.get("/", async (req, res) => {
  try {
    const collection = req.db.connection.collection("students");
    const documents = await collection.find().limit(10).toArray();
    res.json({ data: documents });
  } catch (e) {
    // Handle other errors and respond with a 500 Internal Server Error
    console.error("Error fetching document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/role", async (req, res) => {
  try{
    const { userId, businessId } = req.query;
    console.log(userId, businessId);
    const role = await UserBusiness.findOne({ userId, businessId });

    console.log("Data fetched successfully:", role);
    res.status(201).json(role);
  }catch(error){
    console.error("Error fetching user role: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, address, email, cellphone } = req.body;
    const requiredFields = ["name", "address", "email", "cellphone"];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const student = new StudentsModel({
      name,
      address,
      email,
      cellphone,
    });

    const result = await student.save();
    console.log("Data inserted successfully:", result);
    res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error adding business:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/delete", (req, res) => {
  res.json({ message: "delete student" });
});

module.exports = router;
