import { Box, Typography, Button } from '@mui/material';
import { LockOpen } from '@mui/icons-material';

export default function EmptyState({ onAddPassword }) {
	return (
		<Box
			sx={{
				textAlign: 'center',
				py: 8,
				backgroundColor: 'background.paper',
				borderRadius: 2,
				border: '1px solid',
				borderColor: 'divider',
				minHeight: '400px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 2,
			}}
		>
			<LockOpen sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
			<Typography color='text.secondary' variant='h6' sx={{ mb: 1 }}>
				No passwords yet
			</Typography>
			<Typography color='text.secondary' variant='body2' sx={{ mb: 3 }}>
				Add your first password to get started
			</Typography>
			<Button variant='contained' onClick={onAddPassword} sx={{ px: 4 }}>
				Add Password
			</Button>
		</Box>
	);
}
