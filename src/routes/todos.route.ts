import { getAllTodos } from "@src/controllers/todos.controller";
import { Router } from "express";

// create router
const router = Router();

// define routes
router.get("/", getAllTodos);

export { router };
