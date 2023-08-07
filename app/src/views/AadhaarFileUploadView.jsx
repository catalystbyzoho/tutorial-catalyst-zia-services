import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';

import { useForm } from '../hooks';
import { AppConstants } from '../constants';
import { AxiosInstance } from '../instances';

import { ToastService } from '../services';
import { PrimaryButton, PrimaryButtonWithLoader } from '../components/Buttons';

const initialValues = {
	front: null,
	back: null
};

const AadhaarFileUploadView = () => {
	const [output, setOutput] = useState();
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
		setOutput();
		setMultipleValues({ ...initialValues });
	}, [setMultipleValues]);

	const clearOutput = useCallback(() => {
		setOutput();
	}, []);

	const processImage = useCallback(() => {
		if (!values.front) {
			setError('front', 'Front view cannot be empty.');
			return;
		}
		if (values.front.size > AppConstants.MaxFileSize) {
			setError('front', 'Front view size must be less than 10MB.');
			return;
		}
		if (!values.back) {
			setError('back', 'Back view cannot be empty.');
			return;
		}
		if (values.back.size > AppConstants.MaxFileSize) {
			setError('back', 'Back view size must be less than 10MB.');
			return;
		}

		updateProcessing(true);

		const formData = new FormData();
		formData.append('front', values.front);
		formData.append('back', values.back);

		AxiosInstance.post(`/aadhaar`, formData, {
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
	}, [setError, updateProcessing, values]);

	return (
		<div className='flex h-full'>
			<div className='w-2/5 border-r border-gray-200 p-10'>
				<h6 className='mb-2.5 text-xl font-bold text-gray-900'>Input</h6>
				<div className='mb-5'>
					<p className='text-gray-800 text-[15px] font-normal mb-1'>
						Front view of aadhaar
					</p>
					<input
						type='file'
						name='front'
                        value={values.front ? values.front.fileName : ''}
						className={classNames(
							'p-1 border rounded-md text-sm w-full mb-0.5',
							errors.front ? ' border-red-600' : 'border-gray-200'
						)}
						accept='image/*'
						onChange={onInputChange}
					/>
					<p className='text-red-600 text-[13px]'>{errors.front}</p>
				</div>
				<div className='mb-5'>
					<p className='text-gray-800 text-[15px] font-normal mb-1'>
						Back view of aadhaar
					</p>
					<input
						type='file'
						name='back'
                        value={values.back ? values.back.fileName : ''}
						className={classNames(
							'p-1 border rounded-md text-sm w-full mb-0.5',
							errors.back ? ' border-red-600' : 'border-gray-200'
						)}
						accept='image/*'
						onChange={onInputChange}
					/>
					<p className='text-red-600 text-[13px]'>{errors.back}</p>
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
				<div className='flex h-full flex-col'>
					<pre className='overflow-auto flex-1 text-[15px] border border-gray-200 p-5 rounded mb-5'>
						{JSON.stringify(output, null, 4)}
					</pre>
					<div className='flex justify-center'>
						<PrimaryButton label='Clear Output' onClick={clearOutput} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AadhaarFileUploadView;
