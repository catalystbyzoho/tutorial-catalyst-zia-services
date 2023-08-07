import { cloneDeep, set } from 'lodash';
import { useCallback, useState } from 'react';

const useForm = ({ initialValues }) => {
	const [errors, setErrors] = useState({});
	const [isProcessing, setIsProcessing] = useState(false);
	const [values, setValues] = useState({ ...initialValues });

	const updateProcessing = useCallback((value) => {
		setIsProcessing(value);
	}, []);

	const onInputChange = useCallback((event) => {
		const { name, value } = event.target;
		if (event.target instanceof HTMLInputElement) {
			const { type, files } = event.target;

			if (type === 'file') {
				if (files && files.length) {
					setValues((prev) => ({
						...prev,
						[name]: files[0]
					}));
				} else {
					setValues((prev) => ({
						...prev,
						[name]: null
					}));
				}
			} else {
				setValues((prev) => ({
					...prev,
					[name]: value
				}));
			}
		} else if (event.target instanceof HTMLTextAreaElement) {
			setValues((prev) => ({
				...prev,
				[name]: value
			}));
		}

		setErrors((prev) => ({
			...prev,
			[name]: ''
		}));
	}, []);

	const setMultipleValues = useCallback((values) => {
		setValues(values);
	}, []);

	const setValue = useCallback((key, value) => {
		setValues((prev) => {
			const temp = cloneDeep(prev);

			return set(temp, key, value);
		});
	}, []);

	const setError = useCallback((key, value) => {
		setErrors((prev) => ({
			...prev,
			[key]: value
		}));
	}, []);

	const clearErrors = useCallback(() => {
		setErrors({});
	}, []);
	return {
		values,
		errors,
		setValue,
		setError,
		clearErrors,
		isProcessing,
		onInputChange,
		updateProcessing,
		setMultipleValues
	};
};

export default useForm;
