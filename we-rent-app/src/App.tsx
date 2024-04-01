import {
	Typography,
	Container,
	styled,
	AppBar,
	Grid,
	Box,
} from "@mui/material";
import { useEffect, useState } from "react";

import "./App.css";
import { Listing } from "../server/rating";
// import ListingCard from "./components/ListingCard";
import DarkMode from "./components/Darkmode";
import ListingSwipe from "./components/ListingSwipe";
import FilterBar from "./components/FilterBar";

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
				<FilterBar />
				{listings && <ListingSwipe listings={listings} />}
			</Container>
		</>
	);
};

export default App;
