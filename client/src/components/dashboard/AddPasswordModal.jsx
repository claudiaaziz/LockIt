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
import { useContext, useState } from 'react';
import { passwordService } from '../../services/passwordService';
import { PasswordContext } from '../../context/PasswordContext';

const AddPasswordModal = ({ open, onClose }) => {
	const { passwords, setPasswords } = useContext(PasswordContext);

	const [formData, setFormData] = useState({
		website: '',
		credential: '',
		password: '',
		category: '',
	});
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

	const handleSubmit = async () => {
		try {
			const newPassword = await passwordService.addPassword({
				...formData,
				strength: passwordStrength > 75 ? 'strong' : 'weak',
			});
			setPasswords([...passwords, newPassword]);
			onClose();
		} catch (error) {
			console.error('Failed to add password:', error);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
			<DialogTitle>Add New Password</DialogTitle>
			<DialogContent>
				<Box sx={{ mt: 2 }}>
					<TextField
						fullWidth
						label='Website'
						name='website'
						value={formData.website}
						onChange={handleChange}
						margin='normal'
					/>
					<TextField
						fullWidth
						label='Username/Email'
						name='credential'
						value={formData.credential}
						onChange={handleChange}
						margin='normal'
					/>
					<TextField
						fullWidth
						label='Password'
						name='password'
						type='password'
						value={formData.password}
						onChange={handleChange}
						margin='normal'
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
				<Button onClick={handleSubmit} variant='contained' color='primary'>
					Save Password
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddPasswordModal;
