import express from "express";
import multer from "multer";
import cors from "cors";
import { listPosts, postNewPost, uploadImg, updateNewPost } from "../controllers/postsController.js";

const corsOpt = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

const upload = multer({dest: "./uploads"});

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOpt));
    app.get("/posts", listPosts);
    app.post("/posts", postNewPost);
    app.post("/upload", upload.single("image"), uploadImg);
    app.put("/upload/:id", updateNewPost);
};

export default routes;
