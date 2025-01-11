import { Grid, Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import { Key, Warning, ContentCopy } from '@mui/icons-material';

export default function Stats({ loading, stats }) {
	if (loading) {
		return (
			<Grid container spacing={3} sx={{ mb: 4 }}>
				{[1, 2, 3].map((item) => (
					<Grid item xs={12} sm={6} md={4} key={item}>
						<Skeleton
							variant='rectangular'
							sx={{
								height: 120,
								borderRadius: 2,
							}}
						/>
					</Grid>
				))}
			</Grid>
		);
	}

	return (
		<Grid container spacing={3} sx={{ mb: 4 }}>
			<Grid item xs={12} sm={6} md={4}>
				<Card elevation={0} sx={{ borderRadius: 2 }}>
					<CardContent sx={{ p: 3 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
							<Key sx={{ color: 'primary.main', mr: 1 }} />
							<Typography color='textSecondary' variant='subtitle2'>
								Total Passwords
							</Typography>
						</Box>
						<Typography variant='h3' sx={{ fontWeight: 500 }}>
							{stats.totalPasswords}
						</Typography>
					</CardContent>
				</Card>
			</Grid>

			<Grid item xs={12} sm={6} md={4}>
				<Card elevation={0} sx={{ borderRadius: 2 }}>
					<CardContent sx={{ p: 3 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
							<Warning sx={{ color: 'error.main', mr: 1 }} />
							<Typography color='textSecondary' variant='subtitle2'>
								Weak Passwords
							</Typography>
						</Box>
						<Typography variant='h3' color='error' sx={{ fontWeight: 500 }}>
							{stats.weakPasswords}
						</Typography>
					</CardContent>
				</Card>
			</Grid>

			<Grid item xs={12} sm={6} md={4}>
				<Card elevation={0} sx={{ borderRadius: 2 }}>
					<CardContent sx={{ p: 3 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
							<ContentCopy sx={{ color: 'warning.main', mr: 1 }} />
							<Typography color='textSecondary' variant='subtitle2'>
								Reused Passwords
							</Typography>
						</Box>
						<Typography variant='h3' color='warning.main' sx={{ fontWeight: 500 }}>
							{stats.reusedPasswords}
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}
