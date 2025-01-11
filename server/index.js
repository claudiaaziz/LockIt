import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/index.js';
import authRoutes from './routes/auth.js';
import passwordRoutes from './routes/passwords.js';
import { authLimiter, apiLimiter } from './middleware/rateLimiter.js';
import { csrfProtection } from './middleware/csrf.js';

const app = express();

// Basic middleware
app.use(cookieParser());
app.use(express.json());
app.use(
	cors({
		origin: [config.auth.clientUrl],
		credentials: true,
	})
);

// Apply rate limiting
app.use('/auth/login', authLimiter);
app.use('/api', apiLimiter);

// Routes that don't need CSRF
app.use('/auth', authRoutes);

// CSRF protection for everything else
app.use(csrfProtection);

// Provide CSRF token
app.get('/api/csrf-token', (req, res) => {
	res.json({ csrfToken: req.csrfToken() });
});

// Protected routes
app.use('/passwords', passwordRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: err.message || 'Something broke!' });
});

app.listen(config.server.port, () => {
	console.log(`Server running on port ${config.server.port}`);
});
