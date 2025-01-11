import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5001';

export const passwordService = {
	fetchPasswords: async () => {
		const response = await axios.get(`${API_BASE_URL}/passwords`);
		return response.data;
	},

	addPassword: async (passwordData) => {
		const response = await axios.post(`${API_BASE_URL}/passwords`, passwordData);
		return response.data;
	},

	updatePassword: async (id, data) => {
		const response = await axios.put(`${API_BASE_URL}/passwords/${id}`, data);
		return response.data;
	},

	deletePassword: async (id) => {
		await axios.delete(`${API_BASE_URL}/passwords/${id}`);
	},

	decryptPassword: async (id) => {
		const response = await axios.get(`${API_BASE_URL}/passwords/decrypt/${id}`);
		return response.data.password;
	},
};
