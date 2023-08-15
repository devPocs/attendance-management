const catchAsync = require("./../utils/catchAsync");
const Employee = require("./../models/employeeSchema");

exports.initEmployee = catchAsync(async (req, res, next) => {
  const employeeId = req.body.employeeId;

  const employee = await Employee.find({ employeeId: employeeId });

  if (employee.length === 0) {
    res.status(400).json({ success: "false", message: "employee not found" });
  } else {
    res.status(200).json({
      success: "true",
      name: employee[0].name,
      email: employee[0].email,
    });
  }
});
