import { Box, TextField, FormControl, Select, MenuItem, InputAdornment } from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';

export default function SearchAndFilter({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				gap: 2,
				mb: 3,
			}}
		>
			<TextField
				placeholder='Search passwords...'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				variant='outlined'
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Search sx={{ color: 'text.secondary' }} />
						</InputAdornment>
					),
				}}
				sx={{
					flex: { xs: '1', sm: '1' },
					order: { xs: 2, sm: 1 },
					backgroundColor: 'background.paper',
					'& .MuiOutlinedInput-root': {
						'&:hover': {
							backgroundColor: '#27272A',
						},
					},
				}}
			/>

			<FormControl
				sx={{
					width: { xs: '100%', sm: 200 },
					order: { xs: 1, sm: 2 },
				}}
			>
				<Select
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
					displayEmpty
					variant='outlined'
					startAdornment={<FilterList sx={{ mr: 1, color: 'text.secondary' }} />}
					sx={{
						backgroundColor: 'background.paper',
						width: '100%',
						'&:hover': {
							backgroundColor: '#27272A',
						},
						'& .Mui-selected': {
							color: 'primary.main !important',
						},
					}}
				>
					{['all', 'social', 'finance', 'work', 'personal'].map((category) => (
						<MenuItem
							key={category}
							value={category}
							sx={{
								'&:hover': { color: 'primary.main' },
								'&.Mui-selected': { color: 'primary.main' },
							}}
						>
							{category.charAt(0).toUpperCase() + category.slice(1)}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
}
