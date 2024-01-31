const express = require("express");
const mongoose = require("mongoose");
const TimeIn = require("./timesInSchema");
const Department = require("./departmentSchema");
const ErrorHandler = require("./../utils/ErrorHandler");
const bcrypt = require("bcrypt");
const catchAsync = require("./../utils/catchAsync");

let employeeIdArray = [];
const employeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String },
  department: { type: String, required: true },
  employeeId: String,
  role: String,
  gender: String,
  isAdmin: { type: Boolean, default: false },
  image: String,
  createdAt: { type: Date, default: new Date() },
});

employeeSchema.pre("validate", async function (next) {
  const checkEmail = await this.constructor.findOne({
    email: this.email,
  });

  if (checkEmail) {
    return next(new ErrorHandler("This email already exists!", 400));
  } else return next();
});

employeeSchema.pre("validate", async function (next) {
  const checkDepartment = await Department.findOne({
    department: this.department,
  });

  if (checkDepartment === null) {
    return next(new ErrorHandler("That department does not exist!", 400));
  }
});
employeeSchema.post("save", async function (doc) {
  let department = doc.department;
  department = await Department.findOne({ department: department }).select(
    "alias"
  );

  function generateNum(department) {
    let num = Math.floor(Math.random() * 9000 + 1000);
    num = num.toString();
    doc.employeeId = department.alias + "/" + num;

    if (employeeIdArray.includes(doc.employeeId)) {
      generateNum(department);
    } else {
      return doc.employeeId;
    }
  }
  generateNum(department);

  console.log(doc.employeeId);

  const employeeData = await Employee.findOneAndUpdate(
    { _id: doc._id },
    { employeeId: doc.employeeId },
    { new: true }
  );

  employeeIdArray.push(employeeData.employeeId);
  console.log(employeeIdArray);
  const timeInData = await TimeIn.create({
    employeeId: doc.employeeId,
  });
});

employeeSchema.methods.correctPassword = async function (
  enteredPassword,
  adminPassword
) {
  return bcrypt.compare(enteredPassword, adminPassword);
};

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;

//next, create the employees handler to add a new employee. this should take in an object_id
// and populate it as well so that the name of the department shows.
/****************************/

//try this!
//get the departments from the department collection. use the find method.
// store that in a variable.
//map through the variable and for each department, push it to the enum array.
