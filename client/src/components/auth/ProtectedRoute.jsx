import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

export default function ProtectedRoute({ children }) {
	const { loggedIn } = useContext(AuthContext);

	if (loggedIn === null) {
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

	if (loggedIn === false) {
		return <Navigate to='/login' replace />;
	}

	return children;
}
