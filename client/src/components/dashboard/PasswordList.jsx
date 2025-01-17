import { useState, useMemo, useContext } from 'react';
import { Box, Skeleton, Grid } from '@mui/material';
import { passwordService } from '../../services/passwordService';
import { PasswordContext } from '../../context/PasswordContext';
import toast from 'react-hot-toast';
import ConfirmDialog from '../common/ConfirmDialog';
import SearchAndFilter from './SearchAndFilter';
import EmptyState from './EmptyState';
import PasswordGrid from './PasswordGrid';
import EditPasswordModal from './EditPasswordModal';

export default function PasswordList({ onAddPassword }) {
	const { passwords, setPasswords, decryptedPasswords, loading } = useContext(PasswordContext);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [showPassword, setShowPassword] = useState({});
	const [editingPassword, setEditingPassword] = useState(null);
	const [deleteConfirm, setDeleteConfirm] = useState(null);

	const handleCopyPassword = (password) => {
		navigator.clipboard.writeText(password);
		toast.success('Password copied to clipboard', { duration: 2000, icon: '🔑' });
	};

	const handleTogglePassword = (id) => {
		setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const filteredPasswords = useMemo(() => {
		const searchLower = searchTerm.toLowerCase().trim();
		return passwords.filter((password) => {
			const matchesSearch =
				searchLower === '' ||
				(password?.website?.toLowerCase() || '').includes(searchLower) ||
				(password?.credential?.toLowerCase() || '').includes(searchLower);
			const matchesCategory = selectedCategory === 'all' || password.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}, [passwords, searchTerm, selectedCategory]);

	const handleDelete = (id) => setDeleteConfirm(id);
	const handleEdit = (password) => setEditingPassword(password);

	const handleConfirmDelete = async () => {
		try {
			await passwordService.deletePassword(deleteConfirm);
			setPasswords(passwords.filter((p) => p.id !== deleteConfirm));
			toast.success('Password deleted successfully');
		} catch (error) {
			console.error('Failed to delete password:', error);
			toast.error('Failed to delete password');
		} finally {
			setDeleteConfirm(null);
		}
	};

	if (loading) {
		return (
			<Box>
				<Skeleton variant='rectangular' sx={{ mb: 3, height: 56, borderRadius: 1 }} />
				<Grid container spacing={2}>
					{[1, 2, 3, 4].map((item) => (
						<Grid item xs={12} md={6} key={item}>
							<Skeleton variant='rectangular' sx={{ height: 180, borderRadius: 2 }} />
						</Grid>
					))}
				</Grid>
			</Box>
		);
	}

	return (
		<Box>
			<SearchAndFilter
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>

			{filteredPasswords.length === 0 ? (
				<EmptyState onAddPassword={onAddPassword} />
			) : (
				<PasswordGrid
					passwords={filteredPasswords}
					decryptedPasswords={decryptedPasswords}
					showPassword={showPassword}
					onTogglePassword={handleTogglePassword}
					onCopy={handleCopyPassword}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
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

			<ConfirmDialog
				open={Boolean(deleteConfirm)}
				onClose={() => setDeleteConfirm(null)}
				onConfirm={handleConfirmDelete}
				title='Delete Password'
				message='Are you sure you want to delete this password? This action cannot be undone.'
			/>
		</Box>
	);
}
