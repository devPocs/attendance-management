const catchAsync = require("./../utils/catchAsync");
const Employee = require("./../models/employeeSchema");

exports.initEmployee = catchAsync(async (req, res, next) => {
	const employeeId = req.query.employeeId;

	const employee = await Employee.find({ employeeId: employeeId });

	if (employee.length === 0) {
		res.redirect(`/error?response=${employeeId}not_found`);
	} else {
		res.render("employee", { employee: employee });
	}
});
