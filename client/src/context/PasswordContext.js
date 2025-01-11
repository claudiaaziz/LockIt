import { createContext } from 'react';
import { usePasswords } from '../hooks/usePasswords';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const PasswordContext = createContext();

export function PasswordProvider({ children }) {
	const { user } = useContext(AuthContext);
	const passwordState = usePasswords(user);

	return <PasswordContext.Provider value={passwordState}>{children}</PasswordContext.Provider>;
}
