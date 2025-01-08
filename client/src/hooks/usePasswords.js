import { useState } from 'react';
import { passwordService } from '../services/passwordService';

/**
 * Custom hook for managing password state and operations
 * @returns {Object} Password state and operations
 * @property {Array<Password>} passwords - Array of password objects from the database
 * @property {Function} setPasswords - Function to update passwords array
 * @property {Object.<number, string>} decryptedPasswords - Mapping of password IDs to decrypted values
 * @property {Function} setDecryptedPasswords - Function to update decrypted passwords
 * @property {boolean} loading - Loading state indicator
 * @property {Function} loadPasswords - Function to fetch and decrypt passwords
 */
export const usePasswords = () => {
	/**
	 * @typedef {Object} Password
	 * @property {number} id - Unique identifier
	 * @property {string} website - Website URL or name
	 * @property {string} credential - Username or email
	 * @property {string} password - Encrypted password string
	 * @property {string} iv - Initialization vector for decryption
	 * @property {string} category - Password category (social, finance, work, personal)
	 * @property {string} lastUpdated - Timestamp of last update
	 * @property {string} createdAt - Timestamp of creation
	 */

	/** @type {[Array<Password>, Function]} */
	const [passwords, setPasswords] = useState([]);

	/**
	 * @type {[Object.<number, string>, Function]}
	 * @example
	 * {
	 *   1: "actualDecryptedPassword123",
	 *   2: "anotherDecryptedPassword456"
	 * }
	 */
	const [decryptedPasswords, setDecryptedPasswords] = useState({});

	/** @type {[boolean, Function]} */
	const [loading, setLoading] = useState(true);

	/**
	 * Fetches passwords from the server and decrypts them
	 * @async
	 * @function loadPasswords
	 * @returns {Promise<void>}
	 */
	const loadPasswords = async () => {
		try {
			const data = await passwordService.fetchPasswords();
			const decrypted = {};

			for (const pass of data) {
				try {
					decrypted[pass.id] = await passwordService.decryptPassword({
						password: pass.password,
						iv: pass.iv,
					});
				} catch (err) {
					console.error('Failed to decrypt password:', err);
				}
			}

			setDecryptedPasswords(decrypted);
			setPasswords(data);
		} catch (error) {
			console.error('Failed to fetch passwords:', error);
		} finally {
			setLoading(false);
		}
	};

	return {
		passwords,
		setPasswords,
		decryptedPasswords,
		setDecryptedPasswords,
		loading,
		loadPasswords,
	};
};
