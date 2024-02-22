const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "index teacher" });
});

router.get("/add", (req, res) => {
  res.json({ message: "add teacher" });
});

router.get("/delete", (req, res) => {
  res.json({ message: "delete teacher" });
});

module.exports = router;
