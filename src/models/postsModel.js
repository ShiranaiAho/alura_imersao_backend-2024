import dbConn from "../config/dbConfig.js";

const conn = await dbConn(process.env.STRING_CONN);

export default async function getAllPosts() {
    const db = conn.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.find().toArray();
};
