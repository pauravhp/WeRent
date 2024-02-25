const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());

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
async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)

		app.get("/api/listings", async (req, res) => {
			try {
				await client.connect();
				console.log("Connected to MongoDB");

				const db = client.db("WeRent");
				const collection = db.collection("Listings");
				const listings = (await collection.find({}).toArray()).slice(1);
				res.json(listings);
				console.log("The listings: ", listings);
			} catch (error) {
				console.error("Error fetching listings:", error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		});
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);

//referring to rating js file
// const rating = require("./routes/rating");

// //defining the base of other api endpoints
// app.use("/api/", rating);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
