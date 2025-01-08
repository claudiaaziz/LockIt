import { ThemeProvider, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import { PasswordProvider } from './context/PasswordContext';
import { theme } from './theme';

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Toaster
				position='bottom-right'
				toastOptions={{
					style: {
						background: '#27272A',
						color: '#FAFAFA',
						border: '1px solid rgba(250, 218, 221, 0.1)',
					},
					success: {
						iconTheme: {
							primary: '#FADADD',
							secondary: '#27272A',
						},
					},
				}}
			/>
			<PasswordProvider>
				<Layout>
					<Dashboard />
				</Layout>
			</PasswordProvider>
		</ThemeProvider>
	);
}
