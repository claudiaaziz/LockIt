import { useState, useContext, useMemo, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Paper, Skeleton, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import PasswordList from './PasswordList';
import AddPasswordModal from './AddPasswordModal';
import { PasswordContext } from '../../context/PasswordContext';
import { calculatePasswordStrength } from '../../utils/passwordStrength';
import { Key, Warning, ContentCopy } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import Button from '../common/Button';

export default function Dashboard() {
	const { passwords, decryptedPasswords, loading, loadPasswords } = useContext(PasswordContext);
	const { user, logout } = useContext(AuthContext);
	console.log('Dashboard 🩷 user:', user);
	console.log('Full user object:', user);
	console.log('Picture URL:', user?.picture);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		handleMenuClose();
		logout();
	};

	useEffect(() => {
		loadPasswords();
	}, []);

	const stats = useMemo(() => {
		const totalPasswords = passwords.length;

		// Count weak passwords (strength <= 75)
		const weakPasswords = passwords.reduce((count, pass) => {
			const strength = calculatePasswordStrength(decryptedPasswords[pass.id]);
			return count + (strength <= 75 ? 1 : 0);
		}, 0);

		// Count reused passwords
		const passwordCounts = Object.values(decryptedPasswords).reduce((acc, password) => {
			acc[password] = (acc[password] || 0) + 1;
			return acc;
		}, {});

		const reusedPasswords = Object.values(passwordCounts).filter((count) => count > 1).length;

		return {
			totalPasswords,
			weakPasswords,
			reusedPasswords,
		};
	}, [passwords, decryptedPasswords]);

	return (
		<Box>
			<Paper
				elevation={0}
				sx={{
					p: 3,
					mb: 3,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					bgcolor: 'background.paper',
					borderRadius: 2,
					border: '1px solid',
					borderColor: 'divider',
				}}
			>
				<Typography variant='h4' component='h1' sx={{ fontWeight: 500 }}>
					Lockit
				</Typography>

				<Button onClick={() => setIsAddModalOpen(true)}>Add Password</Button>

				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					{user?.picture && (
						<>
							<IconButton onClick={handleMenuOpen}>
								<Avatar
									src={user.picture}
									alt={user.name}
									sx={{
										width: 35,
										height: 35,
									}}
								/>
							</IconButton>
							<Menu
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={handleMenuClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								sx={{ cursor: 'default' }}
							>
								<MenuItem sx={{ minWidth: 150, cursor: 'default' }}>
									<Typography variant='body2' color='text.secondary'>
										{user.name}
									</Typography>
								</MenuItem>
								<MenuItem onClick={handleLogout} sx={{ minWidth: 150 }}>
									<Typography variant='body2' color='text.secondary'>
										Logout
									</Typography>
								</MenuItem>
							</Menu>
						</>
					)}
				</Box>
			</Paper>

			<Grid container spacing={3} sx={{ mb: 4 }}>
				{loading ? (
					<>
						{[1, 2, 3].map((item) => (
							<Grid item xs={12} sm={6} md={4} key={item}>
								<Skeleton
									variant='rectangular'
									sx={{
										height: 120,
										borderRadius: 2,
									}}
								/>
							</Grid>
						))}
					</>
				) : (
					<>
						<Grid item xs={12} sm={6} md={4}>
							<Card elevation={0} sx={{ borderRadius: 2 }}>
								<CardContent sx={{ p: 3 }}>
									<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
										<Key sx={{ color: 'primary.main', mr: 1 }} />
										<Typography color='textSecondary' variant='subtitle2'>
											Total Passwords
										</Typography>
									</Box>
									<Typography variant='h3' sx={{ fontWeight: 500 }}>
										{stats.totalPasswords}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Card elevation={0} sx={{ borderRadius: 2 }}>
								<CardContent sx={{ p: 3 }}>
									<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
										<Warning sx={{ color: 'error.main', mr: 1 }} />
										<Typography color='textSecondary' variant='subtitle2'>
											Weak Passwords
										</Typography>
									</Box>
									<Typography variant='h3' color='error' sx={{ fontWeight: 500 }}>
										{stats.weakPasswords}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Card elevation={0} sx={{ borderRadius: 2 }}>
								<CardContent sx={{ p: 3 }}>
									<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
										<ContentCopy sx={{ color: 'warning.main', mr: 1 }} />
										<Typography color='textSecondary' variant='subtitle2'>
											Reused Passwords
										</Typography>
									</Box>
									<Typography variant='h3' color='warning.main' sx={{ fontWeight: 500 }}>
										{stats.reusedPasswords}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					</>
				)}
			</Grid>

			<Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
				<Typography variant='h5' sx={{ mb: 3, fontWeight: 500 }}>
					Your Passwords
				</Typography>
				<PasswordList onAddPassword={() => setIsAddModalOpen(true)} />
			</Paper>

			<AddPasswordModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
		</Box>
	);
}
