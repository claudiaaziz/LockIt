import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/index.js';
import authRoutes from './routes/auth.js';
import passwordRoutes from './routes/passwords.js';
import { auth } from './middleware/auth.js';
import axios from 'axios';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: [config.auth.clientUrl],
		credentials: true,
	})
);

// Routes
app.use('/auth', authRoutes);
app.use('/passwords', passwordRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Something broke!' });
});

app.listen(config.server.port, () => {
	console.log(`Server running on port ${config.server.port}`);
});

// temp while testing
app.get('/user/posts', auth, async (_, res) => {
	try {
		const { data } = await axios.get(config.auth.postUrl);
		res.json({ posts: data?.slice(0, 5) });
	} catch (err) {
		console.error('Error: ', err);
	}
});
