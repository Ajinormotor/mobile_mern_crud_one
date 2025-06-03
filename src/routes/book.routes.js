import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  singleBook,
  updateBook,
} from "../controller/book.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getBook);

router.get("/:id", singleBook);

router.post("/", protectRoute, createBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

export default router;
