const express = require('express');
const likeController = require('../controllers/likeController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(authController.protect, likeController.createLike)
  .delete(authController.protect, likeController.removeLike);

module.exports = router;
