import { Router } from "express";
import { createUser, getById, createProfile } from "../controller/user.js";

const router = Router();

router.post("/", createUser);

router.get("/:id", getById);

router.post("/profile", createProfile);

export default router;