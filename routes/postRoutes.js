const { Router } = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const commentRouter = require('../routes/commentRoutes');
const likeRouter = require('../routes/likeRoutes');

const router = Router();

router.route('/')
.post(
    authController.protect,
    postController.uploadPostImages,
    postController.processPostImages,
    postController.createPost
)
.get(postController.getAllPost);


router.route('/:slug')
.get(postController.getPost)
.delete(postController.deletePost);

// Embedded comment routes
router.use('/:slug/comments', commentRouter);

// Embedded like routes
router.use('/:slug/likes', likeRouter);


module.exports = router;
