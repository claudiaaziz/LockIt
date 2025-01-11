import { useState, useContext, useMemo, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { PasswordContext } from '../../context/PasswordContext';
import { authService } from '../../services/authService';
import { calculatePasswordStrength } from '../../utils/passwordStrength';
import Header from './Header';
import Stats from './Stats';
import PasswordList from './PasswordList';
import AddPasswordModal from './AddPasswordModal';

export default function Dashboard() {
	const { passwords, decryptedPasswords, loading, loadPasswords } = useContext(PasswordContext);
	const { user, setLoggedIn, setUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	const handleLogout = async () => {
		try {
			await authService.logout();
			setLoggedIn(false);
			setUser(null);
			navigate('/login');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	useEffect(() => {
		loadPasswords();
	}, []);

	const stats = useMemo(
		() => ({
			totalPasswords: passwords.length,
			weakPasswords: passwords.reduce((count, pass) => {
				const strength = calculatePasswordStrength(decryptedPasswords[pass.id]);
				return count + (strength <= 75 ? 1 : 0);
			}, 0),
			reusedPasswords: Object.values(
				Object.values(decryptedPasswords).reduce((acc, password) => {
					acc[password] = (acc[password] || 0) + 1;
					return acc;
				}, {})
			).filter((count) => count > 1).length,
		}),
		[passwords, decryptedPasswords]
	);

	return (
		<Box>
			<Header user={user} onLogout={handleLogout} onAddPassword={() => setIsAddModalOpen(true)} />
			<Stats loading={loading} stats={stats} />
			<PasswordList />
			<AddPasswordModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
		</Box>
	);
}
