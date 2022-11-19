const express = require("express")
const router = express.Router()
const { addNewDepartment } = require("./../controllers/departmentController")

router.post("/new_department", addNewDepartment)

module.exports = router
