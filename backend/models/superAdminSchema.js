const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const catchAsync = require("./../utils/catchAsync");

const superAdminSchema = new mongoose.Schema({
  name: { type: String, default: "John Doe" },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isSuperAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
});

superAdminSchema.methods.correctPassword = async function (
  enteredPassword,
  adminPassword
) {
  return bcrypt.compare(enteredPassword, adminPassword);
};

const SuperAdmin = mongoose.model("superAdmin", superAdminSchema);

module.exports = SuperAdmin;
