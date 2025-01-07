import { Card, CardContent, Typography, Box, IconButton, InputAdornment, TextField, Chip, Divider } from '@mui/material';
import { Visibility, VisibilityOff, ContentCopy, Edit, Delete, Link } from '@mui/icons-material';
import { calculatePasswordStrength, getPasswordStrengthLabel } from '../../utils/passwordStrength';

const PasswordCard = ({ password, decryptedPassword, showPassword, onTogglePassword, onCopy, onEdit, onDelete }) => {
	return (
		<Card
			elevation={0}
			sx={{
				borderRadius: 2,
				transition: 'all 0.2s ease-in-out',
				'&:hover': {
					transform: 'translateY(-2px)',
					boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
				},
				border: '1px solid',
				borderColor: 'divider',
			}}
		>
			<CardContent sx={{ p: '24px !important' }}>
				{/* Header */}
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
					<Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
						<Box>
							<Typography variant='h6' sx={{ mb: 0.5, color: 'text.primary' }}>
								{password.website}
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								{password.credential}
							</Typography>
						</Box>
					</Box>
					<Chip
						label={getPasswordStrengthLabel(calculatePasswordStrength(decryptedPassword))}
						color={calculatePasswordStrength(decryptedPassword) > 75 ? 'success' : 'error'}
						size='small'
						sx={{
							textTransform: 'capitalize',
							fontWeight: 500,
							borderRadius: 1,
						}}
					/>
				</Box>

				{/* Password Field */}
				<form>
					<TextField
						type={showPassword ? 'text' : 'password'}
						value={decryptedPassword || '••••••••'}
						InputProps={{
							readOnly: true,
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										size='small'
										onClick={onTogglePassword}
										sx={{
											mr: 0.5,
											color: showPassword ? 'primary.main' : 'text.secondary',
										}}
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
									<IconButton
										size='small'
										onClick={() => onCopy(decryptedPassword)}
										sx={{
											mr: 0.5,
											'&:hover': { color: 'primary.main' },
										}}
									>
										<ContentCopy />
									</IconButton>
								</InputAdornment>
							),
						}}
						fullWidth
						variant='outlined'
						size='small'
						autoComplete='off'
						sx={{
							'& .MuiOutlinedInput-root': {
								borderRadius: 1.5,
								'&:hover': {
									'& > fieldset': {
										borderColor: 'primary.main',
									},
								},
							},
						}}
					/>
				</form>

				<Divider sx={{ my: 2 }} />

				{/* Footer */}
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant='caption' color='text.secondary'>
						{password.lastUpdated
							? `Updated: ${new Date(password.lastUpdated).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric',
							  })}`
							: `Created: ${new Date(password.createdAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric',
							  })}`}
					</Typography>
					<Box>
						<IconButton
							size='small'
							sx={{
								mr: 1,
								'&:hover': { color: 'primary.main' },
							}}
							onClick={() => onEdit(password)}
						>
							<Edit fontSize='small' />
						</IconButton>
						<IconButton
							size='small'
							sx={{
								'&:hover': { color: 'error.main' },
							}}
							onClick={() => onDelete(password.id)}
						>
							<Delete fontSize='small' />
						</IconButton>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

export default PasswordCard;
