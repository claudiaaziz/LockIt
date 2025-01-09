import { useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthContext, AuthContextProvider } from './context/AuthContext';

axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

const Dashboard = () => {
	const { user, loggedIn, checkLoginState } = useContext(AuthContext);
	// const [posts, setPosts] = useState([]);
	useEffect(() => {
		(async () => {
			if (loggedIn === true) {
				try {
					// Get passwords of user from server
					// const {
					// 	data: { posts },
					// } = await axios.get(`${serverUrl}/user/posts`);
					// setPosts(posts);
				} catch (err) {
					console.error(err);
				}
			}
		})();
	}, [loggedIn]);

	return (
		<>
			<h3>Dashboard</h3>
			<button className='btn' onClick={handleLogout}>
				Logout
			</button>
			<h4>{user?.name}</h4>
			<br />
			<p>{user?.email}</p>
			<br />
			<img src={user?.picture} alt={user?.name} />
			<br />
			<div>
				{posts.map((post, idx) => (
					<div>
						<h5>{post?.title}</h5>
						<p>{post?.body}</p>
					</div>
				))}
			</div>
		</>
	);
};

const handleLogout = async () => {
	try {
		await axios.post(`${serverUrl}/auth/logout`);
		// Check login state again
		checkLoginState();
	} catch (err) {
		console.error(err);
	}
};

const Login = () => {
	const handleLogin = async () => {
		try {
			// Gets authentication url from backend server
			const {
				data: { url },
			} = await axios.get(`${serverUrl}/auth/url`);
			// Navigate to consent screen
			window.location.assign(url);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<>
			<h3>Login to Dashboard</h3>
			<button className='btn' onClick={handleLogin}>
				Login
			</button>
		</>
	);
};

const Callback = () => {
	const called = useRef(false);
	const { checkLoginState, loggedIn } = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		(async () => {
			if (loggedIn === false) {
				try {
					if (called.current) return; // prevent rerender caused by StrictMode
					called.current = true;
					const res = await axios.get(`${serverUrl}/auth/token${window.location.search}`);
					console.log('response from callback: ', res);
					checkLoginState();
					navigate('/');
				} catch (err) {
					console.error(err);
					navigate('/');
				}
			} else if (loggedIn === true) {
				navigate('/');
			}
		})();
	}, [checkLoginState, loggedIn, navigate]);
	return <></>;
};

const Home = () => {
	const { loggedIn } = useContext(AuthContext);
	if (loggedIn === true) return <Dashboard />;
	if (loggedIn === false) return <Login />;
	return <></>;
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/auth/callback', // google will redirect here
		element: <Callback />,
	},
]);

import { ThemeProvider, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import { PasswordProvider } from './context/PasswordContext';
import { theme } from './theme';
import Dashboard from './components/dashboard/Dashboard';
export default function App() {
	return (
		<AuthContextProvider>
			<RouterProvider router={router} />
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
		</AuthContextProvider>
	);
}
