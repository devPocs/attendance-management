const express = require("express");
const router = express.Router();
const {
	addNewEmployee,
	getAllEmployees,
	getEmployee
} = require("./../controllers/employeeController");
const { checkNewUser } = require("./../utils/validators");

router.post("/add_new_employee", checkNewUser, addNewEmployee);
router.get("/all_employees", getAllEmployees);
router.get("/employee", getEmployee);
//router.patch("/edit", editEmployee)
//router.delete("/delete", deleteEmployee)

module.exports = router;
