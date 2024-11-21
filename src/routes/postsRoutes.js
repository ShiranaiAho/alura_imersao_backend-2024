import express from "express";
import multer from "multer";
import { listPosts, postNewPost, uploadImg } from "../controllers/postsController.js";

const upload = multer({dest: "./uploads"});

const routes = (app) => {
    app.use(express.json());
    app.get("/posts", listPosts);
    app.post("/posts", postNewPost);
    app.post("/upload", upload.single("image"), uploadImg);
};

export default routes;
