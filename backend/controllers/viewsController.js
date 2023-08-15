const catchAsync = require("../utils/catchAsync");

exports.getHomePage = catchAsync((req, res, next) => {
	res.render("home");
});
exports.getErrorPage = catchAsync((req, res, next) => {
	let response = req.query.response;
	res.render("error", { response }); // there is a possible security issue here because a user can control what pops up on the page
	//by typing whateverhe wants in the adress bar. fix that!
});
exports.adminPage = catchAsync((req, res, next) => {
	res.render("admin");
});
exports.adminCreate = catchAsync((req, res, next) => {
	res.render("createEmployee");
});
exports.adminEdit = catchAsync((req, res, next) => {
	res.render("editEmployee");
});
exports.superAdminPage = catchAsync((req, res, next) => {
	res.render("super_admin");
});
exports.login = catchAsync((req, res, next) => {
	res.render("login");
});
