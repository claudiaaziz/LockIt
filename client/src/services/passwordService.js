import { api } from './api';

export const passwordService = {
	fetchPasswords: async () => {
		try {
			console.log('fetchPasswords 🩷');
			const response = await api.get('/passwords');
			return response.data;
		} catch (error) {
			// Handle specific errors
			if (error.response?.status === 429) {
				throw new Error('Please wait before requesting more passwords');
			}
			throw error;
		}
	},

	addPassword: async (passwordData) => {
		const response = await api.post('/passwords', passwordData);
		return response.data;
	},

	updatePassword: async (id, data) => {
		const response = await api.put(`/passwords/${id}`, data);
		return response.data;
	},

	deletePassword: async (id) => {
		await api.delete(`/passwords/${id}`);
	},

	decryptPassword: async (id) => {
		const response = await api.get(`/passwords/decrypt/${id}`);
		return response.data.password;
	},
};
