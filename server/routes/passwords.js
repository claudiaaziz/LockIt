import express from 'express';
import mysql2 from 'mysql2';
import { encrypt, decrypt } from '../utils/encryption.js';
import { auth } from '../middleware/auth.js';
import { config } from '../config/index.js';

const router = express.Router();

// Database connection
const db = mysql2.createConnection(config.db);

// Create new password
router.post('/', auth, (req, res) => {
	const { password, website, credential, category } = req.body;
	const encryptedPassword = encrypt(password);

	db.query(
		'INSERT INTO passwords (password, website, iv, credential, category) VALUES (?,?,?,?,?)',
		[encryptedPassword.password, website, encryptedPassword.iv, credential, category],
		(err, result) => {
			if (err) {
				console.error('Error adding password:', err);
				res.status(500).json({ error: 'Failed to add password' });
			} else {
				res.json({
					id: result.insertId,
					website,
					password,
					credential,
					category,
					iv: encryptedPassword.iv,
					lastUpdated: new Date().toISOString(),
				});
			}
		}
	);
});

// Get all passwords
router.get('/', auth, (req, res) => {
	db.query('SELECT * FROM passwords;', (err, result) => {
		if (err) {
			console.error('Error fetching passwords:', err);
			res.status(500).json({ error: 'Failed to fetch passwords' });
		} else {
			res.json(result);
		}
	});
});

// Update existing password
router.put('/:id', auth, (req, res) => {
	const { id } = req.params;
	const { password, website, credential, category } = req.body;
	const encryptedPassword = encrypt(password);

	db.query(
		'UPDATE passwords SET password = ?, website = ?, iv = ?, credential = ?, category = ? WHERE id = ?',
		[encryptedPassword.password, website, encryptedPassword.iv, credential, category, id],
		(err, result) => {
			if (err) {
				console.error('Error updating password:', err);
				res.status(500).json({ error: 'Failed to update password' });
			} else if (result.affectedRows === 0) {
				res.status(404).json({ error: 'Password not found' });
			} else {
				res.json({
					id,
					website,
					password,
					credential,
					category,
					iv: encryptedPassword.iv,
					lastUpdated: new Date().toISOString(),
				});
			}
		}
	);
});

// Delete password
router.delete('/:id', auth, (req, res) => {
	const { id } = req.params;

	db.query('DELETE FROM passwords WHERE id = ?', [id], (err, result) => {
		if (err) {
			console.error('Error deleting password:', err);
			res.status(500).json({ error: 'Failed to delete password' });
		} else if (result.affectedRows === 0) {
			res.status(404).json({ error: 'Password not found' });
		} else {
			res.json({ message: 'Password deleted successfully' });
		}
	});
});

// Decrypt password
router.post('/decrypt', auth, (req, res) => {
	try {
		const decryptedPassword = decrypt(req.body);
		res.json({ password: decryptedPassword });
	} catch (err) {
		console.error('Error decrypting password:', err);
		res.status(500).json({ error: 'Failed to decrypt password' });
	}
});

export default router;
