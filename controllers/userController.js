const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find().populate("profile");

  res.status(200).json({
    status: "success",
    data: {
      data: users,
    },
  });
});
