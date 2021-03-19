const express = require('express');
const handoutController = require('./../controllers/handoutController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(handoutController.getHandouts)
    .post(
        authController.protect,
        authController.restrictTo('representative', 'admin'),
        handoutController.uploadHandout,
        handoutController.createHandout
    );

module.exports = router;
