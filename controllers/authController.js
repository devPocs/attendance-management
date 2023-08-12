const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { signToken } = require("./../utils/jwt");
const Employee = require("./../models/employeeSchema");
const ErrorHandler = require("./../utils/ErrorHandler");

exports.login = catchAsync(async (req, res, next) => {
	// check if the email and password were sent from the client
	const { email, password } = req.body;
	if (!email || !password) {
		return res
			.status(401)
			.json({ message: "please, fill the form with your email and password" });
	}

	//check if user exists and password is correct
	const admin = await Employee.findOne({ email: email });

	if (!admin || !(await admin.correctPassword(password, admin.password))) {
		return res.status(401).json({ message: "Invalid email or password" });
	}
	//if everything is correct, send the token back to the client
	const token = signToken(admin.employeeId);

	return res
		.status(200)
		.cookie("jwt", token, {
			secure: true
		})
		.json({ status: "success" });
});

exports.isLoggedIn = async (req, res, next) => {
	if (req.cookie.jwt) {
		//verifytoken
		try {
			const decoded = await promisify(jwt.verify)(
				req.cookie.jwt,
				process.env.JWT_SECRET
			);

			//check if user still exists
			const currentAdmin = await Employee.findById(decoded.employeeID);
			if (!currentAdmin) {
				return next();
			}
			res.locals.user = currentAdmin;
			return next();
		} catch (err) {
			return next();
		}
	}
	next();
};

exports.protectRoute = catchAsync(async (req, res, next) => {
	//check if a cookie exists in the request.
	console.log("banku");
	console.log(req.cookies.jwt);
	if (!req.cookies) {
		return res.status(404).json({ message: "pls, sign in!" });
	}
	let token;
	//check if the request contains a token

	if (req.cookies.jwt === undefined) {
		return res.status(401).json({ message: "pls, sign in!" });
	} else {
		token = req.cookies.jwt;
	}
	//verify token
	let decoded;
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		return res.status(401).json({ message: "something is wrong!" });
	}
	console.log(decoded);
	const currentAdmin = await Employee.findOne({ employyeId: decoded.id });
	console.log(currentAdmin);
	if (!currentAdmin) {
		return next(
			new ErrorHandler(
				"User not logged in or user doesn't exist! Pls, log in.",
				401
			)
		);
	}
	req.admin = currentAdmin;
	next();
});
exports.protected = catchAsync(async (req, res, next) => {
	// Retrieve the user ID from the cookie
	const adminId = req.cookies.adminId;

	if (!adminId) {
		res.redirect("/admin/login");
		return;
	}
	// Find the authenticated user by ID

	if (adminId !== Admin[0].id) {
		res.render("error");
	} else {
		return next();
	}
});
