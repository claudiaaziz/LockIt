import { createContext } from 'react';
import { usePasswords } from '../hooks/usePasswords';

export const PasswordContext = createContext(null);

export const PasswordProvider = ({ children }) => {
	const passwordState = usePasswords();

	return <PasswordContext.Provider value={passwordState}>{children}</PasswordContext.Provider>;
};
