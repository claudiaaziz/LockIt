import { body, validationResult } from 'express-validator';

export const validatePassword = [
	body('website').trim().notEmpty().withMessage('Website is required'),
	body('credential').trim().notEmpty().withMessage('Username/Email is required'),
	body('password').trim().notEmpty().withMessage('Password is required'),
	body('category').isIn(['social', 'finance', 'work', 'personal']).withMessage('Invalid category'),
];

export const validateUser = [
	body('email').isEmail().withMessage('Invalid email'),
	body('name').trim().notEmpty().withMessage('Name is required'),
];

export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};
