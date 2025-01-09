import { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(null);
	const [user, setUser] = useState(null);

	const checkLoginState = useCallback(async () => {
		try {
			const {
				data: { loggedIn: logged_in, user },
			} = await axios.get(`${serverUrl}/auth/logged_in`);
			console.log('logged_in: ', logged_in);
			setLoggedIn(logged_in);
			user && setUser(user);
		} catch (err) {
			console.error(err);
		}
	}, []);

	useEffect(() => {
		checkLoginState();
	}, [checkLoginState]);

	return <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>{children}</AuthContext.Provider>;
};