import getAllPosts from "../models/postsModel.js";

export default async function listPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
};
