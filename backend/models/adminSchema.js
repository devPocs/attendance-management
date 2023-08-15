const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true, required: true },
	password: { type: String, unique: true, required: true },
	department: String,
	employeeId: String,
	role: { type: String, default: "admin" }
});

const Admin = new mongoose.model("admin", adminSchema);

module.exports = Admin;

//the super admin should query the employee database by name or email or by employee id. once the employee pops up, it should
//populate the neccessary field, all he just needs to do is autogenerate a password for him click on a button to make him admin.
