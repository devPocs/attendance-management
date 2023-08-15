class ErrorHandler extends Error {
	constructor(message, errCode) {
		super(message);
		this.errCode = errCode;
		this.status = `${this.errCode}`.startsWith("4") ? "fail" : "error";
		Error.captureStackTrace(this, this.constructor);
	}
}
module.exports = ErrorHandler;
