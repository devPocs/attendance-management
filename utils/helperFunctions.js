const cron = require("node-cron");
const TimeIn = require("./../models/timesInSchema");
const dateFNS = require("date-fns");

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
