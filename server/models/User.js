import pool from './db.js';

export const UserModel = {
	async findOrCreate({ google_id, email, name, picture }) {
		const connection = await pool.getConnection();
		try {
			await connection.beginTransaction();

			// Check if user exists by email
			const [users] = await connection.query('SELECT * FROM Users WHERE email = ?', [email]);

			if (users.length > 0) {
				// Update existing user
				await connection.query('UPDATE Users SET name = ?, picture = ? WHERE email = ?', [name, picture, email]);
				await connection.commit();
				return users[0];
			}

			// Create new user
			const [result] = await connection.query('INSERT INTO Users (google_id, email, name, picture) VALUES (?, ?, ?, ?)', [
				google_id,
				email,
				name,
				picture,
			]);
			await connection.commit();

			return {
				id: result.insertId,
				google_id,
				email,
				name,
				picture,
			};
		} catch (error) {
			await connection.rollback();
			throw error;
		} finally {
			connection.release();
		}
	},

	async findById(id) {
		const [users] = await pool.query('SELECT * FROM Users WHERE id = ?', [id]);
		return users[0] || null;
	},
};
