export const PrimaryButton = ({ label, onClick }) => {
	return (
		<button
			className='bg-gray-700 py-1.5 px-4 rounded-md text-white w-max'
			onClick={onClick}>
			<p className='text-sm'>{label}</p>
		</button>
	);
};

export const PrimaryButtonWithLoader = ({ label, onClick, isLoading }) => {
	return (
		<button
			className='flex items-center bg-gray-700 py-1.5 px-4 rounded-md text-white disabled:cursor-not-allowed'
			disabled={isLoading}
			onClick={onClick}>
			<p className='text-sm mr-1.5'>{label}</p>
			{isLoading && (
				<svg
					className='animate-spin h-4 w-4 text-white'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'>
					<circle
						className='opacity-25'
						cx='12'
						cy='12'
						r='10'
						stroke='currentColor'
						strokeWidth='4'></circle>
					<path
						className='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
				</svg>
			)}
		</button>
	);
};
