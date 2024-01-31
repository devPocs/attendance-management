const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { signToken } = require("./../utils/jwt");
const Employee = require("./../models/employeeSchema");
const SuperAdmin = require("./../models/superAdminSchema");

const ErrorHandler = require("./../utils/ErrorHandler");

exports.login = catchAsync(async (req, res, next) => {
  // Check if the email and password were sent from the client
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "Please fill the form with your email and password" });
  }

  // Check if the user exists
  const user = await Employee.findOne({ email: email });

  if (!user) {
    const superAdmin = await SuperAdmin.findOne({ email: email });

    // If superadmin is found, check the password
    if (
      superAdmin &&
      (await superAdmin.correctPassword(password, superAdmin.password))
    ) {
      // If password is correct, send the token back to the client
      const token = signToken(superAdmin.email);
      return res
        .status(200)
        .cookie("jwt", token, {
          secure: true,
        })
        .json({ status: "success", role: "superAdmin" });
    }
  } else if (
    user.isAdmin &&
    (await user.correctPassword(password, user.password))
  ) {
    // If user is an admin and password is correct, send the token back to the client
    const token = signToken(user.employeeId);
    return res
      .status(200)
      .cookie("jwt", token, {
        secure: true,
      })
      .json({ status: "success", role: "admin" });
  }

  // If email does not exist or password is incorrect, send an error response
  return res.status(401).json({ message: "Invalid email or password" });
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    // verify token
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // check if user (admin) still exists
      let currentAdmin;
      if (decoded.id) {
        currentAdmin = await Employee.findById(decoded.id);
      } else if (decoded.email) {
        currentAdmin = await SuperAdmin.findOne({ email: decoded.email });
      }

      if (!currentAdmin) {
        return next();
      }

      res.locals.user = currentAdmin;
      return next();
    } catch (err) {
      console.error("Error in isLoggedIn middleware:", err);
      return next();
    }
  }
  next();
};

exports.protectRoute = catchAsync(async (req, res, next) => {
  // check if a cookie exists in the request
  if (!req.cookies) {
    return res.status(401).json({ message: "Please sign in!" });
  }

  let token;
  // check if the request contains a token
  if (req.cookies.jwt === undefined) {
    return res.status(401).json({ message: "Please sign in!" });
  } else {
    token = req.cookies.jwt;
  }

  // verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("Error verifying token in protectRoute middleware:", err);
    return res.status(401).json({ message: "Something is wrong!" });
  }

  let currentAdmin;
  if (decoded.id) {
    currentAdmin = await Employee.findOne({ employeeId: decoded.id });
  } else if (decoded.email) {
    currentAdmin = await SuperAdmin.findOne({ email: decoded.email });
  }

  if (!currentAdmin) {
    return next(
      new ErrorHandler(
        "User not logged in or doesn't exist! Please log in.",
        401
      )
    );
  }

  req.admin = currentAdmin;
  next();
});
