const mongoose = require("mongoose");
const catchAsync = require("./../utils/catchAsync");
const ErrorHandler = require("./../utils/ErrorHandler");
const TimeIn = require("./../models/timesInSchema");
const { options } = require("../routes/departmentRoute");
const Employee = require("./../models/employeeSchema");

const dateFNS = require("date-fns");
const { parseISO } = require("date-fns");

let timeLimit = new Date();
timeLimit.setHours(8);
timeLimit.setMinutes(0);
timeLimit.setSeconds(59);
timeLimit = dateFNS.format(timeLimit, "yyyy-MM-dd HH:mm:ss");

console.log(timeLimit);
let remark = "";

function punctualityCheck(timeIn) {
  const checkValue = dateFNS.compareAsc(
    dateFNS.parse(timeIn, "yyyy-MM-dd HH:mm:ss", new Date()),
    dateFNS.parse(timeLimit, "yyyy-MM-dd HH:mm:ss", new Date())
  );

  if (checkValue === 1) remark = "late!";
  else if (checkValue === -1) remark = "early!";
  else remark = "just in time!";
}
/*
------procedure------
1. first check if the employeeId is present in the timeIns collection. 
2. if it is present, check if the employee has already signed in for the current day. 
3. if he hasn't signed in for the current day, sign him in and send him a remark if he is early or not.
*/
exports.postTimeIn = catchAsync(async (req, res, next) => {
  const employeeId = req.body.employeeId;
  const currentDate = dateFNS.format(new Date(), "yyyy-MM-dd");

  // Check if the employee has already signed in on the current date
  const existingTimeIn = await TimeIn.findOne({
    employeeId: employeeId,
    "timeIn.0": {
      $exists: true,
    },
  });

  if (existingTimeIn) {
    // Check if there is a time entry for the current day
    const existingTimeInForToday = existingTimeIn.timeIn.some((entry) =>
      dateFNS.isSameDay(new Date(entry[0]), new Date(currentDate))
    );

    if (existingTimeInForToday) {
      return next(new ErrorHandler("Staff is already signed in!", 400));
    }
  }

  // If not signed in or no entry for today, proceed with the time in logic
  punctualityCheck(dateFNS.format(new Date(), "yyyy-MM-dd HH:mm:ss"));

  const data = await TimeIn.updateOne(
    { employeeId: employeeId },
    {
      $push: {
        timeIn: [
          dateFNS.format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          "signed-In",
          remark,
        ],
      },
    }
  );

  res.status(200).json({ message: "signed in!", remark: remark });
});
