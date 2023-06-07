const mongoose = require("mongoose");
const Employee = require("./employeeSchema");
const dateFNS = require("date-fns");
const cron = require("node-cron");

const timesInSchema = new mongoose.Schema({
	employeeId: String,
	timeIn: [
		{
			type: [{ type: mongoose.Schema.Types.Mixed }]
		}
	]
});

const TimeIn = mongoose.model("timein", timesInSchema);
module.exports = TimeIn;

timesInSchema.statics.setDefault = () => {};
