import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';

const HomeLayout = () => {
	return (
		<div className='h-screen w-screen'>
			<div className='fixed h-16 top-0 inset-x-0 bg-gray-700 shadow-md flex items-center px-8'>
				<h3 className='text-3xl font-bold text-white'>Catalyst Zia Services</h3>
			</div>
			<div className='pt-16 h-full flex'>
				<div className='w-80 border-r border-r-gray-200 px-8 py-6'>
					<h6 className='text-lg font-medium text-gray-800 py-1.5'>
						Identity Scanners
					</h6>
					<div className='text-gray-400'>
						<NavLink
							className={({ isActive }) =>
								classNames(
									'text-[15px] px-4 py-1 hover:bg-gray-100 hover:text-gray-700 rounded-lg mb-2',
									isActive && 'bg-gray-100 text-gray-700'
								)
							}
							to='cheque'>
							Cheque
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								classNames(
									'text-[15px] px-4 py-1 hover:bg-gray-100 hover:text-gray-700 rounded-lg mb-2',
									isActive && 'bg-gray-100 text-gray-700'
								)
							}
							to='pan'>
							Pan Card
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								classNames(
									'text-[15px] px-4 py-1 hover:bg-gray-100 hover:text-gray-700 rounded-lg mb-2',
									isActive && 'bg-gray-100 text-gray-700'
								)
							}
							to='passbook'>
							Passbook
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								classNames(
									'text-[15px] px-4 py-1 hover:bg-gray-100 hover:text-gray-700 rounded-lg mb-2',
									isActive && 'bg-gray-100 text-gray-700'
								)
							}
							to='aadhaar'>
							Aadhaar Card
						</NavLink>
					</div>

					<h6 className='text-lg font-medium text-gray-800 py-1.5'>
						General Scanners
					</h6>
					<div className='text-gray-400'>
						<NavLink
							className={({ isActive }) =>
								classNames(
									'text-[15px] px-4 py-1 hover:bg-gray-100 hover:text-gray-700 rounded-lg mb-2',
									isActive && 'bg-gray-100 text-gray-700'
								)
							}
							to='barcode'>
							Barcode
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								classNames(
									'text-[15px] px-4 py-1 hover:bg-gray-100 hover:text-gray-700 rounded-lg mb-2',
									isActive && 'bg-gray-100 text-gray-700'
								)
							}
							to='ocr'>
							General OCR
						</NavLink>
					</div>
				</div>
				<div className='w-[calc(100vw-20rem)]'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default HomeLayout;
