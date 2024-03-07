import { Typography, Container, styled, AppBar, Grid } from "@mui/material";
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
			"/api/listings/-123.3664977167386/48.42532007264327",
			setListings
		);
	}, []);

	return (
		<>
			<Container>
				<MyBar sx={{ p: 1, textAlign: "left" }}>
					<Typography variant="h4" sx={{ p: 1, textAlign: "left" }}>
						{" "}
						WeRent
					</Typography>
					<div style={{ position: 'absolute', top: '10px', right: '10px' }}>
						<DarkMode />
					</div>
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
