const express = require("express");
const admin = express();
const superAdmin = express();

const { protectRoute } = require("./../controllers/authController");
const {
	addNewEmployee,
	getAllEmployees,
	getEmployee,
	editEmployee
} = require("../controllers/adminController");
const {
	createAdmin,
	deleteAdmin,
	getAdmins
} = require("../controllers/superAdminController");
const { login } = require("./../controllers/authController");

const { checkNewUser } = require("../utils/validators");
admin.post("/login", login);
admin.post("/create_new_employee", protectRoute, checkNewUser, addNewEmployee);
admin.get("/all_employees", protectRoute, getAllEmployees);
admin.get("/search_employee", protectRoute, getEmployee);
admin.patch("/edit_employee", protectRoute, editEmployee);
//router.delete("/delete", deleteEmployee)

//super_admin routes
superAdmin.post("/create_admin", createAdmin);
superAdmin.delete("/delete_admin", deleteAdmin);
superAdmin.get("/get_admin", getAdmins);

module.exports = { admin, superAdmin };
