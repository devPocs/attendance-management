const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Employee = require("../models/employeeSchema");
const Admin = require("../models/adminSchema");
const nodemailer = require("nodemailer");
const catchAsync = require("../utils/catchAsync");
const { generatePassword } = require("./../utils/helperFunctions");

//have a function here to generate a random coded string,

//setup the nodemailer options. take this to the config file later.
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "pokoh.ufuoma@gmail.com",
		pass: "jzrmcikuoeaaywyk"
	}
});

exports.createAdmin = catchAsync(async (req, res, next) => {
	const employeeId = req.body.employeeId;

	//check if the employee is already an admin. if yes return that he is already an admin. if not make him an admin.

	const salt = 10;
	let password = generatePassword(5);
	console.log(password);

	//at this point send the unhashed password to the admin via mail.
	const hashedPassword = await bcrypt.hash(password, salt);

	const adminCheck = await Employee.findOne({ employeeId }).select("isAdmin");
	console.log(adminCheck);
	if (adminCheck.isAdmin === true) {
		return res.json(
			"message: employee already an admin or employee doesn't exist!"
		);
	} else {
		const newAdmin = await Employee.findOneAndUpdate(
			{ employeeId: employeeId },
			{ password: hashedPassword, isAdmin: true }
		);

		if (newAdmin) {
			console.log(password);
			// send the password to the admin's email address
			// fix this in a class.
			const mailOptions = {
				from: "pokoh.ufuoma@gmail.com",
				to: email,
				subject: "New Admin",
				text: `<h2>Hello, ${adminCheck.name},</h2>
			<p>You have been made an admin. Your password is: <h2>${password}.</h2> 
			<h3>Pls, be sure to keep this safe.</h3>
			<p>Thanks and warm regards.</p>`,

				html: `<h2>Hello, ${adminCheck.name},</h2> 
			<p>You have been made an admin. Your password is: <h2>${password}.</h2> 
			<h3>Pls, be sure to keep this safe.</h3>
			<p>Thanks and warm regards.</p>`
			};

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					res.status(500).send("Failed to send email");
				} else {
					res.status(200).json({ message: "Email sent successfully" });
				}
			});
			return res.send("success");
		}
	}
});
exports.editAdmin = catchAsync((req, res, next) => {});
exports.deleteAdmin = catchAsync((req, res, next) => {});
exports.getAdmin = catchAsync((req, res, next) => {});
