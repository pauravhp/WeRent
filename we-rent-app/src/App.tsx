import {
	Typography,
	Container,
	styled,
	AppBar,
	Grid,
	Box,
} from "@mui/material";
import { useEffect, useState } from "react";

import { Listing } from "../server/rating";
import ListingCard from "./components/ListingCard";
import DarkMode from "./components/Darkmode";

const fetchDataFromDb = async (
	endpoint: string,
	setData: (listings: Listing[]) => void
) => {
	try {
		const response = await fetch(`http://localhost:3001${endpoint}`);
		const result = await response.json();
		setData(result);
	} catch (error) {
		console.error(`Error fetching data from ${endpoint}:`, error);
	}
};

const App = () => {
	const MyBar = styled(AppBar)(({ theme }) => ({
		backgroundColor: "black", // Change background color to black
	}));

	const [listings, setListings] = useState<Listing[] | null>(null);

	useEffect(() => {
		fetchDataFromDb(
			"/api/listings/-123.33261854873903/48.46935212942427/-123.36533945449976/48.425005274577266",
			setListings
		);
	}, []);

	return (
		<>
			<Container>
				<MyBar>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							p: 1,
						}}
					>
						<Typography variant="h4" sx={{ p: 1 }}>
							WeRent
						</Typography>
						<DarkMode />
					</Box>
				</MyBar>
			</Container>
			<Grid container spacing={2} my={3} padding={"65px"}>
				{listings &&
					listings.map((listing, i) => <ListingCard listing={listing} i={i} />)}
			</Grid>
		</>
	);
};

export default App;
