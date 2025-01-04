import { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button, Paper } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PasswordList from './PasswordList';
import AddPasswordModal from './AddPasswordModal';

const Dashboard = () => {
	const [stats] = useState({
		totalPasswords: 12,
		weakPasswords: 3,
		reusedPasswords: 2,
	});
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	return (
		<Box>
			<Paper
				elevation={0}
				sx={{
					p: 3,
					mb: 3,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					bgcolor: 'white',
					borderRadius: 2,
				}}
			>
				<Typography variant='h4' component='h1' sx={{ fontWeight: 500 }}>
					Password Manager
				</Typography>
				<Button
					variant='contained'
					startIcon={<AddIcon />}
					color='primary'
					onClick={() => setIsAddModalOpen(true)}
					sx={{ px: 3, py: 1 }}
				>
					Add Password
				</Button>
			</Paper>

			<Grid container spacing={3} sx={{ mb: 4 }}>
				<Grid item xs={12} sm={6} md={4}>
					<Card elevation={0} sx={{ borderRadius: 2 }}>
						<CardContent sx={{ p: 3 }}>
							<Typography color='textSecondary' gutterBottom variant='subtitle2'>
								Total Passwords
							</Typography>
							<Typography variant='h3' sx={{ fontWeight: 500 }}>
								{stats.totalPasswords}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<Card elevation={0} sx={{ borderRadius: 2 }}>
						<CardContent sx={{ p: 3 }}>
							<Typography color='textSecondary' gutterBottom variant='subtitle2'>
								Weak Passwords
							</Typography>
							<Typography variant='h3' color='error' sx={{ fontWeight: 500 }}>
								{stats.weakPasswords}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<Card elevation={0} sx={{ borderRadius: 2 }}>
						<CardContent sx={{ p: 3 }}>
							<Typography color='textSecondary' gutterBottom variant='subtitle2'>
								Reused Passwords
							</Typography>
							<Typography variant='h3' color='warning.main' sx={{ fontWeight: 500 }}>
								{stats.reusedPasswords}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			<Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
				<Typography variant='h5' sx={{ mb: 3, fontWeight: 500 }}>
					Your Passwords
				</Typography>
				<PasswordList />
			</Paper>

			<AddPasswordModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
		</Box>
	);
};

export default Dashboard;
