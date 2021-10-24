const { Router } = require('express');
const paragraphController = require('../controllers/paragraphController');
const authController = require('../controllers/authController');

const router = Router();

router
  .route('/:slug')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'representatives'),
    paragraphController.uploadParagraphImage,
    paragraphController.processParagraphImage,
    paragraphController.createParagraph
  );

router
  .route('/:slug/:paragraphId')
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'representatives'),
    paragraphController.uploadParagraphImage,
    paragraphController.processParagraphImage,
    paragraphController.updateParagraph
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'representatives'),
    paragraphController.deleteParagraph
  );

module.exports = router;
