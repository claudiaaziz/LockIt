import mysql from 'mysql2/promise';
import { config } from '../config/index.js';

const pool = mysql.createPool({
	host: config.db.host,
	user: config.db.user,
	password: config.db.password,
	database: config.db.database,
	port: config.db.port,
	ssl: config.db.ssl,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

const testConnection = async () => {
	try {
		const connection = await pool.getConnection();
		console.log('Successfully connected to the database');
		connection.release();
	} catch (err) {
		console.error('Error connecting to the database:', err);
	}
};

testConnection();

export default pool;
