import pool from './db.js';
import { encrypt, decrypt } from '../utils/encryption.js';

export const PasswordModel = {
	async findAllByUser(userId) {
		const [passwords] = await pool.query('SELECT * FROM passwords WHERE user_id = ?', [userId]);
		return passwords;
	},

	async create(passwordData, userId) {
		const { website, credential, password, category } = passwordData;
		const encryptedData = encrypt(password);

		const [result] = await pool.query(
			'INSERT INTO passwords (website, credential, password, iv, category, user_id) VALUES (?, ?, ?, ?, ?, ?)',
			[website, credential, encryptedData.password, encryptedData.iv, category, userId]
		);

		return {
			id: result.insertId,
			website,
			credential,
			category,
			user_id: userId,
			iv: encryptedData.iv,
			password: encryptedData.password,
		};
	},

	async update(id, passwordData, userId) {
		const { website, credential, password, category } = passwordData;
		const encryptedData = encrypt(password);

		await pool.query(
			'UPDATE passwords SET website = ?, credential = ?, password = ?, iv = ?, category = ? WHERE id = ? AND user_id = ?',
			[website, credential, encryptedData.password, encryptedData.iv, category, id, userId]
		);

		return {
			id,
			website,
			credential,
			category,
			user_id: userId,
			iv: encryptedData.iv,
			password: encryptedData.password,
		};
	},

	async delete(id, userId) {
		await pool.query('DELETE FROM passwords WHERE id = ? AND user_id = ?', [id, userId]);
	},

	async decryptPassword(id, userId) {
		const [passwords] = await pool.query('SELECT password, iv FROM passwords WHERE id = ? AND user_id = ?', [id, userId]);

		if (passwords.length === 0) {
			throw new Error('Password not found');
		}

		const { password, iv } = passwords[0];
		return decrypt({ password, iv });
	},
};
