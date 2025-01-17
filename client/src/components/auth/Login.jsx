import { Box, Typography, Divider } from '@mui/material';
import { Google } from '@mui/icons-material';
import Button from '../common/Button';
import { authService } from '../../services/authService';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import axios from 'axios';

export default function Login() {
	const navigate = useNavigate();
	const { setLoggedIn, setUser, isLoading, loggedIn } = useContext(AuthContext);

	if (isLoading || loggedIn === null) {
		return <LoadingSpinner />;
	}

	if (loggedIn === true) {
		return <Navigate to='/' replace />;
	}

	const handleGoogleLogin = async () => {
		try {
			// Get the Google OAuth URL from the server
			const {
				data: { url },
			} = await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/url`);
			// Redirect the user to the Google OAuth URL
			window.location.assign(url);
		} catch (err) {
			console.error('Login failed:', err);
		}
	};

	const handleDemoLogin = async () => {
		try {
			const { user } = await authService.demoLogin();
			setLoggedIn(true);
			setUser(user);
			navigate('/');
		} catch (error) {
			console.error('Demo login failed:', error);
		}
	};

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 3,
				px: { xs: 2, sm: 3 },
			}}
		>
			<Typography
				variant='h3'
				component='h1'
				sx={{
					fontWeight: 500,
					color: 'primary.main',
					fontSize: { xs: '2rem', sm: '3rem' },
				}}
			>
				Lockit
			</Typography>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					width: '100%',
					maxWidth: { xs: '100%', sm: 400 },
				}}
			>
				<Button
					onClick={handleGoogleLogin}
					startIcon={<Google />}
					variant='primary'
					sx={{
						py: 1.5,
						fontSize: { xs: '0.9rem', sm: '1rem' },
						backgroundColor: 'primary.main',
						color: 'black',
						'&:hover': {
							backgroundColor: 'primary.dark',
						},
					}}
				>
					Continue with Google
				</Button>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<Divider sx={{ flex: 1 }} />
					<Typography variant='body2' color='text.secondary'>
						or
					</Typography>
					<Divider sx={{ flex: 1 }} />
				</Box>

				<Button
					onClick={handleDemoLogin}
					variant='outlined'
					sx={{
						py: 1.5,
						borderStyle: 'dashed',
						fontSize: { xs: '0.9rem', sm: '1rem' },
						'&:hover': {
							borderStyle: 'dashed',
						},
					}}
				>
					Try Demo Version
				</Button>
			</Box>

			<Typography
				variant='body2'
				color='text.secondary'
				sx={{
					mt: 2,
					textAlign: 'center',
					px: 2,
				}}
			>
				No sign up required for demo
			</Typography>
		</Box>
	);
}
