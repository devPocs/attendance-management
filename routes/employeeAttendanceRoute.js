const express = require("express");
const {
	getAllAttendance
} = require("./../controllers/employeeAttendanceController");
const router = express.Router();

router.get("/all_attendance", getAllAttendance);

module.exports = router;
