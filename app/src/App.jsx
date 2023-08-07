import './css/base.css';

import { Toaster } from 'react-hot-toast';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { HomeLayout } from './layouts';
import { AadhaarFileUploadView, SingleFileUploadView } from './views';

function App() {
	return (
		<>
			<HashRouter>
				<Routes>
					<Route path='' element={<HomeLayout />}>
						<Route path='aadhaar' element={<AadhaarFileUploadView />} />
						<Route path='pan' element={<SingleFileUploadView model='pan' />} />
						<Route path='ocr' element={<SingleFileUploadView model='ocr' />} />
						<Route
							path='cheque'
							element={<SingleFileUploadView model='cheque' />}
						/>
						<Route
							path='barcode'
							element={<SingleFileUploadView model='barcode' />}
						/>
						<Route
							path='passbook'
							element={<SingleFileUploadView model='passbook' />}
						/>
						<Route path='*' element={<Navigate to='cheque' />} />
						<Route path='' element={<Navigate to='cheque' />} />
					</Route>
				</Routes>
			</HashRouter>
			<Toaster position='top-center' />
		</>
	);
}

export default App;
