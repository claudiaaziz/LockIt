import { useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const serverUrl = process.env.REACT_APP_SERVER_URL;

// Callback component to handle the OAuth callback
export default function Callback() {
	const called = useRef(false);
	const { checkLoginState, loggedIn } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		const handleCallback = async () => {
			if (loggedIn === false) {
				try {
					if (called.current) return;
					called.current = true;
					await axios.get(`${serverUrl}/auth/token${window.location.search}`);
					await checkLoginState();
					navigate('/');
				} catch (err) {
					console.error('Callback error:', err);
					navigate('/');
				}
			} else if (loggedIn === true) {
				navigate('/');
			}
		};

		handleCallback();
	}, [checkLoginState, loggedIn, navigate]);

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<CircularProgress />
		</Box>
	);
}
