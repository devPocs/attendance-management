const cron = require("node-cron");
const TimeIn = require("./../models/timesInSchema");
const dateFNS = require("date-fns");
const crypto = require("crypto");

exports.initializeTimeIn = () => {
	return cron.schedule("15 06 *  * *", async () => {
		await TimeIn.updateMany(
			{},
			{
				$push: [
					{ timeIn: `${dateFNS.format(new Date(), "yyyy-MM-dd")}, absent` }
				]
			}
		);
	});
};

exports.generatePassword = function (length) {
	const characters =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$%&";
	const randomBytes = crypto.randomBytes(length);
	let password = "";

	for (let i = 0; i < length; i++) {
		const byte = randomBytes[i] % characters.length;
		password += characters.charAt(byte);
	}

	return password;
};
