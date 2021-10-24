const express = require('express');
const assignmentController = require('../controllers/assignmentController');
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(
    protect,
    restrictTo('admin', 'representative'),
    assignmentController.uploadImage,
    assignmentController.processImage,
    assignmentController.createAssignment
  )
  .get(protect, assignmentController.getAllAssignments);

// Single Assignment routes
router
  .route('/:slug')
  .get(protect, assignmentController.getAssignment)
  .patch(
    protect,
    restrictTo('admin', 'representative'),
    assignmentController.uploadImage,
    assignmentController.processImage,
    assignmentController.updateAssignment
  )
  .delete(
    protect,
    restrictTo('admin', 'representative'),
    assignmentController.deleteAssignment
  );

// Deactivate assignment
router.patch(
  '/:slug/deactivate',
  protect,
  restrictTo('admin', 'representative'),
  assignmentController.deActivateAssignment
);

// Saving and removing assignment
router.patch(
  '/library/save',
  protect,
  assignmentController.saveAssignmentToLibrary
);
router.patch(
  '/library/remove',
  protect,
  assignmentController.removeAssignmentFromLibrary
);

module.exports = router;
