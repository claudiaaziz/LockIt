import csrf from 'csurf';

export const csrfProtection = csrf({
	cookie: {
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
	},
	ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
	value: (req) => req.headers['xsrf-token'],
});
