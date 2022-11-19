const express = require("express")
const mongoose = require("mongoose")
const Employee = require("./employeeSchema")

const departmentSchema = new mongoose.Schema({
  department: { type: String, unique: true },
  HOD: String,
  // deptMembers: [{ type: mongoose.Schema.ObjectId, ref: Employee }],
})

const Department = mongoose.model("department", departmentSchema)

module.exports = Department
