import { Router } from "express";
import { createUser, getById, createProfile, getAllUsers } from "../controller/user.js";

const router = Router();


router.post("/", createUser);

router.get("/:id", getById);

router.get("/", getAllUsers)

router.post("/profile", createProfile);

export default router;