const { Router } = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const commentRouter = require('../routes/commentRoutes');
const likeRouter = require('../routes/likeRoutes');

const router = Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'representative'),
    postController.createPost
  )
  .get(postController.getAllPost);

router
  .route('/:slug')
  .get(postController.getPost)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'representative'),
    postController.deletePost
  );

router.patch(
  '/:slug/deactivate',
  authController.protect,
  authController.restrictTo('admin', 'representative'),
  postController.deActivatPost
);

// Embedded comment routes
router.use('/:slug/comments', commentRouter);

// Embedded like routes
router.use('/:targetId/likes', likeRouter);

module.exports = router;
