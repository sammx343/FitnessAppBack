const express = require("express");
const router = express.Router();
const TeacherController = require("../controllers/teachers");

// ../teachers/
router.get("/", (req, res) => {
  res.json({ message: "index teacher" });
});

router.get("/add", (req, res) => {
  res.json({ message: "add teacher" });
});

router.get("/delete", (req, res) => {
  res.json({ message: "delete teacher" });
});

router.get("/businesses", TeacherController.getTeacherBusinesses);

module.exports = router;
