const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
