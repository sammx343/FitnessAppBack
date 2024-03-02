const UserModel = require("../models/users");
const BusinessModel = require("../models/businesses");

exports.getTeacherBusinesses = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const businesses = await BusinessModel.find({ userId });

    if (!userId) {
      return res.status(400).json({ error: "Missing userId parameter" });
    }

    if (businesses) {
      res.status(200).json({ businesses });
    } else {
      res.status(404).json({ error: "Businesses not found" }); // Use 404 for "not found"
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};
