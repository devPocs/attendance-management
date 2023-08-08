const express = require("express");
const admin = express();
const superAdmin = express();
const {
	addNewEmployee,
	getAllEmployees,
	getEmployee,
	editEmployee
} = require("../controllers/adminController");
const {
	createAdmin,
	editAdmin,
	deleteAdmin,
	getAdmin
} = require("../controllers/superAdminController");

const { checkNewUser } = require("../utils/validators");

admin.post("/create_new_employee", checkNewUser, addNewEmployee);
admin.get("/all_employees", getAllEmployees);
admin.get("/search_employee", getEmployee);
admin.patch("/edit_employee", editEmployee);
//router.delete("/delete", deleteEmployee)

//super_admin routes
superAdmin.post("/create_admin", createAdmin);
superAdmin.patch("/edit_admin", editAdmin);
superAdmin.delete("/delete_admin", deleteAdmin);
superAdmin.get("/get_admin", getAdmin);

module.exports = { admin, superAdmin };
