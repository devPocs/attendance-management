const express = require("express");
const { postTimeIn } = require("./../controllers/timeInController");
const router = express.Router();

router.post("/", postTimeIn);

module.exports = router;
