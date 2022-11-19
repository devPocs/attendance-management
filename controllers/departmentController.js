const express = require("express")
const mongoose = require("mongoose")
const Department = require("../models/departmentSchema")
const toId = mongoose.Types.ObjectId

exports.addNewDepartment = async (req, res, next) => {
  const department = req.body.department
  const HOD = req.body.HOD

  if (department && HOD) {
    const newDepartment = await Department.create({
      department: department,
      HOD: HOD,
    })
    res.json({ newDepartment })
  }
  next()
}
