const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');

// Merge params option merge params of embedding routes
const router = express.Router({ mergeParams: true });

router.route('/').post(authController.protect, commentController.createComment);

router
  .route('/:commentId')
  .delete(authController.protect, commentController.deleteComment);

module.exports = router;
