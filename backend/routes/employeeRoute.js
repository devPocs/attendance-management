const express = require("express");
const { initEmployee } = require("./../controllers/employeeController");
const router = express.Router();

router.post("/search_employee", initEmployee);

module.exports = router;
