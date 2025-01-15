import { useState, useContext, useMemo, useEffect } from 'react';
import { Box, Fab, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { PasswordContext } from '../../context/PasswordContext';
import { authService } from '../../services/authService';
import { calculatePasswordStrength } from '../../utils/passwordStrength';
import Header from './Header';
import Stats from './Stats';
import PasswordList from './PasswordList';
import AddPasswordModal from './AddPasswordModal';
import { Add as AddIcon } from '@mui/icons-material';

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
		<Box sx={{ position: 'relative', minHeight: '100vh' }}>
			<Header user={user} onLogout={handleLogout} />
			<Stats loading={loading} stats={stats} />
			<PasswordList onAddPassword={() => setIsAddModalOpen(true)} />
			<Tooltip title='Add Password'>
				<Fab
					color='primary'
					onClick={() => setIsAddModalOpen(true)}
					sx={{
						position: 'fixed',
						bottom: 32,
						right: 32,
						backgroundColor: 'primary.main',
						'&:hover': {
							backgroundColor: 'primary.dark',
						},
					}}
				>
					<AddIcon />
				</Fab>
			</Tooltip>
			<AddPasswordModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
		</Box>
	);
}
