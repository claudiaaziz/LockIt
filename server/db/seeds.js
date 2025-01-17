import { encrypt } from '../utils/encryption.js';
import pool from '../models/db.js';

const DEMO_USER = {
	id: 999,
	name: 'Demo User',
	email: 'demo@example.com',
	picture: 'https://lh3.googleusercontent.com/demo_picture',
	google_id: 'demo@example.com',
};

const DEMO_PASSWORDS = [
	{
		website: 'Netflix',
		credential: 'demo@netflix.com',
		category: 'personal',
		password: 'NetflixDemo123!',
	},
	{
		website: 'Chase Bank',
		credential: 'demouser',
		category: 'finance',
		password: 'ChaseDemo456!',
	},
	{
		website: 'LinkedIn',
		credential: 'demo.user@professional.com',
		category: 'work',
		password: 'LinkedInDemo789!',
	},
	{
		website: 'Instagram',
		credential: 'demo.user',
		category: 'social',
		password: 'InstaDemo321!',
	},
	{
		website: 'GitHub',
		credential: 'demo.dev',
		category: 'work',
		password: 'GitHubDemo567!',
	},
	{
		website: 'Amazon',
		credential: 'demo.shop@email.com',
		category: 'personal',
		password: 'AmazonDemo890!',
	},
];

async function seedDemoData() {
	try {
		// First clear any existing demo data
		await pool.query('DELETE FROM passwords WHERE user_id = ?', [DEMO_USER.id]);
		await pool.query('DELETE FROM Users WHERE id = ?', [DEMO_USER.id]);

		// Create demo user
		await pool.query('INSERT INTO Users (id, name, email, picture, google_id) VALUES (?, ?, ?, ?, ?)', [
			DEMO_USER.id,
			DEMO_USER.name,
			DEMO_USER.email,
			DEMO_USER.picture,
			DEMO_USER.google_id,
		]);

		// Add demo passwords
		for (const pass of DEMO_PASSWORDS) {
			const { password: encryptedPassword, iv } = encrypt(pass.password);
			await pool.query(
				'INSERT INTO passwords (website, credential, category, password, iv, user_id) VALUES (?, ?, ?, ?, ?, ?)',
				[pass.website, pass.credential, pass.category, encryptedPassword, iv, DEMO_USER.id]
			);
		}

		console.log('Demo data seeded successfully! 🎉');
		process.exit(0);
	} catch (error) {
		console.error('Error seeding demo data:', error);
		process.exit(1);
	}
}

// Run seeder
seedDemoData();
