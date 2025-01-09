import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

export const passwordService = {
	fetchPasswords: async () => {
		const response = await axios.get(`${API_BASE_URL}/passwords`);
		return response.data;
	},

	addPassword: async (passwordData) => {
		const response = await axios.post(`${API_BASE_URL}/add-password`, passwordData);
		return response.data;
	},

	updatePassword: async (id, data) => {
		const response = await axios.put(`${API_BASE_URL}/update-password/${id}`, data);
		return response.data;
	},

	deletePassword: async (id) => {
		await axios.delete(`${API_BASE_URL}/delete-password/${id}`);
	},

	decryptPassword: async (encryptedData) => {
		const response = await axios.post(`${API_BASE_URL}/decrypt-password`, encryptedData);
		return response.data.password;
	},
};
