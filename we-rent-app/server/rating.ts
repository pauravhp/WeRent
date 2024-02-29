export type Listing = {
	address: string;
	price: number;
	num_bedrooms: number;
	location: { type: string; coordinates: number[] }; // Within coordinates, longitude is first
	rating: number;
};

export function calculateRatings(listings: Listing[]): Listing[] {
    const listingsWithRatings: Listing[] = listings.map((listing: Listing, index) => {
        listing.rating = parseFloat((10/listings.length * (listings.length - index)).toFixed(2)); // Limits the float to 2 decimal places
        return listing;
    });
    return listingsWithRatings; 
  }