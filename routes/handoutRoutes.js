const express = require('express');
const handoutController = require('./../controllers/handoutController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Many
router
    .route('/')
    .get(
        authController.protect,
        handoutController.getAllHandouts
        )
    .post(
        authController.protect,
        authController.restrictTo('representative', 'admin'),
        handoutController.uploadHandout,
        handoutController.createHandout
    );

// Single
router.route('/:slug')
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
            )

module.exports = router;
