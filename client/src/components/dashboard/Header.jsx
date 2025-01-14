import { Typography, Box, Paper, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useState } from 'react';

export default function Header({ user, onLogout }) {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

	const handleLogout = () => {
		handleMenuClose();
		onLogout();
	};

	return (
		<Paper
			elevation={0}
			sx={{
				p: 3,
				mb: 3,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				bgcolor: 'background.paper',
				borderRadius: 2,
				border: '1px solid',
				borderColor: 'divider',
			}}
		>
			<Typography variant='h4' component='h1' sx={{ fontWeight: 500, color: 'primary.main' }}>
				Lockit
			</Typography>

			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				{user?.picture && (
					<>
						<IconButton onClick={handleMenuOpen}>
							<Avatar src={user.picture} alt={user.name} sx={{ width: 35, height: 35 }} />
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
						>
							<MenuItem sx={{ minWidth: 150, cursor: 'default' }}>
								<Typography variant='body2' color='text.secondary'>
									{user.name}
								</Typography>
							</MenuItem>
							<MenuItem onClick={handleLogout} sx={{ minWidth: 150 }}>
								<Typography variant='body2' color='text.secondary'>
									Logout
								</Typography>
							</MenuItem>
						</Menu>
					</>
				)}
			</Box>
		</Paper>
	);
}
