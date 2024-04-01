import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
	handleClose: (val: Boolean) => void;
}

const FilterForm: React.FC<Props> = ({ handleClose }) => {
	return (
		<div>
			<Dialog
				open={true}
				onClose={handleClose}
				PaperProps={{
					component: "form",
					onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						const formData = new FormData(event.currentTarget);
						const formJson = Object.fromEntries((formData as any).entries());
						const email = formJson.email;
						console.log(email);
						handleClose(false);
					},
				}}
			>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here.
						We will send updates occasionally.
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin="dense"
						id="name"
						name="email"
						label="Email Address"
						type="email"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleClose(false)}>Cancel</Button>
					<Button type="submit">Subscribe</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default FilterForm;
