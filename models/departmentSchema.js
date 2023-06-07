const express = require("express");
const mongoose = require("mongoose");
//const HOD = require("./hodSchema");
const ErrorHandler = require("./../utils/ErrorHandler");

const departmentSchema = new mongoose.Schema({
	department: { type: String, unique: true, required: true },
	//HOD: { type: mongoose.Schema.ObjectId, ref: "hod", required: false },
	alias: { type: String, required: true }
	// deptMembers: [{ type: mongoose.Schema.ObjectId, ref: Employee }],
});

departmentSchema.pre("save", async function (next) {
	const checkDepartment = await this.constructor.findOne({
		department: this.department
	});

	if (checkDepartment) {
		return next(new ErrorHandler("This department already exists!", 400));
	} else return next();
});

const Department = mongoose.model("department", departmentSchema);

module.exports = Department;

//http://localhost:3000/app/v1/employees/add_new_employee?department=63756edf7b9157630058d178
