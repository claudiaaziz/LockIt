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
			color: 'black',
			fontWeight: '500',
			border: '1px solid rgba(255, 182, 193, 0.3)',
			display: 'flex',
			gap: 1,
			alignItems: 'center',
			'&:hover': {
				backgroundColor: 'primary.dark',
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
				color: 'primary.dark',
				backgroundColor: 'transparent',
			},
		},
	},
	outlined: {
		variant: 'outlined',
		sx: {
			textTransform: 'none',
			borderRadius: 2,
			color: 'primary.main',
			borderColor: 'primary.main',
			'&:hover': {
				borderColor: 'primary.dark',
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
