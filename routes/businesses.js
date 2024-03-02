const express = require("express");
const BusinessModel = require("../models/businesses");
const router = express.Router();
const businessController = require("../controllers/businesses");

// ../businesses/
router.get("/list", businessController.getBusinesses);
router.get("/:id", businessController.getBusinessById);
router.post("/", businessController.createBusiness);

router.get("/delete", (req, res) => {
  res.json({ message: "delete business" });
});

module.exports = router;
