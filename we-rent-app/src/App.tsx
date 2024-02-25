import {
	Typography,
	Box,
	Container,
	Paper,
	styled,
	AppBar,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Listing {
	address: string;
	price: number;
	numBedrooms: number;
}

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
		fetchDataFromDb("/api/listings", setListings);
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
						{listing.address}
						{listing.price}
						{listing.numBedrooms}
					</Typography>
				))}
		</Container>
	);
};

export default App;
