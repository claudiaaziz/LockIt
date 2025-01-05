import { useState, useEffect, useMemo, useContext } from 'react';
import { Box, Grid, Card, CardContent, Typography, IconButton, InputAdornment, TextField, Chip } from '@mui/material';
import { Visibility, VisibilityOff, ContentCopy, Edit, Delete, Search } from '@mui/icons-material';
import { passwordService } from '../../services/passwordService';
import EditPasswordModal from './EditPasswordModal';
import { PasswordContext } from '../../context/PasswordContext';
import { calculatePasswordStrength, getPasswordStrengthLabel } from '../../utils/passwordStrength';

const PasswordList = () => {
	const { passwords, setPasswords, decryptedPasswords, setDecryptedPasswords } = useContext(PasswordContext);

	const [searchTerm, setSearchTerm] = useState('');
	const [showPassword, setShowPassword] = useState({});
	const [editingPassword, setEditingPassword] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadPasswords = async () => {
			setLoading(true);
			try {
				const data = await passwordService.fetchPasswords();

				// Decrypt each password
				const decrypted = {};
				for (const pass of data) {
					try {
						decrypted[pass.id] = await passwordService.decryptPassword({
							password: pass.password,
							iv: pass.iv,
						});
					} catch (err) {
						console.error('Failed to decrypt password:', err);
					}
				}

				setDecryptedPasswords(decrypted);
				setPasswords(data);
			} catch (error) {
				console.error('Failed to fetch passwords:', error);
			} finally {
				setLoading(false);
			}
		};

		loadPasswords();
	}, [setPasswords, setDecryptedPasswords]);

	const handleCopyPassword = (password) => {
		navigator.clipboard.writeText(password);
		// TODO: Add toast notification here
	};

	const handleTogglePassword = (id) => {
		setShowPassword((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	// Memoize filtered passwords to prevent unnecessary re-renders
	const filteredPasswords = useMemo(() => {
		const searchLower = searchTerm.toLowerCase().trim();
		return searchLower === ''
			? passwords
			: passwords.filter(
					(password) =>
						(password?.website?.toLowerCase() || '').includes(searchLower) ||
						(password?.username?.toLowerCase() || '').includes(searchLower)
			  );
	}, [passwords, searchTerm]);

	const handleDelete = async (id) => {
		try {
			await passwordService.deletePassword(id);
			setPasswords(passwords.filter((p) => p.id !== id));
		} catch (error) {
			console.error('Failed to delete password:', error);
		}
	};

	const handleEdit = (password) => {
		setEditingPassword(password);
	};

	return (
		<Box>
			<TextField
				fullWidth
				variant='outlined'
				placeholder='Search by website or username...'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				sx={{
					mb: 3,
					'& .MuiOutlinedInput-root': {
						backgroundColor: 'white',
					},
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Search color='action' />
						</InputAdornment>
					),
				}}
			/>

			{filteredPasswords.length === 0 ? (
				<Box
					sx={{
						textAlign: 'center',
						py: 4,
						backgroundColor: 'white',
						borderRadius: 2,
					}}
				>
					<Typography color='textSecondary'>No passwords added yet!</Typography>
				</Box>
			) : (
				<Grid container spacing={2}>
					{filteredPasswords.map((password) => (
						<Grid item xs={12} md={6} key={password.id}>
							<Card
								elevation={0}
								sx={{
									borderRadius: 2,
									transition: 'transform 0.2s ease-in-out',
									'&:hover': {
										transform: 'translateY(-2px)',
									},
								}}
							>
								<CardContent>
									<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
										<Typography variant='h6'>{password.website}</Typography>
										<Chip
											label={getPasswordStrengthLabel(
												calculatePasswordStrength(decryptedPasswords[password.id])
											)}
											color={
												calculatePasswordStrength(decryptedPasswords[password.id]) > 75
													? 'success'
													: 'error'
											}
											size='small'
											sx={{ textTransform: 'capitalize' }}
										/>
									</Box>

									<Typography color='textSecondary' gutterBottom>
										{password.credential}
									</Typography>

									<form>
										<TextField
											type={showPassword[password.id] ? 'text' : 'password'}
											value={decryptedPasswords[password.id] || '••••••••'}
											InputProps={{
												readOnly: true,
												endAdornment: (
													<InputAdornment position='end'>
														<IconButton
															size='small'
															onClick={() => handleTogglePassword(password.id)}
															sx={{ mr: 0.5 }}
														>
															{showPassword[password.id] ? <VisibilityOff /> : <Visibility />}
														</IconButton>
														<IconButton
															size='small'
															onClick={() => handleCopyPassword(decryptedPasswords[password.id])}
															sx={{ mr: 0.5 }}
														>
															<ContentCopy />
														</IconButton>
													</InputAdornment>
												),
											}}
											fullWidth
											variant='outlined'
											size='small'
											autoComplete='off'
											sx={{
												'& .MuiOutlinedInput-root': {
													backgroundColor: 'white',
												},
											}}
										/>
									</form>

									<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
										<Typography variant='caption' color='textSecondary'>
											{password.lastUpdated
												? `Updated: ${new Date(password.lastUpdated).toLocaleDateString('en-US', {
														year: 'numeric',
														month: 'short',
														day: 'numeric',
												  })}`
												: `Created: ${new Date(password.createdAt).toLocaleDateString('en-US', {
														year: 'numeric',
														month: 'short',
														day: 'numeric',
												  })}`}
										</Typography>
										<Box>
											<IconButton size='small' sx={{ mr: 0.5 }} onClick={() => handleEdit(password)}>
												<Edit />
											</IconButton>
											<IconButton size='small' color='error' onClick={() => handleDelete(password.id)}>
												<Delete />
											</IconButton>
										</Box>
									</Box>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			)}
			<EditPasswordModal
				open={Boolean(editingPassword)}
				onClose={() => setEditingPassword(null)}
				passwordData={
					editingPassword
						? {
								...editingPassword,
								password: decryptedPasswords[editingPassword.id] || '',
						  }
						: null
				}
			/>
		</Box>
	);
};

export default PasswordList;
