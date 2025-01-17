import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import Button from './Button';
import { Warning } from '@mui/icons-material';

export default function ConfirmDialog({ open, onClose, onConfirm, title, message }) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				elevation: 0,
				sx: {
					border: '1px solid',
					borderColor: 'divider',
					maxWidth: '450px',
					width: '100%',
					m: 2,
				},
			}}
		>
			<DialogTitle sx={{ pb: 1 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Warning sx={{ color: 'error.main' }} />
					<Typography variant='h6' component='span'>
						{title || 'Delete Password'}
					</Typography>
				</Box>
			</DialogTitle>

			<DialogContent>
				<Typography color='text.secondary'>
					{message || 'Are you sure you want to delete this password? This action cannot be undone.'}
				</Typography>
			</DialogContent>

			<DialogActions sx={{ p: 2, pt: 1 }}>
				<Button variant='secondary' onClick={onClose} sx={{ color: 'text.secondary' }}>
					Cancel
				</Button>
				<Button
					onClick={onConfirm}
					sx={{
						backgroundColor: 'error.main',
						'&:hover': {
							backgroundColor: 'error.dark',
						},
					}}
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}
