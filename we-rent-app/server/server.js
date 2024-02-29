const express = require("express");
const app = express();
const cors = require("cors");
const { calculateRatings } = require("./rating");
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());

const databaseName = "WeRent";

//MONGODB CONNECTION
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
	"mongodb+srv://Paurav:werent@cluster0.dewuoen.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

// Define middleware function for MongoDB connection and error handling
const withMongoDB = (handler) => async (req, res) => {
	try {
		const db = client.db(databaseName);
		// Call the route handler
		return await handler(req, res, db);
	} catch (error) {
		console.error("Error with exectuing route handler:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Connect to MongoDB
async function connectToMongoDB() {
	try {
		await client.connect();
		console.log("Connected to MongoDB!");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
}

// Define route handler for "/api/listings/:longitude/:latitude"
const sortedListingsRouter = express.Router();
sortedListingsRouter.get(
	"/:longitude/:latitude",
	withMongoDB(async (req, res, db) => {
		const collection = db.collection("Listings");
		const longitude = parseFloat(req.params.longitude);
		const latitude = parseFloat(req.params.latitude);

		const listings = calculateRatings(
			await collection
				.find({
					location: {
						$near: {
							$geometry: {
								type: "Point",
								coordinates: [longitude, latitude],
							},
						},
					},
				})
				.toArray()
		);

		res.json(listings);
		console.log("The listings: ", listings);
	})
);

// Define route handler for "/api/listings"
const allListingsRouter = express.Router();
allListingsRouter.get(
	"/",
	withMongoDB(async (req, res, db) => {
		const collection = db.collection("Listings");
		const listings = (await collection.find({}).toArray()).slice(1);
		res.json(listings);
		console.log("The listings: ", listings);
	})
);

// Use routers
app.use("/api/listings", sortedListingsRouter);
app.use("/api/listings", allListingsRouter);

// Connect to MongoDB and start server
connectToMongoDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
