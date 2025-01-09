import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export const auth = (req, res, next) => {
	console.log('Auth Middleware - Cookies:', req.cookies);
	try {
		const token = req.cookies.token;
		if (!token) return res.status(401).json({ message: 'Unauthorized' });
		jwt.verify(token, config.auth.tokenSecret);
		return next();
	} catch (err) {
		console.error('Error: ', err);
		res.status(401).json({ message: 'Unauthorized' });
	}
};
