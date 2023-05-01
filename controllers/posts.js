const Posts = require('../models/post');
const user = require('../models/user');

const getPosts = (req, res, next) => {
  Posts.find({})
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch(next);
};

const createPost = (req, res, next) => {
  const { input } = req.body;
  const userId = req.user._id;
  console.log(userId);
  return Posts.create({ text: input, owner: userId })
    .then((post) => {
      res.status(200).send(post);
    })
    .catch(next);
};

const addComment = (req, res, next) => {
  const userId = req.user._id;
  const { input } = req.body;
  const postId = req.params._id;
  console.log(postId);
  console.log(input);
  return Posts.findOneAndUpdate({ _id: postId }, {
    $addToSet: { comments: { text: input, owner: userId } },
  })
    .then((post) => {
      res.status(200).send(post);
    })
    .catch(next);
};

module.exports = { createPost, getPosts, addComment };
