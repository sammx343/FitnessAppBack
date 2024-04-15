const express = require("express");
const router = express.Router();

const studentsRoutes = require("./students");
const businessesRoutes = require("./businesses");
const teachersRoutes = require("./teachers");
const authRoutes = require("./auth");
const eventRoutes = require("./events");

router.use("/students", studentsRoutes);
router.use("/businesses", businessesRoutes);
router.use("/teachers", teachersRoutes);
router.use("/events", eventRoutes);
router.use("/auth", authRoutes);

module.exports = router;
