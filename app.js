const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const { google } = require("googleapis");
const mongoose = require("mongoose");
const app = express();
const departmentRoute = require("./routes/departmentRoute");
const employeeRoute = require("./routes/employeeRoute");
const timeInRoute = require("./routes/timeInRoute");
const employeeAttendanceRoute = require("./routes/employeeAttendanceRoute");
const { myCalendar } = require("./calendar");
const { initializeTimeIn } = require("./utils/helperFunctions");

dotenv.config({ path: "./config.env" });
const port = app.set("port", process.env.PORT || 4040);

mongoose.connect("mongodb://127.0.0.1:27017/AttendanceManager");

//app middlewares
app.use(morgan("dev"));
app.use(express.json());

app.use("/app/v1/departments", departmentRoute);
app.use("/app/v1/employees", employeeRoute);
app.use("/app/v1/employees/signIn", timeInRoute);
app.use("/app/v1/attendance", employeeAttendanceRoute);
app.get("/app/v1/get_event", myCalendar);

initializeTimeIn();

app.all("*", (req, res, next) => {
	const err = new Error(`Can't find ${req.originalUrl} on this server!`);
	err.errCode = 404;
	err.status = "fail!";

	next(err);
});

app.use((err, req, res, next) => {
	const errorMessage = err.message;
	const errorStatus = err.status || "INTERNAL SERVER ERROR";
	const errorCode = err.errCode || 500;
	const stack = err.stack;
	return res
		.status(errorCode)
		.json({ status: errorStatus, message: errorMessage, stack: stack });
});

app.listen(app.get("port"), () => {
	console.log(`Server is running on port ${app.get("port")}`);
});
