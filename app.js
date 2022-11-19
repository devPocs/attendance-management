const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const path = require("path")
const mongoose = require("mongoose")
const app = express()
const departmentRoute = require("./routes/departmentRoute")
const employeeRoute = require("./routes/employeeRoute")

dotenv.config({ path: "./config.env" })
const port = app.set("port", process.env.PORT || 4040)

mongoose.connect("mongodb://localhost:27017/AttendanceManager", (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("database is up and running")
  }
})

//app middlewares
app.use(morgan("dev"))
app.use(express.json())

app.use("/app/v1/departments", departmentRoute)
app.use("/app/v1/employees", employeeRoute)

app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`)
})
