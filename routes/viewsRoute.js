const express = require("express");
const { isLoggedIn, protectRoute } = require("./../controllers/authController");
const router = express.Router();
const {
	login,
	getHomePage,
	getErrorPage,
	adminPage,
	adminCreate,
	adminEdit,
	superAdminPage
} = require("../controllers/viewsController");
const { initEmployee } = require("./../controllers/employeeController");
const { getEmployee } = require("./../controllers/adminController");

//router.use(["/admin", "/superAdmin"], isLoggedIn);

router.get("/", getHomePage);
router.get("/login", login);
router.get("/check_employee", getEmployee);
router.get("/init_employee", initEmployee);
router.get("/error", getErrorPage);
router.get("/admin", protectRoute, adminPage);
router.get("/admin/create_new_employee", protectRoute, adminCreate);
router.get("/admin/edit_employee", protectRoute, adminEdit);
router.get("/superAdmin", protectRoute, superAdminPage);

module.exports = router;
