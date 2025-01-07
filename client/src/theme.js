import { createTheme } from '@mui/material';

export const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#FADADD',
			light: '#FDECEF',
			dark: '#F8B7C5',
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
						'-webkit-box-shadow': '0 0 0 100px #18181B inset',
						'-webkit-text-fill-color': '#FAFAFA',
						'caret-color': '#FAFAFA',
						'border-radius': 'inherit',
					},
					'& input:-webkit-autofill:hover': {
						'-webkit-box-shadow': '0 0 0 100px #27272A inset',
					},
					'& input:-webkit-autofill:focus': {
						'-webkit-box-shadow': '0 0 0 100px #27272A inset',
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
	},
});
