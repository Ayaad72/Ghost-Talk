// This file handles the MongoDB database connection using Mongoose

import mongoose from "mongoose";

// Define a type to track connection state
type ConnectionObject = {
  isConnected?: number; // Stores the readyState of the connection (0 = disconnected, 1 = connected)
};

// Create a singleton connection object to be reused across requests
const connection: ConnectionObject = {};

/**
 * Establishes a connection to MongoDB if one doesn't already exist
 * Uses the MONGODB_URI environment variable for the connection string
 */
async function dbConnect(): Promise<void> {
  // If already connected, skip connecting again
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    // Attempt to connect to MongoDB
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    // Store the connection state (1 if connected)
    connection.isConnected = db.connections[0].readyState;
    console.log("database connected successfully");
  } catch (error) {
    // Log error and exit if connection fails
    console.log("Database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
