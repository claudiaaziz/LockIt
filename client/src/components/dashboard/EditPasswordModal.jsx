import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	LinearProgress,
	Typography,
} from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { passwordService } from '../../services/passwordService';
import { PasswordContext } from '../../context/PasswordContext';
import Button from '../common/Button';
import { toast } from 'react-hot-toast';
import { validatePasswordForm } from '../../utils/validation';
import { passwordCategories, initialPasswordFormState } from '../../config/formConfig';

const EditPasswordModal = ({ open, onClose, passwordData }) => {
	const { passwords, setPasswords, decryptedPasswords, setDecryptedPasswords } = useContext(PasswordContext);

	const [formData, setFormData] = useState(initialPasswordFormState);

	const [passwordStrength, setPasswordStrength] = useState(0);

	useEffect(() => {
		if (passwordData) {
			setFormData({
				website: passwordData.website || '',
				credential: passwordData.credential || '',
				password: passwordData.password || '',
				category: passwordData.category || '',
			});
			calculatePasswordStrength(passwordData.password);
		}
	}, [passwordData]);

	const calculatePasswordStrength = (password) => {
		let strength = 0;
		if (password.length >= 8) strength += 25;
		if (password.match(/[A-Z]/)) strength += 25;
		if (password.match(/[0-9]/)) strength += 25;
		if (password.match(/[!@#$%^&*]/)) strength += 25;
		setPasswordStrength(strength);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (name === 'password') {
			calculatePasswordStrength(value);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validatePasswordForm(formData, passwordStrength)) return;

		try {
			const updatedPassword = await passwordService.updatePassword(passwordData.id, {
				...formData,
			});

			setPasswords(passwords.map((password) => (password.id === passwordData.id ? updatedPassword : password)));

			setDecryptedPasswords({
				...decryptedPasswords,
				[passwordData.id]: formData.password,
			});

			toast.success('Password updated successfully');
			onClose();
		} catch (error) {
			// Handle specific errors
			if (error.response?.status === 429) {
				toast.error('Please wait before making more changes');
			} else if (error.response?.status === 400) {
				toast.error(error.message || 'Please check your input');
			} else if (error.response?.status === 403) {
				toast.error('Session expired. Please refresh the page');
			} else {
				toast.error('Failed to update password');
			}
			console.error('Failed to update password:', error);
		}
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth='sm'
			fullWidth
			PaperProps={{
				elevation: 0,
				sx: {
					border: '1px solid',
					borderColor: 'divider',
				},
			}}
		>
			<DialogTitle
				sx={{
					borderBottom: '1px solid',
					borderColor: 'divider',
					px: 3,
					py: 2,
				}}
			>
				Edit Password
			</DialogTitle>
			<form onSubmit={handleSubmit}>
				<DialogContent sx={{ p: 3 }}>
					<Box>
						<TextField
							fullWidth
							label='Website'
							name='website'
							value={formData.website}
							onChange={handleChange}
							margin='normal'
							InputLabelProps={{ required: false }}
						/>
						<TextField
							fullWidth
							label='Username/Email'
							name='credential'
							value={formData.credential}
							onChange={handleChange}
							margin='normal'
							autoComplete='username'
							InputLabelProps={{ required: false }}
						/>
						<TextField
							fullWidth
							label='Password'
							name='password'
							type='text'
							value={formData.password}
							onChange={handleChange}
							margin='normal'
							autoComplete='current-password'
							InputLabelProps={{ required: false }}
						/>

						<Box sx={{ mt: 2, mb: 2 }}>
							<Typography variant='caption'>Password Strength</Typography>
							<LinearProgress
								variant='determinate'
								value={passwordStrength}
								color={passwordStrength > 75 ? 'success' : passwordStrength > 50 ? 'warning' : 'error'}
								sx={{ mt: 1 }}
							/>
						</Box>

						<FormControl fullWidth margin='normal'>
							<InputLabel>Category</InputLabel>
							<Select name='category' value={formData.category} onChange={handleChange} label='Category'>
								{passwordCategories.map(({ value, label }) => (
									<MenuItem key={value} value={value}>
										{label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions
					sx={{
						p: 3,
						pt: 0,
						gap: 1,
					}}
				>
					<Button variant='secondary' onClick={onClose}>
						Cancel
					</Button>
					<Button type='submit'>Save Changes</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default EditPasswordModal;
