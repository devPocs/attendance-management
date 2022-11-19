const express = require("express")
const router = express.Router()
const {
  addNewEmployee,
  getAllEmployees,
  getEmployee,
} = require("./../controllers/employeeController")

router.post("/add_new_employee", addNewEmployee)
router.get("/all_employees", getAllEmployees)
router.get("/employee", getEmployee)

module.exports = router
