import crypto from 'crypto';
import { config } from '../config/index.js';

const algorithm = 'aes-256-ctr';
const secretKey = crypto.scryptSync(config.auth.tokenSecret, 'salt', 32);

export const encrypt = (text) => {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
	const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
	return {
		iv: iv.toString('hex'),
		password: encrypted.toString('hex'),
	};
};

export const decrypt = ({ password, iv }) => {
	const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
	const decrypted = Buffer.concat([decipher.update(Buffer.from(password, 'hex')), decipher.final()]);
	return decrypted.toString();
};
