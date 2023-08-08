const express = require("express");
const jwt = require("jsonwebtoken");

exports.signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRATION
	});
};
exports.verifyToken;
