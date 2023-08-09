const mongoose = require("mongoose");
const Employee = require("../models/employeeSchema");
const Department = require("../models/departmentSchema");
const niv = require("node-input-validator");
const { generateEmployeeId } = require("../utils/helperFunctions");
const catchAsync = require("../utils/catchAsync");

exports.addNewEmployee = catchAsync(async (req, res, next) => {
	const { name, email, department, role, gender } = req.body;

	const newEmployee = await Employee.create({
		name: name,
		email: email,
		department: department,
		role: role,
		gender: gender
	});
	if (newEmployee) {
		return res.status(200).json({
			message: "saved successfully!",
			status: "success",
			newEmployee
		});
	} else {
		return res.status(400).json({ message: "unsucessful" });
	}
});

exports.getAllEmployees = async (req, res, next) => {
	const allEmployees = await Employee.find({}).populate("department");
	res.status(200).json({ allEmployees });
};

exports.getEmployee = async (req, res, next) => {
	const employeeId = req.query.employeeId;

	const employee = await Employee.find({ employeeId: employeeId });

	if (employee.length === 0) {
		res.redirect(`/error?response=${employeeId}not_found`);
	} else {
		res.render("editEmployee", { employee });
		//res.send("success");
	}
};

exports.editEmployee = async (req, res, next) => {
	const employeeID = req.body.employeeId;
	console.log(employeeID);
	console.log(req.body);

	if (!req.body.name || !req.body.email || !req.body.role || !req.body.gender) {
		return res.status(400).send("Pls, complete the form");
	} else {
		const updatedDetails = await Employee.findOneAndUpdate(
			{ employeeId: employeeID },
			{
				name: req.body.name,
				email: req.body.email,
				role: req.body.role,
				gender: req.body.gender
			},
			{
				new: true
			}
		);
		return res.status(200).send("edited");
		//res.status(200).render("editEmployee", updatedDetails);
		next();
	}
};

/*exports.removeEmployee = async (req, res, next) => {}
	--- this api, when called should be able to remove the employee from the list of employees and remove his time in details from the time in 
	array.

*/
