const Router = require('express').Router;
const userProfileController = require('../controllers/userProfileController');
const authController = require('../controllers/authController');

const router = Router();

router.use(authController.protect);
router
  .route('/')
  .post(userProfileController.createProfile)
  .get(userProfileController.getProfile)
  .patch(userProfileController.updateProfile)
  .delete(userProfileController.deleteProfile);

module.exports = router;
