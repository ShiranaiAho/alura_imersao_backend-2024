import { MongoClient } from 'mongodb';

export default async function dbConn(stringConn) {
    let mongoClient;
    
    try {
        mongoClient = new MongoClient(stringConn);
        console.log("Connecting to the Database Cluster...");
        await mongoClient.connect();
        console.log("Connected to MongoDB Atlas successfully!");

        return mongoClient;
    } catch (err) {
        console.log("Failed to connect to database!", err);
        process.exit();
    }
}
