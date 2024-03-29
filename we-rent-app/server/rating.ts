import axios from "axios";
import { ORS_API_KEY } from "./config";

export type Listing = {
	address: string;
	price: number;
	num_bedrooms: number;
	location: { type: string; coordinates: number[] }; // Within coordinates, longitude is first
	rating: number;
};

type Coordinate = {
	longitude: number;
	latitude: number;
};

type DistanceMatrix = {
	university: {
		location1: number;
		location2: number;
	};
	location1: {
		university: number;
		location2: number;
	};
	location2: {
		university: number;
		location1: number;
	};
};

const universityCoord: Coordinate = {
	longitude: -123.30886369012333,
	latitude: 48.46649627052493,
};

function makeORSRequest(route: string, body: string): Promise<any> {
	return axios
		.post(`https://api.openrouteservice.org/v2/${route}`, body, {
			headers: {
				Accept:
					"application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
				Authorization: ORS_API_KEY,
				"Content-Type": "application/json; charset=utf-8",
			},
		})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});
}

function constructLocationBodyString(
	coord1: Coordinate,
	coord2: Coordinate,
	coord3: Coordinate
) {
	return JSON.stringify({
		locations: [
			[coord1.longitude, coord1.latitude],
			[coord2.longitude, coord2.latitude],
			[coord3.longitude, coord3.latitude],
		],
	});
}

function constructDistanceMatrix(matrix: any): DistanceMatrix {
	return {
		university: {
			location1: matrix[0][1],
			location2: matrix[0][2],
		},
		location1: {
			university: matrix[1][0],
			location2: matrix[1][2],
		},
		location2: {
			university: matrix[2][0],
			location1: matrix[2][1],
		},
	};
}

async function getDistanceMatrix(
	coord1: Coordinate,
	coord2: Coordinate,
	modeOfTransport: string
): Promise<DistanceMatrix> {
	return await makeORSRequest(
		`matrix/${modeOfTransport}`,
		constructLocationBodyString(universityCoord, coord1, coord2)
	)
		.then((payload: any) => {
			return constructDistanceMatrix(payload.durations);
		})
		.catch((error) => {
			console.error(error);
			throw error;
		});
}

async function getDistanceMatrixForAllModes(
	coord1: Coordinate,
	coord2: Coordinate
): Promise<{
	driving: DistanceMatrix;
	walking: DistanceMatrix;
	cycling: DistanceMatrix;
}> {
	let allDistanceMatrix: {
		driving: DistanceMatrix;
		walking: DistanceMatrix;
		cycling: DistanceMatrix;
	} = {
		driving: {
			university: {
				location1: 0,
				location2: 0,
			},
			location1: {
				university: 0,
				location2: 0,
			},
			location2: {
				university: 0,
				location1: 0,
			},
		},
		walking: {
			university: {
				location1: 0,
				location2: 0,
			},
			location1: {
				university: 0,
				location2: 0,
			},
			location2: {
				university: 0,
				location1: 0,
			},
		},
		cycling: {
			university: {
				location1: 0,
				location2: 0,
			},
			location1: {
				university: 0,
				location2: 0,
			},
			location2: {
				university: 0,
				location1: 0,
			},
		},
	};
	allDistanceMatrix.driving = await getDistanceMatrix(
		coord1,
		coord2,
		"driving-car"
	);
	allDistanceMatrix.walking = await getDistanceMatrix(
		coord1,
		coord2,
		"foot-walking"
	);
	allDistanceMatrix.cycling = await getDistanceMatrix(
		coord1,
		coord2,
		"cycling-regular"
	);
	return allDistanceMatrix;
}

export async function calculateRatings(
	listings: Listing[],
	coord1: Coordinate,
	coord2: Coordinate
): Promise<Listing[]> {
	const listingsWithRatings: Listing[] = listings.map(
		(listing: Listing, index) => {
			listing.rating = parseFloat(
				((10 / listings.length) * (listings.length - index)).toFixed(2)
			); // Limits the float to 2 decimal places
			return listing;
		}
	);
	// Uncomment these lines to test ORS distance matrix functinality
	// console.log("***************************************");
	// const result = await getDistanceMatrixForAllModes(coord1, coord2);
	// console.log(result);
	// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	return listingsWithRatings;
}
