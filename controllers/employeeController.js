const mongoose = require("mongoose")
const Employee = require("./../models/employeeSchema")
const Department = require("./../models/departmentSchema")
const ObjectId = mongoose.Types.ObjectId

const generateEmployeeId = async (deptID) => {
  let alpha
  const result = await Department.findById(deptID).select("department")
  let dept = result.department
  if ((dept.length = 2)) {
    alpha = dept.slice(0, 2)
  } else {
    alpha = dept.slice(0, 3)
  }
  let num = Math.floor(Math.random() * 1000) + 1
  num = num.toString()
  let employeeId = alpha + "/" + num

  if ((await Employee.findOne({ empoyeeId: employeeId })) != null) {
    generateEmployeeId(deptID) // i used a reursive technique.
  } else {
    return employeeId
  }
}
//const checkEmployeeId = async()

const checkEmail = async (email) => {
  let check = await Employee.findOne({ email: email })
  var checkRes
  if (check !== null) {
    checkRes = "true"
  } else {
    checkRes = "false"
  }
  return checkRes
}

exports.addNewEmployee = async (req, res, next) => {
  const name = req.body.name
  const email = req.body.email

  let departmentID = new ObjectId(req.query.department)

  const role = req.body.role
  const gender = req.body.gender
  if (!name || !departmentID || !email || !role || !gender) {
    res.status(400).send("fill the fields properly and submit again")
  } else {
    if ((await checkEmail(email)) == "true") {
      res.status(400).send("email already exists")
    } else {
      const newEmployee = await Employee.create({
        name: name,
        email: email,
        department: departmentID,
        employeeId: await generateEmployeeId(departmentID),
        role: role,
        gender: gender,
      })

      res.status(200).send("saved successfully!")
    }
  }
  next()
}
exports.getAllEmployees = async (req, res, next) => {
  const allEmployees = await Employee.find({}).populate("department")
  res.status(200).json({ allEmployees })
}
exports.getEmployee = async (req, res, next) => {
  const employeeId = req.query.employeeId
  const employee = await Employee.find({ employeeId: employeeId })
  res.status(200).send(employee)
}
