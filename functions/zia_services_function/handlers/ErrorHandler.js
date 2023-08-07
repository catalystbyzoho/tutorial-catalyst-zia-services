const { AppError } = require('../errors');

class ErrorHandler {
	handleError = (err) => {
		if (err instanceof AppError) {
			return {
				statusCode: err.statusCode,
				message: err.message
			};
		} else {
			console.log('Error :::', err?.message || err);
			return {
				statusCode: 500,
				message:
					"We're unable to process your request. Kindly check logs to know more details."
			};
		}
	};
	static getInstance = () => {
		return new ErrorHandler();
	};
}
module.exports = ErrorHandler;
