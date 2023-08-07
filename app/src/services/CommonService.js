export default class CommonService {
	isJSONString = (value) => {
		try {
			JSON.parse(value);
			return true;
		} catch (e) {
			return false;
		}
	};

	isJSON = (object) => {
		const constructor = {}.constructor;

		if (object.constructor === constructor) {
			return true;
		}

		return false;
	};

	static getInstance = () => {
		return new CommonService();
	};
}
