const niv = require("node-input-validator");

exports.checkNewUser = (req, res, next) => {
	const validation = new niv.Validator(req.body, {
		name: "required|string",
		email: "required|email",
		department: "required|string",
		role: "required|string",
		gender: "required|string"
	});
	console.log(req.body);
	validation.check().then(
		catchAsync(async (matched) => {
			if (!matched) {
				return res
					.status(400)
					.json({ status: "fail", error: validation.errors });
			} else {
				next();
			}
		})
	);
};
