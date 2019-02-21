import Axios from 'axios';

function tokenInHeaders() {
	const token = sessionStorage.getItem('token');
	if (token) {
		Axios.defaults.headers.common['x-access-token'] = token;
	} else {
		Axios.defaults.headers.common['x-access-token'] = null;
	}
}
export { tokenInHeaders };
