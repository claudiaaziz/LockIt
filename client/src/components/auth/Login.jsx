import { Box, Paper, Typography, Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import axios from 'axios';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function Login() {
	const { loggedIn, isLoading } = useContext(AuthContext);

	if (isLoading || loggedIn === null) {
		return <LoadingSpinner />;
	}

	if (loggedIn === true) {
		return <Navigate to='/' replace />;
	}

	const handleLogin = async () => {
		try {
			// Get the Google OAuth URL from the server
			const {
				data: { url },
			} = await axios.get(`${serverUrl}/auth/url`);
			// Redirect the user to the Google OAuth URL
			window.location.assign(url);
		} catch (err) {
			console.error('Login error:', err);
		}
	};

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'background.default',
			}}
		>
			<Paper
				elevation={0}
				sx={{
					p: 4,
					width: '100%',
					maxWidth: 400,
					textAlign: 'center',
					borderRadius: 2,
					border: '1px solid',
					borderColor: 'divider',
				}}
			>
				<Typography variant='h4' component='h1' sx={{ mb: 4, fontWeight: 500 }}>
					Welcome to Lockit
				</Typography>
				<Button
					variant='outlined'
					color='primary'
					size='large'
					startIcon={<Google />}
					onClick={handleLogin}
					sx={{
						px: 4,
						py: 1.5,
						textTransform: 'none',
						fontSize: '1.1rem',
					}}
				>
					Sign in with Google
				</Button>
			</Paper>
		</Box>
	);
}
