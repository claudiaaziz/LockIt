import { Box, CircularProgress } from '@mui/material';

export default function LoadingSpinner() {
	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<CircularProgress />
		</Box>
	);
}
