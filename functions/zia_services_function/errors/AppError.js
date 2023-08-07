class AppError extends Error {
	statusCode = 500;

	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
	}
}

module.exports = AppError;
