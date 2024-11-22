import fs from "fs";
import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
import { generateDescGemini, generateAltTextGemini } from "../services/geminiService.js";

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

export async function updateNewPost(req, res) {
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`./uploads/${id}.png`);
        const desc = await generateDescGemini(imgBuffer);
        const altText = await generateAltTextGemini(imgBuffer);
        const newPost = {
            imgUrl: urlImg,
            description: desc,
            alt: altText
        };
        const post = await updatePost(id, newPost);
        res.status(200).json(post);
    } catch(err) {
        console.error(err.message);
        res.status(500).json({"Error": "Internal Server Error"});
    }
};
