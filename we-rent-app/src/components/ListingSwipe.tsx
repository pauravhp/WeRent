import { Listing } from "../../server/rating";

import { useState } from "react";
import TinderCard from "react-tinder-card";
import ListingCard from "./ListingCard";

interface Props {
	listings: Listing[];
}

const ListingSwipe: React.FC<Props> = ({ listings }) => {
	const [lastDirection, setLastDirection] = useState();

	const swiped = (direction: any, nameToDelete: any) => {
		console.log("removing: " + nameToDelete);
		setLastDirection(direction);
	};

	const outOfFrame = (name: any) => {
		console.log(name + " left the screen!");
	};

	return (
		<div>
			<h1>Listings Tinder 💒</h1>
			<div className="cardContainer">
				{listings.map((listing) => (
					<TinderCard
						className="swipe"
						key={listing.address}
						onSwipe={(dir) => swiped(dir, listing.address)}
						onCardLeftScreen={() => outOfFrame(listing.address)}
					>
						<div className="card">
							<ListingCard listing={listing} />
						</div>
					</TinderCard>
				))}
			</div>
			{lastDirection ? (
				<h2 className="infoText">You swiped {lastDirection}</h2>
			) : (
				<h2 className="infoText" />
			)}
		</div>
	);
};

export default ListingSwipe;
