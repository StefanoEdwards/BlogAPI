// src/routes/posts.routes.js
import { Router } from "express";
import { getAll, getOne, getFull, create, update, remove } from "../controllers/posts.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:postId/full", getFull);  // MUST come before /:postId
router.get("/:postId", getOne);

router.post("/", create);
router.put("/:postId", update);
router.delete("/:postId", remove);

export default router;
