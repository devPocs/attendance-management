const express = require("express");
const { initEmployee } = require("./../controllers/employeeController");
const router = express.Router();

router.get("/search_employee", initEmployee);

module.exports = router;
