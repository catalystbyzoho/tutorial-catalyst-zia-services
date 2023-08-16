const fs = require('fs');
const express = require('express');
const CatalystSDK = require('zcatalyst-sdk-node');

const { AppError } = require('./errors');
const { ResponsePojo } = require('./pojos');
const { ErrorHandler, FileUploadHandler } = require('./handlers');

const app = express();

app.use(express.json());

app.post(
	'/:model(pan|ocr|cheque|barcode|passbook)',
	async (request, response) => {
		const responsePojo = new ResponsePojo();
		try {
			await FileUploadHandler.getInstance(request, response, [
				{
					name: 'image',
					maxCount: 1
				}
			]).handleFileUpload();

			if (!request.files) {
				throw new AppError(400, 'image cannot be empty.');
			}

			const model = request.params.model;
			const image = request.files.image[0];

			const catalystApp = CatalystSDK.initialize(request);
			const zia = catalystApp.zia();

			const inputFileStream = fs.createReadStream(image.path);

			responsePojo.setStatusCode(200);

			if (model === 'pan') {
				await zia
					.extractOpticalCharacters(inputFileStream, {
						modelType: 'PAN'
					})
					.then((data) =>
						responsePojo.setData({
							data: {
								text: data
							}
						})
					);
			} else if (model === 'ocr') {
				await zia
					.extractOpticalCharacters(inputFileStream, {
						language: 'eng',
						modelType: 'OCR'
					})
					.then((data) => responsePojo.setData({ data }));
			} else if (model === 'cheque') {
				await zia
					.extractOpticalCharacters(inputFileStream, {
						modelType: 'CHEQUE'
					})
					.then((data) =>
						responsePojo.setData({
							data: {
								text: data
							}
						})
					);
			} else if (model === 'barcode') {
				await zia
					.scanBarcode(inputFileStream)
					.then((data) =>
						responsePojo.setData({ data: { text: data.content } })
					);
			} else {
				await zia
					.extractOpticalCharacters(inputFileStream, {
						language: 'eng',
						modelType: 'PASSBOOK'
					})
					.then((data) => responsePojo.setData({ data }));
			}
		} catch (err) {
			const { statusCode, message } =
				ErrorHandler.getInstance().handleError(err);
			responsePojo.setMessage(message);
			responsePojo.setStatusCode(statusCode);
		}
		response.status(responsePojo.getStatusCode()).send(responsePojo);
	}
);

app.post('/aadhaar', async (request, response) => {
	const responsePojo = new ResponsePojo();
	try {
		await FileUploadHandler.getInstance(request, response, [
			{
				name: 'front',
				maxCount: 1
			},
			{
				name: 'back',
				maxCount: 1
			}
		]).handleFileUpload();

		if (!request.files) {
			throw new AppError(400, 'front cannot be empty.');
		} else if (!request.files.front) {
			throw new AppError(400, 'front cannot be empty.');
		} else if (!request.files.back) {
			throw new AppError(400, 'back cannot be empty.');
		}

		const front = request.files.front[0];
		const back = request.files.back[0];

		const catalystApp = CatalystSDK.initialize(request);
		const zia = catalystApp.zia();

		responsePojo.setStatusCode(200);

		await zia
			.extractAadhaarCharacters(
				fs.createReadStream(front.path),
				fs.createReadStream(back.path),
				'eng'
			)
			.then((data) =>
				responsePojo.setData({
					data
				})
			);
	} catch (err) {
		const { statusCode, message } = ErrorHandler.getInstance().handleError(err);
		responsePojo.setMessage(message);
		responsePojo.setStatusCode(statusCode);
	}
	response.status(responsePojo.getStatusCode()).send(responsePojo);
});

app.all('*', (_request, response) => {
	response.status(404).send({
		status: 'failure',
		message: 'The requested resource could not be found on the server.'
	});
});
module.exports = app;
