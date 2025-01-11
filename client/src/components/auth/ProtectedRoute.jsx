import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ProtectedRoute({ children }) {
	const { loggedIn, isLoading } = useContext(AuthContext);

	if (isLoading || loggedIn === null) {
		return <LoadingSpinner />;
	}

	if (loggedIn === false) {
		return <Navigate to='/login' replace />;
	}

	return children;
}
