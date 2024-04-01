import { IconButton } from "@mui/material";
import { Listing } from "../../server/rating";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import FrontListingCard from "./FrontListingCard";
import FlippedListingCard from "./FlippedListingCard";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

interface Props {
	listing: Listing;
}
const ListingCard: React.FC<Props> = ({ listing }) => {
	const [isFlipped, setIsFlipped] = useState<boolean>(false);

	const handleFlip = (e: any) => {
		setIsFlipped((prevIsFlipped) => !prevIsFlipped);
	};

	return (
		<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
			<div>
				<FrontListingCard listing={listing} />
				<IconButton onClick={handleFlip} color="primary" size="large">
					<ReadMoreIcon />
				</IconButton>
			</div>
			<div>
				<FlippedListingCard listing={listing} />
				<IconButton onClick={handleFlip} color="error" size="large">
					<KeyboardReturnIcon />
				</IconButton>
			</div>
		</ReactCardFlip>
	);
};

export default ListingCard;
