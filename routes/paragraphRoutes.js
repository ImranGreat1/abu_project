const { Router } = require("express");
const paragraphController = require("../controllers/paragraphController");

const router = Router();

router
    .route("/:slug")
    .post(
        paragraphController.uploadParagraphImage,
        paragraphController.processParagraphImage,
        paragraphController.createParagraph
    );

module.exports = router;
