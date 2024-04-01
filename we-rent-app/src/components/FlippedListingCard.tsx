import { Listing } from "../../server/rating";
import { Typography } from "@mui/material";

interface Props {
	listing: Listing;
}

const FlippedListingCard: React.FC<Props> = ({ listing }) => (
	<Typography variant="h4" color="textPrimary">
		${listing.price}
	</Typography>
);

export default FlippedListingCard;
