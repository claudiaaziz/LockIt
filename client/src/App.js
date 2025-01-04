import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import { PasswordProvider } from './context/PasswordContext';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#2196f3',
			dark: '#1976d2',
			light: '#64b5f6',
		},
		secondary: {
			main: '#f50057',
		},
		background: {
			default: '#f5f5f5',
			paper: '#ffffff',
		},
	},
	shape: {
		borderRadius: 8,
	},
	typography: {
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
		h4: {
			fontWeight: 500,
		},
		h5: {
			fontWeight: 500,
		},
		h6: {
			fontWeight: 500,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: 8,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 8,
				},
			},
		},
	},
});

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<PasswordProvider>
				<Layout>
					<Dashboard />
				</Layout>
			</PasswordProvider>
		</ThemeProvider>
	);
}
