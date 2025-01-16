import { PasswordModel } from '../models/Password.js';

export const passwordController = {
	async getPasswords(req, res) {
		try {
			console.log('getPasswords 🩷 req.user:', req.user);
			const userId = req.user.id; // From auth middleware
			const passwords = await PasswordModel.findAllByUser(userId);
			res.json(passwords);
		} catch (error) {
			console.error('Error fetching passwords:', error);
			res.status(500).json({ message: 'Error fetching passwords' });
		}
	},

	async createPassword(req, res) {
		try {
			const userId = req.user.id;
			const password = await PasswordModel.create(req.body, userId);
			res.status(201).json(password);
		} catch (error) {
			console.error('Error creating password:', error);
			res.status(500).json({ message: 'Error creating password' });
		}
	},

	async updatePassword(req, res) {
		try {
			const userId = req.user.id;
			const password = await PasswordModel.update(req.params.id, req.body, userId);
			res.json(password);
		} catch (error) {
			console.error('Error updating password:', error);
			res.status(500).json({ message: 'Error updating password' });
		}
	},

	async deletePassword(req, res) {
		try {
			const userId = req.user.id;
			await PasswordModel.delete(req.params.id, userId);
			res.status(204).send();
		} catch (error) {
			console.error('Error deleting password:', error);
			res.status(500).json({ message: 'Error deleting password' });
		}
	},

	async decryptPassword(req, res) {
		try {
			const userId = req.user.id;
			const { id } = req.params;
			const decryptedPassword = await PasswordModel.decryptPassword(id, userId);
			res.json({ password: decryptedPassword });
		} catch (error) {
			console.error('Error decrypting password:', error);
			res.status(500).json({ message: 'Error decrypting password' });
		}
	},
};
