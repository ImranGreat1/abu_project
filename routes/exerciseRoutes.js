const express = require('express');
const exerciseController = require('../controllers/exerciseController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
.post(authController.protect, exerciseController.createExercise)
.get(authController.protect, exerciseController.getAllExercises);


router.route('/:slug')
.get(authController.protect, exerciseController.getExercise)
.patch(authController.protect, exerciseController.updateExercise)
.delete(authController.protect, exerciseController.deleteExercise);



module.exports = router;