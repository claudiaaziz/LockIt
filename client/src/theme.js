import { createTheme } from '@mui/material';

export const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#FADADD',
			light: '#FDECEF',
			dark: '#F4C2C2',
		},
		secondary: {
			main: '#EC4899',
		},
		error: {
			main: '#EF4444',
		},
		success: {
			main: '#10B981',
		},
		background: {
			default: '#09090B',
			paper: '#18181B',
		},
		text: {
			primary: '#FAFAFA',
			secondary: '#71717A',
		},
		divider: 'rgba(113, 113, 122, 0.1)',
	},
	shape: {
		borderRadius: 12,
	},
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					backgroundImage: 'none',
					backgroundColor: '#18181B',
					'&:hover': {
						backgroundColor: '#27272A',
					},
					borderColor: '#27272A',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: 8,
					fontWeight: 500,
					transition: 'all 0.2s ease-in-out',
				},
				contained: {
					backgroundColor: 'primary.main',
					color: 'background.paper',
					'&:hover': {
						backgroundColor: 'primary.dark',
						boxShadow: '0 0 20px rgba(250, 218, 221, 0.25)',
						transform: 'translateY(-1px)',
					},
				},
				outlined: {
					borderColor: 'primary.main',
					color: 'primary.main',
					'&:hover': {
						backgroundColor: 'rgba(250, 218, 221, 0.1)',
						borderColor: 'primary.light',
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					backgroundColor: '#18181B',
					'&:hover': {
						backgroundColor: '#27272A',
					},
					'& input:-webkit-autofill': {
						WebkitBoxShadow: '0 0 0 100px #18181B inset',
						WebkitTextFillColor: '#FAFAFA',
						caretColor: '#FAFAFA',
						borderRadius: 'inherit',
					},
					'& input:-webkit-autofill:hover': {
						WebkitBoxShadow: '0 0 0 100px #27272A inset',
					},
					'& input:-webkit-autofill:focus': {
						WebkitBoxShadow: '0 0 0 100px #27272A inset',
					},
				},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				asterisk: {
					display: 'none',
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					fontWeight: 500,
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					backgroundColor: '#18181B',
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				'*': {
					userSelect: 'none',
				},
				'input, textarea, [contenteditable="true"]': {
					userSelect: 'text',
				},
			},
		},
	},
});
