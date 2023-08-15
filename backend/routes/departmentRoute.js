const express = require("express");
const router = express.Router();
const {
	addNewDepartment,
	getAllDepartments
} = require("./../controllers/departmentController");

router.post("/new_department", addNewDepartment);
router.get("/all_departments", getAllDepartments);
//router.get("/department, getDepartment)
//router.patch("/edit", editDepartment);
//router.delete("/delete", deleteDepartment);

module.exports = router;
