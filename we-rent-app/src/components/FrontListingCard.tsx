import { Listing } from "../../server/rating";
import { Box, Stack, Typography, Grid } from "@mui/material";
import {
	FavoriteBorderSharp as FavoriteBorderSharpIcon,
	ThumbDownOffAltSharp as ThumbDownOffAltSharpIcon,
	BookmarkBorderSharp as BookmarkBorderSharpIcon,
	StraightenSharp as StraightenSharpIcon,
} from "@mui/icons-material";

import KingBedTwoToneIcon from "@mui/icons-material/KingBedTwoTone";
import BathtubIcon from "@mui/icons-material/Bathtub";
import Divider from "@mui/material/Divider";

interface Props {
	listing: Listing;
}

const FrontListingCard: React.FC<Props> = ({ listing }) => (
	<Stack direction="column" spacing={1}>
		<Box>
			<Typography variant="h4" color="textPrimary">
				${listing.price}
			</Typography>
		</Box>
		<Box>
			<Typography
				variant="h6"
				color="textSecondary"
				sx={{ fontWeight: "bold" }}
			>
				{listing.address}
			</Typography>
		</Box>
		<Grid container spacing={1} alignItems="center">
			<Grid item>
				<Typography variant="body1">{listing.num_bedrooms}</Typography>
			</Grid>
			<Grid item>
				<KingBedTwoToneIcon />
			</Grid>
			<Divider orientation="vertical" variant="middle" flexItem color="gold" />
			<Grid item>
				<BathtubIcon />
			</Grid>
			<Divider orientation="vertical" variant="middle" flexItem color="gold" />
			<Grid item>
				<StraightenSharpIcon />
			</Grid>
			<Divider orientation="vertical" variant="middle" flexItem color="gold" />
		</Grid>
	</Stack>
);

export default FrontListingCard;
