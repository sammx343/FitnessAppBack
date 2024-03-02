const BusinessModel = require("../models/businesses");
const { checkMissingParams } = require("../utils");

exports.getBusinessById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const business = await BusinessModel.findOne({ _id: id });

    if (business) {
      return res.status(200).json({ business });
    } else {
      return res.status(401).json({ error: "Not found" });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.getBusinesses = async (req, res, next) => {
  try {
    const businesses = await BusinessModel.find().limit(10);
    res.json({ businesses });
  } catch (e) {
    console.error("Error fetching document:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createBusiness = async (req, res, next) => {
  try {
    const { name, address, email, description, userId } = req.body;
    const params = ["name", "email", "description", "userId"];

    const missingParamsError = checkMissingParams(req, res, params);
    if (missingParamsError) {
      return missingParamsError;
    }

    const existingBusiness = await BusinessModel.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (existingBusiness) {
      return res.status(400).json({ error: "Name already in use" });
    }

    const business = new BusinessModel({
      name,
      address,
      email,
      description,
      userId,
    });

    await business.save();
    return res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error adding business:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getByu;
