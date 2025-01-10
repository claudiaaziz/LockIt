import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

import { AuthContextProvider } from './context/AuthContext';
import { PasswordProvider } from './context/PasswordContext';
import { theme } from './theme';

import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import Callback from './components/auth/Callback';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';

// Configure axios defaults
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<Layout>
					<Dashboard />
				</Layout>
			</ProtectedRoute>
		),
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/auth/callback',
		element: <Callback />,
	},
]);

export default function App() {
	return (
		<AuthContextProvider>
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
					<RouterProvider router={router} />
				</PasswordProvider>
			</ThemeProvider>
		</AuthContextProvider>
	);
}
