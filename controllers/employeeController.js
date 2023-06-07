const mongoose = require("mongoose");
const Employee = require("./../models/employeeSchema");
const Department = require("./../models/departmentSchema");
const niv = require("node-input-validator");
const { generateEmployeeId } = require("./../utils/helperFunctions");
const catchAsync = require("./../utils/catchAsync");

exports.addNewEmployee = catchAsync(async (req, res, next) => {
	const { name, email, department, role, gender } = req.body;
	const newEmployee = await Employee.create({
		name: name,
		email: email,
		department: department,
		role: role,
		gender: gender
	});

	return res.status(200).json({
		message: "saved successfully!",
		status: "success",
		newEmployee
	});
});

exports.getAllEmployees = async (req, res, next) => {
	const allEmployees = await Employee.find({}).populate("department");
	res.status(200).json({ allEmployees });
};
exports.getEmployee = async (req, res, next) => {
	const employeeId = req.query.employeeId;
	const employee = await Employee.find({ employeeId: employeeId });
	res.status(200).send(employee);
};

/*exports.editEmployee = async (req, res, next) => {} //
	---this api when called should be able to edit an employees's details as well as ubdate the employee id in his time in array if neccesary
*/

/*exports.removeEmployee = async (req, res, next) => {}
	--- this api, when called should be able to remove the employee from the list of employees and remove his time in details from the time in 
	array.

*/
