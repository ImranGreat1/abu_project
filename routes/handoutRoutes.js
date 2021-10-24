const express = require('express');
const handoutController = require('../controllers/handoutController');
const authController = require('../controllers/authController');
const likeRouter = require('../routes/likeRoutes');
const commentRouter = require('../routes/commentRoutes');

const router = express.Router();

// Many
router
  .route('/')
  .get(authController.protect, handoutController.getAllHandouts)
  .post(
    authController.protect,
    authController.restrictTo('representative', 'admin'),
    handoutController.uploadHandout,
    handoutController.processPDF,
    handoutController.createHandout
  );

// Single
router
  .route('/:slug')
  .get(handoutController.getHandout)
  .patch(
    authController.protect,
    authController.restrictTo('representative', 'admin'),
    handoutController.uploadHandout,
    handoutController.updateHandout
  )
  .delete(
    authController.protect,
    authController.restrictTo('representative', 'admin'),
    handoutController.deleteHandout
  );

router.patch(
  '/library/save',
  authController.protect,
  handoutController.saveHandoutToLibrary
);

router.patch(
  '/library/remove',
  authController.protect,
  handoutController.removeHandoutFromLibrary
);

// Likes
router.route('/:targetId/likes', likeRouter);

// Comments
router.route('/:targetId/comments', commentRouter);

module.exports = router;
