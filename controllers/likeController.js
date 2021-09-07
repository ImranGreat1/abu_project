const Like = require('../models/Like');
const catchAsync = require('../utils/catchAsync');


// Create Like
exports.createLike = catchAsync(async (req, res, next) => {
  const body = { user: req.user.id, post: req.params.slug }
  // new like
  const newLike = await Like.create(body);

  // response
  res.status(201).json({
    status: 'success',
    data: {
      data: newLike
    }
  });

});


// Remove Like
exports.removeLike = catchAsync(async (req, res, next) => {
  
  // Check if like exist
  const like = await Like.findById(req.params.likeId)
  if (!like) return next(new AppError('There is no like with that ID!', 400));

  // Related user and admin only
  if (req.user.id !== comment.user || req.user.role !== 'admin')
  {
    return next(new AppError('Only related user or admin can remove like!', 400))
  }

  // Remove like
  await Like.findByIdAndDelete(req.params.likeId);

  // response
  res.status(201).json({
    status: 'success',
    data: null
  });

});