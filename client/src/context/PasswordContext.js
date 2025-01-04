import { createContext, useState } from 'react';

export const PasswordContext = createContext(null);

export const PasswordProvider = ({ children }) => {
	const [passwords, setPasswords] = useState([]);

	const value = {
		passwords,
		setPasswords,
	};

	return <PasswordContext.Provider value={value}>{children}</PasswordContext.Provider>;
};
