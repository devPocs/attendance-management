const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { signToken } = require("./../utils/jwt");
const Employee = require("./../models/employeeSchema");

exports.login = catchAsync(async (req, res, next) => {
	// check if the email and password were sent from the client
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(401).render("error");
	}

	//check if user exists and password is correct
	const admin = await Employee.findOne({ email: email }).select("password");

	if (!admin || !(await user.correctPassword(password, admin.password))) {
		return res.status(401).render("error");
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
	let token;
	//check if the request contains a token

	if (req.cookie.jwt) {
		token = req.cookie.jwt;
	} else {
		return res.status(401).render("error", {});
	}
	//verify token
	let decoded;
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		return res.status(401).render("error", {
			title: "Error",
			message:
				"Authentication failed...pls, ensure you have a valid email/password.",
			statusCode: 401
		});
	}

	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(
			new AppError(
				"User not logged in or user doesn't exist! Pls, log in.",
				401
			)
		);
	}
	req.user = currentUser;
	next();
});
