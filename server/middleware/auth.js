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
