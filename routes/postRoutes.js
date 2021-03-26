const { Router } = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = Router();

router.route('/').post(
    authController.protect,
    postController.uploadPostImages,
    postController.processPostImages,
    postController.createPost)
    .get(postController.getAllPost);



module.exports = router;
