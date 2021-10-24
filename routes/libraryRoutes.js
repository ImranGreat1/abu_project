const Router = require('express').Router;
const libraryController = require('../controllers/libraryController');
const authController = require('../controllers/authController');

const router = Router();

router
  .route('/')
  .post(libraryController.createLibrary)
  .get(authController.protect, libraryController.getLibrary)
  .patch(libraryController.updateLibrary)
  .delete(libraryController.deleteLibrary);

module.exports = router;
