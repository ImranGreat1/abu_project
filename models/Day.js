const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  timetable: {
    type: mongoose.Schema.ObjectId,
    ref: 'Timetable',
    required: [true, 'A Day must be associated with a timetable!']
  },
  _7to8: String,
  _8to9: String,
  _9to10: String,
  _10to11: String,
  _11to12: String,
  _12to13: String,
  _13to14: String,
  _14to15: String,
  _15to16: String,
  _16to17: String,
  _17to18: String,
  _18to19: String,
  _19to20: String
});

const Day = mongoose.model('Day', daySchema);

module.exports = Day;