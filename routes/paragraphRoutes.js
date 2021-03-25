const { Router } = require("express");
const paragraphController = require("../controllers/paragraphController");

const router = Router();

router
    .route("/")
    .post(
        paragraphController.uploadParagraphImages,
        paragraphController.processParagraphImages,
        paragraphController.createParagraph
    );

module.exports = router;
