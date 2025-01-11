import { toast } from 'react-hot-toast';

export const validatePasswordForm = (formData, passwordStrength) => {
	const validations = [
		{
			condition: !formData.website.trim(),
			message: 'Website is required',
		},
		{
			condition: !formData.credential.trim(),
			message: 'Username/Email is required',
		},
		{
			condition: !formData.password.trim(),
			message: 'Password is required',
		},
		{
			condition: !formData.category,
			message: 'Please select a category',
		},
		{
			condition: passwordStrength <= 50,
			message: 'Please use a stronger password',
		},
	];

	for (const validation of validations) {
		if (validation.condition) {
			toast.error(validation.message);
			return false;
		}
	}

	return true;
};
