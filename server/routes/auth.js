import express from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import queryString from 'query-string';
import { config } from '../config/index.js';
import { UserModel } from '../models/User.js';

const router = express.Router();

const authParams = queryString.stringify({
	client_id: config.auth.clientId,
	redirect_uri: config.auth.redirectUrl,
	response_type: 'code',
	scope: 'openid profile email',
	access_type: 'offline',
	state: 'standard_oauth',
	prompt: 'consent',
});

const getTokenParams = (code) =>
	queryString.stringify({
		client_id: config.auth.clientId,
		client_secret: config.auth.clientSecret,
		code,
		grant_type: 'authorization_code',
		redirect_uri: config.auth.redirectUrl,
	});

router.get('/url', (_, res) => {
	res.json({
		url: `${config.auth.authUrl}?${authParams}`,
	});
});

// This is the endpoint that google will redirect to after the user has authenticated
router.get('/token', async (req, res) => {
	const { code } = req.query;
	if (!code) return res.status(400).json({ message: 'Authorization code must be provided' });
	try {
		// Get all parameters needed to hit authorization server
		const tokenParam = getTokenParams(code);
		// Exchange authorization code for access token (id token is returned here too)
		const {
			data: { id_token },
		} = await axios.post(`${config.auth.tokenUrl}?${tokenParam}`);
		if (!id_token) return res.status(400).json({ message: 'Auth error' });
		// Get user info from id token
		const { email, name, picture } = jwt.decode(id_token);
		// Create or update user in database
		const user = await UserModel.findOrCreate({
			google_id: email, // Using email as google_id for now
			email,
			name,
			picture,
		});
		// Sign token with full user info
		const token = jwt.sign({ user }, config.auth.tokenSecret, { expiresIn: config.auth.tokenExpiration });
		// Set cookies for user
		res.cookie('token', token, {
			maxAge: config.auth.tokenExpiration,
			httpOnly: true,
		});
		// You can choose to store user in a DB instead
		res.json({ user });
	} catch (err) {
		console.error('Error: ', err);
		res.status(500).json({ message: err.message || 'Server error' });
	}
});

router.get('/logged_in', (req, res) => {
	try {
		const token = req.cookies.token;
		if (!token) return res.json({ loggedIn: false });

		const { user } = jwt.verify(token, config.auth.tokenSecret);

		const newToken = jwt.sign({ user }, config.auth.tokenSecret, { expiresIn: config.auth.tokenExpiration });

		res.cookie('token', newToken, {
			maxAge: config.auth.tokenExpiration,
			httpOnly: true,
		});

		res.json({ loggedIn: true, user });
	} catch (err) {
		res.json({ loggedIn: false });
	}
});

router.post('/logout', (_, res) => {
	res.clearCookie('token').json({ message: 'Logged out' });
});

export default router;
