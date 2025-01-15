import { useState, useMemo, useContext } from 'react';
import { Box, Grid, Typography, InputAdornment, TextField, Button, Skeleton, Select, MenuItem, FormControl } from '@mui/material';
import { Search, LockOpen, FilterList } from '@mui/icons-material';
import { passwordService } from '../../services/passwordService';
import EditPasswordModal from './EditPasswordModal';
import PasswordCard from './PasswordCard';
import { PasswordContext } from '../../context/PasswordContext';
import toast from 'react-hot-toast';

const PasswordList = ({ onAddPassword }) => {
	const { passwords, setPasswords, decryptedPasswords, loading } = useContext(PasswordContext);

	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [showPassword, setShowPassword] = useState({});
	const [editingPassword, setEditingPassword] = useState(null);

	const handleCopyPassword = (password) => {
		navigator.clipboard.writeText(password);
		toast.success('Password copied to clipboard', {
			duration: 2000,
			icon: '🔑',
		});
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

		return passwords.filter((password) => {
			// Search filter
			const matchesSearch =
				searchLower === '' ||
				(password?.website?.toLowerCase() || '').includes(searchLower) ||
				(password?.credential?.toLowerCase() || '').includes(searchLower);

			// Category filter
			const matchesCategory = selectedCategory === 'all' || password.category === selectedCategory;

			// Return true only if both conditions are met
			return matchesSearch && matchesCategory;
		});
	}, [passwords, searchTerm, selectedCategory]);

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

	if (loading) {
		return (
			<Box>
				<Skeleton
					variant='rectangular'
					sx={{
						mb: 3,
						height: 56,
						borderRadius: 1,
					}}
				/>
				<Grid container spacing={2}>
					{[1, 2, 3, 4].map((item) => (
						<Grid item xs={12} md={6} key={item}>
							<Skeleton
								variant='rectangular'
								sx={{
									height: 180,
									borderRadius: 2,
								}}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		);
	}

	return (
		<Box>
			<Box
				sx={{
					mb: 3,
					display: 'flex',
					gap: 2,
					alignItems: 'flex-start',
				}}
			>
				<TextField
					fullWidth
					variant='outlined'
					placeholder='Search by website or username...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					sx={{
						flex: 8,
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
				<FormControl sx={{ flex: 1 }}>
					<Select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						displayEmpty
						variant='outlined'
						startAdornment={<FilterList sx={{ mr: 1, color: 'text.secondary' }} />}
						sx={{
							backgroundColor: 'background.paper',
							width: '100%',
							'&:hover': {
								backgroundColor: '#27272A',
							},
							'& .Mui-selected': {
								color: 'primary.main !important',
							},
						}}
					>
						<MenuItem
							value='all'
							sx={{
								'&:hover': { color: 'primary.main' },
								'&.Mui-selected': { color: 'primary.main' },
							}}
						>
							All
						</MenuItem>
						<MenuItem
							value='social'
							sx={{
								'&:hover': { color: 'primary.main' },
								'&.Mui-selected': { color: 'primary.main' },
							}}
						>
							Social
						</MenuItem>
						<MenuItem
							value='finance'
							sx={{
								'&:hover': { color: 'primary.main' },
								'&.Mui-selected': { color: 'primary.main' },
							}}
						>
							Finance
						</MenuItem>
						<MenuItem
							value='work'
							sx={{
								'&:hover': { color: 'primary.main' },
								'&.Mui-selected': { color: 'primary.main' },
							}}
						>
							Work
						</MenuItem>
						<MenuItem
							value='personal'
							sx={{
								'&:hover': { color: 'primary.main' },
								'&.Mui-selected': { color: 'primary.main' },
							}}
						>
							Personal
						</MenuItem>
					</Select>
				</FormControl>
			</Box>

			{filteredPasswords.length === 0 ? (
				<Box
					sx={{
						textAlign: 'center',
						py: 8,
						backgroundColor: 'background.paper',
						borderRadius: 2,
						border: '1px solid',
						borderColor: 'divider',
						minHeight: '400px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 2,
					}}
				>
					<LockOpen sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
					<Typography color='text.secondary' variant='h6' sx={{ mb: 1 }}>
						No passwords yet
					</Typography>
					<Typography color='text.secondary' variant='body2' sx={{ mb: 3 }}>
						Add your first password to get started
					</Typography>
					<Button variant='contained' onClick={onAddPassword} sx={{ px: 4 }}>
						Add Password
					</Button>
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
