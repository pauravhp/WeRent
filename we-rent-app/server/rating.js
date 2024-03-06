"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRatings = void 0;
var axios_1 = require("axios");
var config_1 = require("./config");
var universityCoord = {
    longitude: -123.30886369012333,
    latitude: 48.46649627052493,
};
function makeORSRequest(route, body) {
    return axios_1.default
        .post("https://api.openrouteservice.org/v2/".concat(route), body, {
        headers: {
            Accept: "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
            Authorization: config_1.ORS_API_KEY,
            "Content-Type": "application/json; charset=utf-8",
        },
    })
        .then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        throw error;
    });
}
function constructLocationBodyString(coord1, coord2, coord3) {
    return JSON.stringify({
        locations: [
            [coord1.longitude, coord1.latitude],
            [coord2.longitude, coord2.latitude],
            [coord3.longitude, coord3.latitude],
        ],
    });
}
function constructDistanceMatrix(matrix) {
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
function getDistanceMatrix(coord1, coord2, modeOfTransport) {
    var result;
    return makeORSRequest("matrix/".concat(modeOfTransport), constructLocationBodyString(universityCoord, coord1, coord2))
        .then(function (payload) {
        result = payload.durations;
        return constructDistanceMatrix(result);
    })
        .catch(function (error) {
        console.error(error);
        throw error;
    });
}
function calculateRatings(listings, coord1, coord2) {
    var listingsWithRatings = listings.map(function (listing, index) {
        listing.rating = parseFloat(((10 / listings.length) * (listings.length - index)).toFixed(2)); // Limits the float to 2 decimal places
        return listing;
    });
    // Uncomment these lines to test ORS distance matrix functinality
    // getDistanceMatrix(coord1, coord2, "driving-car")
    // 	.then((distanceMatrix) => {
    // 		console.log(distanceMatrix);
    // 	})
    // 	.catch((error) => {
    // 		console.error(error);
    // 	});
    return listingsWithRatings;
}
exports.calculateRatings = calculateRatings;
