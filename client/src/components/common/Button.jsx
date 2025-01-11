import { Button as MuiButton } from '@mui/material';

const buttonStyles = {
	primary: {
		variant: 'contained',
		sx: {
			px: 3,
			py: 1,
			textTransform: 'none',
			borderRadius: 2,
			backgroundColor: 'primary.main',
			color: '#4A4A4A',
			fontWeight: 500,
			border: '1px solid rgba(255, 182, 193, 0.3)',
			'&:hover': {
				backgroundColor: '#FFC0CB',
				boxShadow: '0 2px 8px rgba(255, 182, 193, 0.3)',
			},
		},
	},
	secondary: {
		variant: 'text',
		sx: {
			textTransform: 'none',
			color: 'text.secondary',
			'&:hover': {
				color: '#FFC0CB',
				backgroundColor: 'transparent',
			},
		},
	},
};

export default function Button({ variant = 'primary', children, ...props }) {
	const styleConfig = buttonStyles[variant];

	return (
		<MuiButton {...styleConfig} {...props} sx={{ ...styleConfig.sx, ...props.sx }}>
			{children}
		</MuiButton>
	);
}