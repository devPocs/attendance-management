//google calendar settings
//const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { google } = require("googleapis");
let CREDENTIALS = process.env.CREDENTIALS;
CREDENTIALS = JSON.parse(CREDENTIALS);

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const GOOGLE_PRIVATE_KEY = CREDENTIALS.private_key;
const GOOGLE_CLIENT_EMAIL = CREDENTIALS.client_email;
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER;
const GOOGLE_CALENDAR_ID = process.env.CALENDAR_ID;

const jwtClient = new google.auth.JWT(
	GOOGLE_CLIENT_EMAIL,
	null,
	GOOGLE_PRIVATE_KEY,
	SCOPES
);
const calendar = google.calendar({
	version: "v3",
	project: GOOGLE_PROJECT_NUMBER,
	auth: jwtClient
});

//calendar test
//1. get this into a separate file/route.
//2. use it as the primary means to create dates.
//3. check if the current day is a saturday or sunday. if yes, output "weekend" to the employee Timein table for all employees by default.
//4. also, check if the current day is a public holiday. if it is output "public holiday" to the employee Timein collection for all employees by default.
//5. if an employee doesn't sign in using the face detection, output "abs" for the specific employee.
//6. else, output the sign in time for the employee.
//7. as a tip, in the Timein schema, in the timeIn field, use a ternary operator to control from 3-6 above.

//-------think, bro. think!!

exports.myCalendar = (req, res) => {
	calendar.events.list(
		{
			calendarId: GOOGLE_CALENDAR_ID,
			timeMin: new Date().toISOString(),
			maxResults: 10,
			singleEvents: true,
			orderBy: "startTime"
		},
		(error, result) => {
			if (error) {
				res.send(JSON.stringify({ error: error }));
			} else {
				if (result.data.items.length) {
					res.send(JSON.stringify({ events: result.data.items }));
				} else {
					res.send(JSON.stringify({ message: "no upcoming events found" }));
				}
			}
		}
	);
};
