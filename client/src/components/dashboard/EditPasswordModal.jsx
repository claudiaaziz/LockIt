import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
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
const EditPasswordModal = ({ open, onClose, passwordData }) => {
	const { passwords, setPasswords, decryptedPasswords, setDecryptedPasswords } = useContext(PasswordContext);

	const [formData, setFormData] = useState({
		website: '',
		credential: '',
		password: '',
		category: '',
	});

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
		try {
			const updatedPassword = await passwordService.updatePassword(passwordData.id, {
				...formData,
			});

			setPasswords(
				passwords.map((password) =>
					password.id === passwordData.id ? { ...updatedPassword, id: passwordData.id } : password
				)
			);

			setDecryptedPasswords({
				...decryptedPasswords,
				[passwordData.id]: formData.password,
			});

			onClose();
		} catch (error) {
			console.error('Failed to update password:', error);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
			<DialogTitle>Edit Password</DialogTitle>
			<form onSubmit={handleSubmit}>
				<DialogContent>
					<Box sx={{ mt: 2 }}>
						<TextField
							fullWidth
							label='Website'
							name='website'
							value={formData.website}
							onChange={handleChange}
							margin='normal'
							required
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
							type='password'
							value={formData.password}
							onChange={handleChange}
							margin='normal'
							required
							autoComplete='current-password'
							InputLabelProps={{ required: false }}
						/>

						<Box sx={{ mt: 2, mb: 2 }}>
							<Typography variant='caption'>Password Strength</Typography>
							<LinearProgress
								variant='determinate'
								value={passwordStrength}
								color={passwordStrength > 75 ? 'success' : passwordStrength > 50 ? 'warning' : 'error'}
							/>
						</Box>

						<FormControl fullWidth margin='normal'>
							<InputLabel>Category</InputLabel>
							<Select name='category' value={formData.category} onChange={handleChange} label='Category'>
								<MenuItem value='social'>Social Media</MenuItem>
								<MenuItem value='finance'>Finance</MenuItem>
								<MenuItem value='work'>Work</MenuItem>
								<MenuItem value='personal'>Personal</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button type='submit' variant='contained' color='primary'>
						Save Changes
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default EditPasswordModal;
