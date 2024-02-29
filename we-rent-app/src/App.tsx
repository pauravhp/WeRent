import { Typography, Container, styled, AppBar } from "@mui/material";
import { useEffect, useState } from "react";

import { Listing } from "../server/rating";

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
		<Container>
			<MyBar sx={{ p: 1, textAlign: "left" }}>
				<Typography variant="h4" sx={{ p: 1, textAlign: "left" }}>
					{" "}
					WERENT
				</Typography>
			</MyBar>
			{listings &&
				listings.map((listing, i) => (
					<Typography
						variant="h4"
						sx={{ p: 1, textAlign: "center", margin: 10 }}
						key={i}
					>
						{listing.address}, {listing.price}, {listing.num_bedrooms},
						coordinates: {listing.location.coordinates[0]},{" "}
						{listing.location.coordinates[1]}, rating: {listing.rating}
					</Typography>
				))}
		</Container>
	);
};

export default App;
