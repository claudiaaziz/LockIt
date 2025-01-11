import { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(null);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const checkLoginState = useCallback(async () => {
		try {
			const {
				data: { loggedIn: logged_in, user },
			} = await axios.get(`${serverUrl}/auth/logged_in`);
			setLoggedIn(logged_in);
			user && setUser(user);
		} catch (err) {
			console.error(err);
			setLoggedIn(false);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		checkLoginState();
	}, [checkLoginState]);

	return (
		<AuthContext.Provider value={{ checkLoginState, loggedIn, setLoggedIn, user, setUser, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};
