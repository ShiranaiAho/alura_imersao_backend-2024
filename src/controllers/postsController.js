import fs from "fs";
import { getAllPosts, createPost } from "../models/postsModel.js";

export async function listPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
};

export async function postNewPost(req, res) {
    const newPost = req.body;
    try {
        const post = await createPost(newPost);
        res.status(200).json(post);
    } catch(err) {
        console.error(err.message);
        res.status(500).json({"Error": "Internal Server Error"});
    }
};

export async function uploadImg(req, res) {
    const newPost = {
        description: "",
        imgUrl: req.file.originalname,
        alt: ""    
    };

    try {
        const post = await createPost(newPost);
        const updatedImg = `uploads/${post.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImg);
        res.status(200).json(post);
    } catch(err) {
        console.error(err.message);
        res.status(500).json({"Error": "Internal Server Error"});
    }
};
