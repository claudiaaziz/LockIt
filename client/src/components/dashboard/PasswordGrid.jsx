import { Grid } from '@mui/material';
import PasswordCard from './PasswordCard';

export default function PasswordGrid({
	passwords,
	decryptedPasswords,
	showPassword,
	onTogglePassword,
	onCopy,
	onEdit,
	onDelete,
}) {
	return (
		<Grid container spacing={2}>
			{passwords.map((password) => (
				<Grid item xs={12} md={6} key={password.id}>
					<PasswordCard
						password={password}
						decryptedPassword={decryptedPasswords[password.id]}
						showPassword={showPassword[password.id]}
						onTogglePassword={() => onTogglePassword(password.id)}
						onCopy={onCopy}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				</Grid>
			))}
		</Grid>
	);
}
