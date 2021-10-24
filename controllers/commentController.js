const Comment = require('../models/Comment');
const Post = require('../models/Post');
const catchAsync = require('../utils/catchAsync');
const filterBody = require('../utils/filterBody');
const AppError = require('../utils/appError');

// Create Comment
exports.createComment = catchAsync(async (req, res, next) => {
  const data = filterBody(req.body, 'text', 'target');
  data.user = req.user.id;
  data.target = req.params.targetId;

  // Check if post exist with that slug
  const post = await Post.findOne({ slug: data.target });
  if (!post)
    return next(
      new AppError('There is no target document with that slug/ID!', 400)
    );

  // new comment
  const newComment = await Comment.create(body);

  // response
  res.status(201).json({
    status: '',
    data: {
      data: newComment,
    },
  });
});

// Delete Comment
exports.deleteComment = catchAsync(async (req, res, next) => {
  // Check if comment exist
  const comment = Comment.findById(req.params.commentId);
  if (!comment)
    return next(new AppError('There is no comment with that ID!', 400));

  // Related user and admin only
  if (req.user.id !== comment.user || req.user.role !== 'admin') {
    return next(
      new AppError('Only related user or admin can delete a comment!', 400)
    );
  }

  // Delete Comment
  await Comment.findByIdAndDelete(req.params.commentId);

  // Response
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
