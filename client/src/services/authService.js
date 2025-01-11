import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const authService = {
	logout: async () => {
		await axios.post(`${serverUrl}/auth/logout`, {}, { withCredentials: true });
	},
};
