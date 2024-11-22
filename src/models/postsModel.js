import { ObjectId } from "mongodb";
import dbConn from "../config/dbConfig.js";

const conn = await dbConn(process.env.STRING_CONN);

export async function getAllPosts() {
    const db = conn.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.find().toArray();
};

export async function createPost(newPost) {
    const db = conn.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
};

export async function updatePost(id, newPost) {
    const objId = ObjectId.createFromHexString(id);
    const db = conn.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.updateOne({_id: objId}, {$set: newPost});
};
