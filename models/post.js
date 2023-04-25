const { Schema, model } = require('mongoose');
// const comment = require('./comment');

const postSchema = new Schema({
  text: {
    type: String,
    required: true,
    /* minlength: 280, */
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  comments: [{
    text: {
      type: String,
      required: true,
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    /* comments: [comment], */
  }],
});

module.exports = model('post', postSchema);
