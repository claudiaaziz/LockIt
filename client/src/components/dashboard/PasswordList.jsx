import { useState, useEffect, useMemo, useContext } from 'react';
import { Box, Grid, Typography, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { passwordService } from '../../services/passwordService';
import EditPasswordModal from './EditPasswordModal';
import PasswordCard from './PasswordCard';
import { PasswordContext } from '../../context/PasswordContext';

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
						backgroundColor: 'background.paper',
						'&:hover': {
							backgroundColor: '#27272A',
						},
					},
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Search sx={{ color: 'text.secondary' }} />
						</InputAdornment>
					),
				}}
			/>

			{filteredPasswords.length === 0 ? (
				<Box
					sx={{
						textAlign: 'center',
						py: 4,
						backgroundColor: 'background.paper',
						borderRadius: 2,
						border: '1px solid',
						borderColor: 'divider',
						minHeight: '400px',
					}}
				>
					<Typography color='text.secondary'>Nothing here yet. Add a new password?</Typography>
				</Box>
			) : (
				<Grid container spacing={2}>
					{filteredPasswords.map((password) => (
						<Grid item xs={12} md={6} key={password.id}>
							<PasswordCard
								password={password}
								decryptedPassword={decryptedPasswords[password.id]}
								showPassword={showPassword[password.id]}
								onTogglePassword={() => handleTogglePassword(password.id)}
								onCopy={handleCopyPassword}
								onEdit={handleEdit}
								onDelete={handleDelete}
							/>
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
