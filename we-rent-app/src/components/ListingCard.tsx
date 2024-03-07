import {
    Box,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Stack,
    Grid,
} from "@mui/material";
import {
    FavoriteBorderSharp as FavoriteBorderSharpIcon,
    ThumbDownOffAltSharp as ThumbDownOffAltSharpIcon,
    BookmarkBorderSharp as BookmarkBorderSharpIcon,
    StraightenSharp as StraightenSharpIcon
} from "@mui/icons-material";
import { Listing } from "../../server/rating";
import { deepOrange } from "@mui/material/colors";
import KingBedTwoToneIcon from "@mui/icons-material/KingBedTwoTone";
import BathtubIcon from "@mui/icons-material/Bathtub";
import Divider from "@mui/material/Divider";


interface Props {
    listing: Listing;
    i: number;
}
const ListingCard: React.FC<Props> = ({ listing, i }) => {
    return (
        <Grid item key={i} xs={3} sm={3} md={3}>
            <Card elevation={12}>
                <CardContent>
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
                            <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                                color="gold"
                            />
                            <Grid item>
                                <BathtubIcon />
                            </Grid>
                            <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                                color="gold"
                            />
                            <Grid item>
                                <StraightenSharpIcon />
                            </Grid>
                            <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                                color="gold"
                            />
                        </Grid>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Stack direction="row" spacing={1}>
                        <Button>
                            <FavoriteBorderSharpIcon />
                        </Button>
                        <Button>
                            <ThumbDownOffAltSharpIcon />
                        </Button>
                        <Button>
                            <BookmarkBorderSharpIcon />
                        </Button>
                        <Typography
                            variant="h6"
                            color="textPrimary"
                            sx={{
                                bgcolor: deepOrange[500],
                                borderRadius: "10px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                            }}
                        >
                            {listing.rating}
                        </Typography>
                    </Stack>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ListingCard;
