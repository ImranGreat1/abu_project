const Post = require('../models/Post');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterBody = require('../utils/filterBody');

exports.createPost = catchAsync(async (req, res, next) => {
  // Get the fields/form data and perform some cleanups
  let data = filterBody(req.body, 'title', 'content');
  const userInfo = filterBody(
    req.userProfile,
    'faculty',
    'department',
    'level'
  );
  data = { ...data, ...userInfo, author: req.user._id };

  // Create the post
  const post = await Post.create(data);

  // send response
  res.status(201).json({
    status: 'success',
    data: {
      data: post,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({
    slug: req.params.slug,
    active: { $ne: false },
  });

  // Send a 404 response if document is not found
  if (!post) {
    return next(new AppError('Cannot find a Post with that ID', 404));
  }
  // Send response
  res.status(200).json({
    status: 'success',
    data: { data: post },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  let data = filterBody(req.body, 'title', 'content');

  const userInfo = filterBody(
    req.userProfile,
    'faculty',
    'department',
    'level'
  );

  const query = { slug: req.params.slug, author: req.user._id, ...userInfo };
  const post = Post.findOneAndUpdate(query, data, {
    new: true,
  });

  // send response
  res.status(201).json({
    status: 'success',
    data: {
      data: post,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const userInfo = filterBody(
    req.userProfile,
    'faculty',
    'department',
    'level'
  );
  const query = { slug: req.params.slug, author: req.user._id, ...userInfo };

  await Post.findOneAndDelete(query);

  // send response with 204 (DELETED) response status
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.deActivatPost = catchAsync(async (req, res, next) => {
  const userInfo = filterBody(
    req.userProfile,
    'faculty',
    'department',
    'level'
  );
  const query = { slug: req.params.slug, author: req.user._id, ...userInfo };

  await Post.findOneAndUpdate(query, { active: false }, { new: true });

  // send response with 204 (DELETED) response status
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.makeInActive = catchAsync(async (req, res, next) => {
  await Post.findOneAndUpdate({ active: false });

  // send response with 204 (DELETED) response status
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.makeActive = catchAsync(async (req, res, next) => {
  await Post.findOneAndUpdate({ active: true });

  // send response with 204 (DELETED) response status
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllPost = catchAsync(async (req, res, next) => {
  let posts;

  if (req.query.search) {
    posts = await Post.find({
      active: { $ne: false },
      title: { $regex: new RegExp(`${req.query.search}`), $options: 'i' },
    });
  } else {
    let target = 'department';

    // To filter posts based on the 3 different targets: department faculty and school
    if (req.query.target) target = req.query.target;

    posts = await Post.find({
      active: { $ne: false },
      target,
    })
      .limit(+req.query.limit)
      .skip(+req.query.page * req.query.limit);
  }

  posts = posts.filter((post) => post.paragraphs.length !== 0);

  // Send Response
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      data: posts,
    },
  });
});
