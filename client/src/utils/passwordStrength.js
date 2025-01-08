export const calculatePasswordStrength = (password) => {
	let strength = 0;
	if (!password) return 0;

	// Length check
	if (password.length >= 8) strength += 25;

	// Character type checks
	if (password.match(/[A-Z]/)) strength += 25; // Has uppercase
	if (password.match(/[0-9]/)) strength += 25; // Has number
	if (password.match(/[!@#$%^&*]/)) strength += 25; // Has special char

	return strength;
};

export const getPasswordStrengthLabel = (strength) => {
	return strength > 75 ? 'strong' : 'weak';
};
