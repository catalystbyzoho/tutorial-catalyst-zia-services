const path = require('path');
const multer = require('multer');

const { AppError } = require('../errors');
const AppConstants = require('../constants');
const { FileService } = require('../services');

class FileUploadHandler {
	#__fields = {};
	#__request = null;
	#__response = null;

	constructor(request, response, fields) {
		this.#__fields = fields;
		this.#__request = request;
		this.#__response = response;
	}

	handleFileUpload = () => {
		const storage = multer.diskStorage({
			destination: FileService.getInstance().getTempDirectory(),
			filename: function (__request, file, cb) {
				cb(null, Date.now() + path.extname(file.originalname));
			}
		});
		const upload = multer({
			storage,
			limits: {
				fileSize: AppConstants.MaxFileSize
			},
			fileFilter: (__request, file, cb) => {
				if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
					cb(
						new AppError(
							400,
							`${file.fieldname} must be a one of the following formats: jpg,jpeg or png file.`
						)
					);
				} else {
					cb(null, true);
				}
			}
		}).fields(this.#__fields);

		return new Promise((resolve, reject) => {
			upload(this.#__request, this.#__response, (err) => {
				if (err) {
					if (err instanceof multer.MulterError) {
						if (err.code === 'LIMIT_FILE_COUNT') {
							reject(
								new AppError(400, `${err.field} can contain a single file.`)
							);
						} else if (err.code === 'LIMIT_FILE_SIZE') {
							reject(
								new AppError(400, `${err.field} size should not exceed 10 MB.`)
							);
						} else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
							reject(
								new AppError(
									400,
									'file must be named with one of the following values: ' +
										this.#__fields.map((field) => field.name)
								)
							);
						} else {
							reject(err);
						}
					} else {
						reject(err);
					}
				} else {
					resolve('');
				}
			});
		});
	};

	static getInstance = (request, response, fields) => {
		return new FileUploadHandler(request, response, fields);
	};
}
module.exports = FileUploadHandler;
