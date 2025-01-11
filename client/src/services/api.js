import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
	withCredentials: true,
});

// Get CSRF token on app start
const setupCSRF = async () => {
	try {
		const { data } = await api.get('/api/csrf-token');
		// Set the token in default headers for all future requests
		api.defaults.headers['XSRF-TOKEN'] = data.csrfToken;
	} catch (err) {
		console.error('Failed to fetch CSRF token:', err);
	}
};

// Refresh CSRF token after 401/403 errors
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 403 && error.response?.data?.message?.includes('csrf')) {
			// Token expired or invalid, get a new one
			await setupCSRF();
			// Retry the original request
			return api(error.config);
		}
		return Promise.reject(error);
	}
);

export { api, setupCSRF };
