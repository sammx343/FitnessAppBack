const express = require("express");
const BusinessModel = require("../models/businesses");
const router = express.Router();
const businessController = require("../controllers/businesses");

// ../businesses/
router.get("/list", businessController.getBusinesses);
router.get("/:id", businessController.getBusinessById);

router.post("/", async (req, res) => {
  try {
    const { name, address, email } = req.body;
    const params = ["name", "address", "email"];

    const missingParamsError = checkMissingParams(req, res, params);
    if (missingParamsError) {
      return missingParamsError;
    }

    const business = new BusinessModel({
      name,
      address,
      email,
    });

    const result = await business.save();
    res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error adding business:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/delete", (req, res) => {
  res.json({ message: "delete business" });
});

module.exports = router;
