const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Employee = require("../models/employeeSchema");
const SuperAdmin = require("../models/superAdminSchema");
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
    pass: "jzrmcikuoeaaywyk",
  },
});

exports.createAdmin = catchAsync(async (req, res, next) => {
  const employeeId = req.body.employeeId;

  //check if the employee is already an admin. if yes return that he is already an admin. if not make him an admin.

  const salt = 10;
  let password = generatePassword(5);

  //at this point send the unhashed password to the admin via mail.
  const hashedPassword = await bcrypt.hash(password, salt);

  const adminCheck = await Employee.findOne({ employeeId });
  if (adminCheck === null) {
    return res.status(404).json({ message: "No employee found." });
  }
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
      console.log(adminCheck);
      // send the password to the admin's email address
      // fix this in a class.
      const mailOptions = {
        from: "pokoh.ufuoma@gmail.com",
        to: adminCheck.email,
        subject: "New Admin",
        text: `<h2>Hello, ${adminCheck.name},</h2>
			<p>You have been made an admin. Your password is: <h2>${password}.</h2> 
			<h3>Pls, be sure to keep this safe.</h3>
			<p>Thanks and warm regards.</p>`,

        html: `<h2>Hello, ${adminCheck.name},</h2> 
			<p>You have been made an admin. Your password is: <h2>${password}.</h2> 
			<h3>Pls, be sure to keep this safe.</h3>
			<p>Thanks and warm regards.</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(`Failed to send email, ${error}`);
        } else {
          return res.status(200).json({ message: "Email sent successfully" });
        }
      });
    }
  }
});
exports.deleteAdmin = catchAsync(async (req, res, next) => {
  const employeeId = req.body.employeeId;
  const deleteAdmin = Employee.findOneAndUpdate(
    { employeeId: employeeId },
    { isAdmin: false }
  );
  if (deleteAdmin) {
    return res.status(200).json({ message: "Admin deleted successfully!" });
  }
});
exports.getAdmins = catchAsync(async (req, res, next) => {
  const employeeId = req.body.employeeId;
  const employees = await Employee.find({ employeeId }).select({
    isAdmin: true,
  });

  if (employees.length === 0) {
    return res.status(200).json({ message: "No admin found." });
  } else {
    return res.status(200).json({ message: employees });
  }
});

//create a super admin

//const addSuperAdmin = catchAsync(async (req, res, next) => {
//  const email = "superAdmin@gmail.com";
//  let password = "superAdmin123456";
//
//  const salt = 10;
//  const hashedPassword = await bcrypt.hash(password, salt);
//
//  const superAdmin = await SuperAdmin.create({
//    email,
//    password: hashedPassword,
//    isSuperAdmin:true
//  });
//});
//addSuperAdmin();
