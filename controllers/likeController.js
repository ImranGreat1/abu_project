const Like = require('../models/Like');
const catchAsync = require('../utils/catchAsync');

// Create Like
exports.createLike = catchAsync(async (req, res, next) => {
  const body = { user: req.user.id, target: req.params.targetId };
  // new like
  const newLike = await Like.create(body);

  // response
  res.status(201).json({
    status: 'success',
    data: {
      data: newLike,
    },
  });
});

// Remove Like
exports.removeLike = catchAsync(async (req, res, next) => {
  // Check if like exist
  const like = await Like.findOne({
    user: req.user.id,
    target: req.params.targetId,
  });
  if (!like) return next(new AppError('There is no like with that ID!', 400));

  // Related user and admin only
  if (req.user.id !== like.user || req.user.role !== 'admin') {
    return next(
      new AppError('Only related user or admin can remove like!', 400)
    );
  }

  // Remove like
  await Like.findByIdAndDelete(like.id);

  // response
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.countLikes = catchAsync(async (req, res, next) => {
  const likes = await Like.aggregate([
    { $match: { target: { $eq: req.params.targetId } } },
    {
      $group: {
        _id: null,
        numOfLikes: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json(likes);
});
