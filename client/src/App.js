import { ThemeProvider, CssBaseline } from '@mui/material';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import { PasswordProvider } from './context/PasswordContext';
import { theme } from './theme';

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
