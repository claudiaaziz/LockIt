import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { UserModel } from '../models/User.js';

export const auth = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ message: 'Authentication required' });
		}

		const decoded = jwt.verify(token, config.auth.tokenSecret);

		// Special handling for demo user
		if (decoded.user.id === 999) {
			req.user = {
				id: 999,
				name: 'Demo User',
				email: 'demo@example.com',
				picture: 'https://lh3.googleusercontent.com/demo_picture',
			};
			return next();
		}

		// Regular user flow
		const user = await UserModel.findById(decoded.user.id);
		if (!user) {
			return res.status(401).json({ message: 'User not found' });
		}

		req.user = user;
		next();
	} catch (err) {
		console.error('Auth middleware error:', err);
		res.status(401).json({ message: 'Authentication failed' });
	}
};
