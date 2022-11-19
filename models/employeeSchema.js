const express = require("express")
const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  department: { type: mongoose.Schema.ObjectId, ref: "department" },
  employeeId: { type: String, unique: true, required: true },
  role: { type: String, required: true },
  gender: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
})

const Employee = mongoose.model("employees", employeeSchema)

module.exports = Employee

//next, create the employees handler to add a new employee. this should take in an object_id
// and populate it as well so that the name of the department shows.
