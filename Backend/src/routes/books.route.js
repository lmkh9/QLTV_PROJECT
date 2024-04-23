import express from "express";
import booksContronller from "../controllers/books.contronller.js";

const router = express.Router();

router.post("/create", booksContronller.createBooks);

router.get("/show/:id", booksContronller.showDetail);
router.get("/", booksContronller.getBooks);

router.delete("/delete/:id", booksContronller.deleteBooks);

router.put("/:id", booksContronller.updateBooks);

export default router;
