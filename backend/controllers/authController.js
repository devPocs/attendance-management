const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { signToken } = require("./../utils/jwt");
const Employee = require("./../models/employeeSchema");
const SuperAdmin = require("./../models/superAdminSchema");

const ErrorHandler = require("./../utils/ErrorHandler");

exports.adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "please, fill the form with your email and password" });
  }
  const superAdmin = await SuperAdmin.findOne({ email: email });

  if (
    !superAdmin ||
    !(await superAdmin.correctPassword(password, superAdmin.password))
  ) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = signToken(superAdmin.email);

  return res
    .status(200)
    .cookie("jwt", token, {
      secure: true,
    })
    .json({ status: "success", role: "superAdmin" });
});

exports.login = catchAsync(async (req, res, next) => {
  // check if the email and password were sent from the client
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "please, fill the form with your email and password" });
  }
  // do it in a way that it will first check if it's the admin first. if not, check the supeAadmin.
  //that means, i have to embed both in one place.

  //check if user(admin) exists and password is correct
  const admin = await Employee.findOne({ email: email });
  //I think i also have to check if the  admin status is set to true.

  if (!admin || !(await admin.correctPassword(password, admin.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  //if everything is correct, send the token back to the client
  const token = signToken(admin.employeeId);

  return res
    .status(200)
    .cookie("jwt", token, {
      secure: true,
    })
    .json({ status: "success", role: "admin" });
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookie.jwt) {
    //verifytoken
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookie.jwt,
        process.env.JWT_SECRET
      );

      //check if user(admin) still exists
      const currentAdmin = await Employee.findById(decoded.employeeId);
      if (!currentAdmin) {
        currentAdmin = await SuperAdmin.findOne({ email: decoded.email });

        if (!currentAdmin) {
          return next();
        }
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
  let currentAdmin = await Employee.findOne({ employeeId: decoded.id });
  console.log(currentAdmin);
  if (!currentAdmin) {
    currentAdmin = await SuperAdmin.findOne({ email: decoded.email });
    if (!currentAdmin)
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