const express = require("express");
const admin = express();
const superAdmin = express();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Multer configuration for image uploads
const storage = multer.memoryStorage(); // Use memory storage for storing images temporarily

// Adjust the fileFilter to accept only image files
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

// Multer middleware with fileFilter
const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
}).single("image"); // Use 'image' as the field name

const { protectRoute } = require("./../controllers/authController");
const {
  addNewEmployee,
  getAllEmployees,
  getEmployee,
  editEmployee,
} = require("../controllers/adminController");
const {
  createAdmin,
  deleteAdmin,
  getAdmins,
} = require("../controllers/superAdminController");

const { login } = require("./../controllers/authController");

const { checkNewUser } = require("../utils/validators");



admin.post("/login", login);

admin.post(
  "/create_new_employee",
  upload,
  async (req, res, next) => {
    const formData = req.file; // Change this to req.file to get the file data
    console.log(formData);

    // Check if there's a file in the request
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const imageBuffer = req.file.buffer;

    // Upload image to Cloudinary
    try {
      const result = await cloudinary.uploader.upload(imageBuffer, {
        folder: "employee-images",
      });
      req.image = result.secure_url;
      next();
    } catch (error) {
      return next(error);
    }
  },
  checkNewUser,
  addNewEmployee
);
admin.get("/all_employees", protectRoute, getAllEmployees);
admin.get("/search_employee", getEmployee);
admin.patch("/edit_employee", protectRoute, editEmployee);
//router.delete("/delete", deleteEmployee)

//super_admin routes
superAdmin.post("/create_admin", createAdmin);
superAdmin.delete("/delete_admin", deleteAdmin);
superAdmin.get("/get_admin", getAdmins);

module.exports = { admin, superAdmin };
