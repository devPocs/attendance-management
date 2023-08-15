const express = require("express");
const mongoose = require("mongoose");
const Department = require("./../models/departmentSchema");
const catchAsync = require("./../utils/catchAsync");
const ErrorHandler = require("./../utils/ErrorHandler");

exports.addNewDepartment = catchAsync(async (req, res, next) => {
	const department = req.body.department;
	const HOD = req.body.HOD;
	const alias = req.body.alias;

	if (department) {
		const newDepartment = await Department.create({
			department,
			HOD,
			alias
		});

		return res.json({ newDepartment });
	}
	next();
});

exports.getAllDepartments = catchAsync(async (req, res, next) => {
	const allDepartments = await Department.find({});

	res.status(200).json({ status: "success", allDepartments });
});

//exports.editDepartment = catchAsync(async (req, res, next) => {}
//exports.deleteDepartment = catchAsync(async (req, res, next) => {}
