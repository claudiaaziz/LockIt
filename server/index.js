const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const { encrypt, decrypt } = require('./encryptionAndDecryptionHandler');

const PORT = 3001;

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());

// Database configuration
const db = mysql2.createConnection({
	user: 'root',
	host: 'localhost',
	password: 'password',
	database: 'PasswordManager',
});

/**
 * Password Management API Endpoints
 */

// Create new password
app.post('/add-password', (req, res) => {
	const { password, website } = req.body;
	const encryptedPassword = encrypt(password);

	db.query(
		'INSERT INTO passwords (password, website, iv) VALUES (?,?,?)',
		[encryptedPassword.password, website, encryptedPassword.iv],
		(err, result) => {
			if (err) {
				console.error('Error adding password:', err);
				res.status(500).json({ error: 'Failed to add password' });
			} else {
				res.json({
					id: result.insertId,
					website,
					password,
					iv: encryptedPassword.iv,
				});
			}
		}
	);
});

// Get all passwords
app.get('/passwords', (_, res) => {
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
app.put('/update-password/:id', (req, res) => {
	const { id } = req.params;
	const { password, website } = req.body;
	const encryptedPassword = encrypt(password);

	db.query(
		'UPDATE passwords SET password = ?, website = ?, iv = ? WHERE id = ?',
		[encryptedPassword.password, website, encryptedPassword.iv, id],
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
					iv: encryptedPassword.iv,
				});
			}
		}
	);
});

// Delete password
app.delete('/delete-password/:id', (req, res) => {
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
app.post('/decrypt-password', (req, res) => {
	try {
		const decryptedPassword = decrypt(req.body);
		res.json({ password: decryptedPassword });
	} catch (err) {
		console.error('Error decrypting password:', err);
		res.status(500).json({ error: 'Failed to decrypt password' });
	}
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
