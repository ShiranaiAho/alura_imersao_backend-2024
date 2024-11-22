import express from "express";
import multer from "multer";
import { listPosts, postNewPost, uploadImg, updateNewPost } from "../controllers/postsController.js";

const upload = multer({dest: "./uploads"});

const routes = (app) => {
    app.use(express.json());
    app.get("/posts", listPosts);
    app.post("/posts", postNewPost);
    app.post("/upload", upload.single("image"), uploadImg);
    app.put("/upload/:id", updateNewPost);
};

export default routes;
