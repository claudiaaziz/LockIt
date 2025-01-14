import dotenv from 'dotenv';
dotenv.config();

const dbUrl = process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL) : null;

export const config = {
	db: {
		host: process.env.NODE_ENV === 'production' ? process.env.DB_HOST : dbUrl?.hostname || 'localhost',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME || 'railway',
		port: process.env.NODE_ENV === 'production' ? process.env.DB_PORT : dbUrl?.port || 3306,
		ssl: {
			rejectUnauthorized: false,
		},
	},
	auth: {
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
		tokenUrl: 'https://oauth2.googleapis.com/token',
		redirectUrl: process.env.REDIRECT_URL,
		clientUrl: process.env.CLIENT_URL,
		tokenSecret: process.env.TOKEN_SECRET,
		tokenExpiration: 24 * 60 * 60 * 1000,
		postUrl: 'https://jsonplaceholder.typicode.com/posts',
	},
	server: {
		port: 5001,
	},
};
