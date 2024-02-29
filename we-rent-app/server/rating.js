"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRatings = void 0;
function calculateRatings(listings) {
    var listingsWithRatings = listings.map(function (listing, index) {
        listing.rating = parseFloat((10 / listings.length * (listings.length - index)).toFixed(2)); // Limits the float to 2 decimal places
        return listing;
    });
    return listingsWithRatings;
}
exports.calculateRatings = calculateRatings;
