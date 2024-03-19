import { Router } from "express";

import { create,getAll,deletePost,getPostById } from "../controller/post.js";

const router = Router();

router.post("/", create);

router.get("/", getAll);

router.get("/:id", getPostById);

router.delete("/:id", deletePost);


export default router;