import jwt from 'jsonwebtoken';

export const confirmExpiration = () => {
	const token = sessionStorage.getItem('token');
	let isExpiredToken = false;
	jwt.verify(token, process.env.REACT_APP_JWT_SECRET, function(err, decoded) {
		if (err) {
			if (err.message === 'jwt expired') isExpiredToken = true;
		}
	});
	if (isExpiredToken) {
		sessionStorage.clear();
		window.location = '/login';
	}
};
