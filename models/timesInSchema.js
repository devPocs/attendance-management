const mongoose = require("mongoose")

const timesInSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.ObjectId, ref: "employees" },
  timeIn: [{ type: Date }],
})

const TimeIn = mongoose.model("timeInSchema", timesInSchema)
module.exports = TimeIn
