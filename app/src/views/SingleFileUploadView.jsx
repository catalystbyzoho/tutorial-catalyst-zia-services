import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useForm } from '../hooks';
import { AppConstants } from '../constants';
import { AxiosInstance } from '../instances';

import { CommonService, ToastService } from '../services';
import { PrimaryButton, PrimaryButtonWithLoader } from '../components/Buttons';

const initialValues = {
	image: null
};

const SingleFileUploadView = ({ model }) => {
	const ref = useRef();
	const [output, setOutput] = useState({
		text: '',
		confidence: ''
	});
	const {
		values,
		errors,
		setError,
		isProcessing,
		onInputChange,
		setMultipleValues,
		updateProcessing
	} = useForm(initialValues);

	useEffect(() => {
		setOutput({
			text: '',
			confidence: ''
		});
		setMultipleValues({ ...initialValues });

		ref.current.value = '';
	}, [model, setMultipleValues]);

	const clearOutput = useCallback(() => {
		setOutput();
	}, []);

	const processImage = useCallback(() => {
		if (!values.image) {
			setError('image', 'Image cannot be empty.');
			return;
		}
		if (values.image.size > AppConstants.MaxFileSize) {
			setError('image', 'Image size must be less than 10MB.');
			return;
		}

		updateProcessing(true);

		const formData = new FormData();
		formData.append('image', values.image);

		AxiosInstance.post(`/${model}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.then((response) => {
				setOutput(response.data.data);
			})
			.catch((err) => {
				const message = err.response?.data?.message;
				ToastService.getInstance(message).makeErrorToast();
			})
			.finally(() => {
				updateProcessing(false);
			});
	}, [model, setError, updateProcessing, values.image]);

	return (
		<>
			<div className='w-2/5 border-r border-gray-200 p-10'>
				<h6 className='mb-2.5 text-xl font-bold text-gray-900'>Input</h6>
				<div className='mb-5'>
					<p className='text-gray-800 text-[15px] font-normal mb-1'>
						Image to be processed
					</p>
					<input
						type='file'
						name='image'
						ref={ref}
						className={classNames(
							'p-1 border rounded-md text-sm w-full mb-0.5',
							errors.image ? ' border-red-600' : 'border-gray-200'
						)}
						accept='image/*'
						onChange={onInputChange}
					/>
					<p className='text-red-600 text-[13px]'>{errors.image}</p>
				</div>
				<div className='flex justify-center'>
					<PrimaryButtonWithLoader
						label='Process Image'
						onClick={processImage}
						isLoading={isProcessing}
					/>
				</div>
			</div>
			<div className='w-3/5 p-10'>
				<h6 className='mb-2.5 text-xl font-bold text-gray-900'>Output</h6>
				<p className='mb-2.5 text-[15px] font-bold text-gray-900'>Confidence</p>
				<p className='mb-2.5 text-sm'>{output?.confidence || 'NA'}</p>
				<p className='mb-2.5 text-[15px] font-bold text-gray-900'>Text</p>
				<div className='flex h-[calc(100vh-15rem)] flex-col'>
					<pre className='overflow-x-auto flex-1 text-[15px] border border-gray-200 p-5 rounded mb-5'>
						{CommonService.getInstance().isJSONString(output.text)
							? JSON.stringify(JSON.parse(output.text), null, 4)
							: CommonService.getInstance().isJSON(output.text)
							? JSON.stringify(output.text, null, 4)
							: output.text}
					</pre>
					<div className='flex justify-center'>
						<PrimaryButton label='Clear Output' onClick={clearOutput} />
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleFileUploadView;
