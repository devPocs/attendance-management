const express = require("express")
const TimeIn = require("../models/timesInSchema")
const { options } = require("../routes/departmentRoute")
const employees = require("./../models/employeeSchema")

exports.postTimeIn = async (req, res, next) => {
  //get the employee id from the request
  const employeeId = req.body.employeeId

  //find the object id with the associated employeeId
  const employee = await employees
    .findOne({ employeeId: employeeId })
    .select("_id")

  //check if the staff with the particular _id exists in the timein collection.
  //if he doesnt exist, create a new document. but if it does, update the document.
  if (employee !== null) {
    const response = await TimeIn.find({ employee: employee })
    console.log(response)
    if (response == null || response.timeIn == []) {
      await TimeIn.create({ employee: employee, timeIn: new Date() })
    } else {
      const data = await TimeIn.findOneAndUpdate({
        employee: employee,
        $push: { timeIn: new Date() },
      })
      res.status(200).send(data)
    }

    next()
  } else {
    res.status(400).send("Employee id doesn't exist")
  }
}

//see how you can make sure you check if the employee id exists
