import { Box } from '@mui/material';

const Layout = ({ children }) => {
	return (
		<Box
			sx={{
				minHeight: '100vh',
				bgcolor: 'background.default',
				p: { xs: 2, sm: 3 },
			}}
		>
			{children}
		</Box>
	);
};

export default Layout;
