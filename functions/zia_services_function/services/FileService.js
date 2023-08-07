const os = require('os');
const fs = require('fs');
const path = require('path');


class FileService {
	#__tmpDirectory = path.join(os.tmpdir(), 'zia-services');

	constructor() {
		if (!fs.existsSync(this.#__tmpDirectory)) {
			fs.mkdirSync(this.#__tmpDirectory, {
				recursive: true
			});
		}
	}

	getTempFilePath = (name) => {
		return path.join(this.#__tmpDirectory, name);
	};

	getTempDirectory = () => {
		return this.#__tmpDirectory;
	};

    static getInstance = ()=>{
        return new FileService();
    }
}

module.exports = FileService;
