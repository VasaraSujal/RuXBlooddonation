const { MongoClient } = require('mongodb');
require("dotenv").config({ path: "../.env" });

let db = null;

const connectDB = async () => {
    try {
        const client = await MongoClient.connect(process.env.MONGO_URI);
        db = client.db('BloodDonation');

        if (!db) {
            throw new Error('Failed to connect to database');
        }

        console.log(`✅ MongoDB Connected: ${client.options.srvHost}`);

        // ✅ Ensure geospatial index for donor location (important for $geoNear queries)
        await db.collection("users").createIndex({ coordinates: "2dsphere" });

        console.log("🌍 2dsphere index ensured on 'coordinates' field in usersTree collection");

        return db;
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
};

module.exports = { connectDB, getDB };
