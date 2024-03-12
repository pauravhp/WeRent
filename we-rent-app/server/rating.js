"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeORSRequest("matrix/".concat(modeOfTransport), constructLocationBodyString(universityCoord, coord1, coord2))
                        .then(function (payload) {
                        return constructDistanceMatrix(payload.durations);
                    })
                        .catch(function (error) {
                        console.error(error);
                        throw error;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getDistanceMatrixForAllModes(coord1, coord2) {
    return __awaiter(this, void 0, void 0, function () {
        var allDistanceMatrix, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    allDistanceMatrix = {
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
                    _a = allDistanceMatrix;
                    return [4 /*yield*/, getDistanceMatrix(coord1, coord2, "driving-car")];
                case 1:
                    _a.driving = _d.sent();
                    // getDistanceMatrix(coord1, coord2, "driving-car")
                    // 	.then((distanceMatrix) => {
                    // 		// console.log(distanceMatrix);
                    // 		allDistanceMatrix.driving = distanceMatrix;
                    // 	})
                    // 	.catch((error) => {
                    // 		console.error(error);
                    // 	});
                    _b = allDistanceMatrix;
                    return [4 /*yield*/, getDistanceMatrix(coord1, coord2, "foot-walking")];
                case 2:
                    // getDistanceMatrix(coord1, coord2, "driving-car")
                    // 	.then((distanceMatrix) => {
                    // 		// console.log(distanceMatrix);
                    // 		allDistanceMatrix.driving = distanceMatrix;
                    // 	})
                    // 	.catch((error) => {
                    // 		console.error(error);
                    // 	});
                    _b.walking = _d.sent();
                    // getDistanceMatrix(coord1, coord2, "walking-foot")
                    // 	.then((distanceMatrix) => {
                    // 		// console.log(distanceMatrix);
                    // 		allDistanceMatrix.walking = distanceMatrix;
                    // 	})
                    // 	.catch((error) => {
                    // 		console.error(error);
                    // 	});
                    _c = allDistanceMatrix;
                    return [4 /*yield*/, getDistanceMatrix(coord1, coord2, "cycling-regular")];
                case 3:
                    // getDistanceMatrix(coord1, coord2, "walking-foot")
                    // 	.then((distanceMatrix) => {
                    // 		// console.log(distanceMatrix);
                    // 		allDistanceMatrix.walking = distanceMatrix;
                    // 	})
                    // 	.catch((error) => {
                    // 		console.error(error);
                    // 	});
                    _c.cycling = _d.sent();
                    // getDistanceMatrix(coord1, coord2, "cycling-regular")
                    // 	.then((distanceMatrix) => {
                    // 		// console.log(distanceMatrix);
                    // 		allDistanceMatrix.cycling = distanceMatrix;
                    // 	})
                    // 	.catch((error) => {
                    // 		console.error(error);
                    // 	});
                    // console.log(allDistanceMatrix);
                    return [2 /*return*/, allDistanceMatrix];
            }
        });
    });
}
function calculateRatings(listings, coord1, coord2) {
    return __awaiter(this, void 0, void 0, function () {
        var listingsWithRatings, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    listingsWithRatings = listings.map(function (listing, index) {
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
                    console.log("***************************************");
                    return [4 /*yield*/, getDistanceMatrixForAllModes(coord1, coord2)];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    return [2 /*return*/, listingsWithRatings];
            }
        });
    });
}
exports.calculateRatings = calculateRatings;
