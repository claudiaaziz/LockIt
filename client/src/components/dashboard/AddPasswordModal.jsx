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
import { useContext, useState } from 'react';
import { passwordService } from '../../services/passwordService';
import { PasswordContext } from '../../context/PasswordContext';
import Button from '../common/Button';
import { toast } from 'react-hot-toast';
import { validatePasswordForm } from '../../utils/validation';
import { passwordCategories, initialPasswordFormState } from '../../config/formConfig';

const AddPasswordModal = ({ open, onClose }) => {
	const { passwords, setPasswords, decryptedPasswords, setDecryptedPasswords } = useContext(PasswordContext);

	const [formData, setFormData] = useState(initialPasswordFormState);
	const [passwordStrength, setPasswordStrength] = useState(0);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (name === 'password') {
			let strength = 0;
			if (value.length >= 8) strength += 25;
			if (value.match(/[A-Z]/)) strength += 25;
			if (value.match(/[0-9]/)) strength += 25;
			if (value.match(/[!@#$%^&*]/)) strength += 25;
			setPasswordStrength(strength);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validatePasswordForm(formData, passwordStrength)) return;

		try {
			const newPassword = await passwordService.addPassword({
				...formData,
			});
			setPasswords([...passwords, newPassword]);
			setDecryptedPasswords({
				...decryptedPasswords,
				[newPassword.id]: formData.password,
			});
			toast.success('Password added successfully');
			onClose();
			setFormData(initialPasswordFormState);
		} catch (error) {
			if (error.response?.status === 429) {
				toast.error('Please wait before adding more passwords');
			} else if (error.response?.status === 400) {
				toast.error(error.message || 'Please check your input');
			} else {
				toast.error('Failed to add password');
			}
			console.error('Failed to add password:', error);
		}
	};

	const handleClose = () => {
		setFormData(initialPasswordFormState);
		setPasswordStrength(0);
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
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
				Add New Password
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
							required
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
							required
							autoComplete='new-password'
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
					<Button variant='secondary' onClick={handleClose}>
						Cancel
					</Button>
					<Button type='submit'>Save Password</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default AddPasswordModal;
