// import { createContext, useState, useCallback, useEffect } from 'react';
// import axios from 'axios';

// axios.defaults.withCredentials = true;

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
// 	const [loggedIn, setLoggedIn] = useState(null);
// 	const [user, setUser] = useState(null);

// 	const checkLoginState = useCallback(async () => {
// 		try {
// 			const {
// 				data: { loggedIn: logged_in, user },
// 			} = await axios.get(`http://localhost:5001/auth/logged_in`);
// 			setLoggedIn(logged_in);
// 			user && setUser(user);
// 		} catch (err) {
// 			console.error(err);
// 		}
// 	}, []);

// 	useEffect(() => {
// 		checkLoginState();
// 	}, [checkLoginState]);

// 	return <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>{children}</AuthContext.Provider>;
// };
