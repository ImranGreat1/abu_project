const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'A profile must be associated with a user!'],
  },
  phone: {
    type: String,
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  faculty: {
    type: String,
    lowercase: true,
  },
  department: {
    type: String,
    lowercase: true,
  },
  level: {
    type: String,
  },
  role: {
    type: String,
    enum: ['student', 'representative', 'admin'],
    default: 'student',
  },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
