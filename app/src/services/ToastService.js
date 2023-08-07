import { toast } from 'react-hot-toast';
import { ErrorToast } from '../components/Toast';

export default class ToastService {
    #message = ""
	constructor(message) {
        toast.remove();
		this.#message = message;
	}
	makeErrorToast = () => {
		toast.custom((toast) => (
			<ErrorToast message={this.#message} toast={toast} />
		));
	};

	static getInstance = (message) => {
		return new ToastService(message);
	};
}
