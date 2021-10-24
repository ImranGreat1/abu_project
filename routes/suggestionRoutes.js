const Router = require('express').Router;
const suggestionController = require('../controllers/suggestionController');
const { protect } = require('../controllers/authController');

const router = Router();

router.use(protect);

router
  .route('/')
  .post(suggestionController.createSuggestion)
  .get(suggestionController.getAllSuggestions);

router
  .route('/:id')
  .get(suggestionController.getSuggestion)
  .patch(suggestionController.updateSuggestion)
  .delete(suggestionController.deleteSuggestion);

module.exports = router;
