const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in .env");
}

let cached = global.mongo;

if (!cached) {
    cached = global.mongo = {
        conn: null,
        promise: null,
    };
}

async function connectDB() {

    if (cached.conn) {
        console.log("♻️ Using existing MongoDB connection");
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI);
    }

    try {
        cached.conn = await cached.promise;
        console.log("✅ Connected to MongoDB");
        return cached.conn;
    } catch (error) {
        cached.promise = null;

        console.error("❌ MongoDB Connection Failed");
        console.error(error);

        process.exit(1);
    }
}

module.exports = connectDB;
