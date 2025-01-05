import { createContext, useState } from 'react';

/**
 * @typedef {Object} Password
 * @property {number} id - Unique identifier
 * @property {string} website - Website
 * @property {string} credential - Username or email
 * @property {string} password - Encrypted password string
 * @property {string} iv - Initialization vector for decryption
 * @property {string} category - Password category (social, finance, work, personal)
 * @property {string} lastUpdated - Timestamp of last update
 */
export const PasswordContext = createContext(null);

export const PasswordProvider = ({ children }) => {
	/**
	 * Array of password objects from the database
	 * Each object contains encrypted password data and metadata
	 * @type {Password[]}
	 */
	const [passwords, setPasswords] = useState([]);

	/**
	 * Object mapping password IDs to their decrypted values
	 * @type {Object.<number, string>}
	 * @example
	 * {
	 *   1: "actualDecryptedPassword123",
	 *   2: "anotherDecryptedPassword456"
	 * }
	 */
	const [decryptedPasswords, setDecryptedPasswords] = useState({});

	const value = {
		passwords,
		setPasswords,
		decryptedPasswords,
		setDecryptedPasswords,
	};

	return <PasswordContext.Provider value={value}>{children}</PasswordContext.Provider>;
};
