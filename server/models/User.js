import pool from './db.js';

export const UserModel = {
	async findOrCreate({ google_id, email, name }) {
		const connection = await pool.getConnection();
		try {
			await connection.beginTransaction();

			// Check if user exists
			const [users] = await connection.query('SELECT * FROM Users WHERE google_id = ?', [google_id]);

			if (users.length > 0) {
				// Update existing user
				await connection.query('UPDATE Users SET email = ?, name = ? WHERE google_id = ?', [email, name, google_id]);
				await connection.commit();
				return users[0];
			}

			// Create new user
			const [result] = await connection.query('INSERT INTO Users (google_id, email, name) VALUES (?, ?, ?)', [
				google_id,
				email,
				name,
			]);
			await connection.commit();

			return {
				id: result.insertId,
				google_id,
				email,
				name,
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
