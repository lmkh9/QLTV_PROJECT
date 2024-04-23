import express from "express";

import publisherContronller from "../controllers/publisher.controller.js";

const router = express.Router();

router.post("/create", publisherContronller.createPublisher);
router.get("/show/:id", publisherContronller.showPublisher);
router.get("/", publisherContronller.getPublishers);
router.delete("/delete/:id", publisherContronller.removePublisher);
router.put("/:id", publisherContronller.updatePublisher);

export default router;
