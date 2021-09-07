const express = require('express');
const assignmentController = require('../controllers/assignmentController');
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.route('/')
.post(
  protect, 
  restrictTo('admin', 'representative'),
  assignmentController.createAssignment
)
.get(
  protect, 
  assignmentController.getAllAssignments
);

// Single Assignment routes
router.route('/:slug')
.get(protect, assignmentController.getAssignment)
.patch(
  protect,
  restrictTo('admin', 'representative'),
  assignmentController.updateAssignment
)
.delete(
  protect,
  restrictTo('admin', 'representative'),
  assignmentController.deleteAssignment
)


// Saving and removing assignment
router.patch('/:slug/save', protect, authController.saveAssignment);
router.patch('/:slug/remove', protect, authController.removeAssignment);


module.exports = router;