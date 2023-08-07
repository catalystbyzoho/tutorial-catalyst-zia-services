class ResponsePojo {
	#data;
	#message;
	#statusCode;

	constructor() {
		this.#data = {};
		this.#message = '';
		this.#statusCode = 200;
	}

	setData = (data) => {
		this.#data = data;
	};

	getData = () => {
		return this.#data;
	};

	setMessage = (message) => {
		this.#message = message;
	};

	getMessage = () => {
		return this.#message;
	};

	setStatusCode = (statusCode) => {
		this.#statusCode = statusCode;
	};

	getStatusCode = () => {
		return this.#statusCode;
	};

	toJSON = () => {
		if (this.#message) {
			return {
				status: 'failure',
				message: this.#message
			};
		} else {
			return {
				status: 'success',
				...this.#data
			};
		}
	};
}

module.exports = ResponsePojo;
