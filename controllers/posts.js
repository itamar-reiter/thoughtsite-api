const Posts = require('../models/post');

const getPosts = (req, res, next) => {
  Posts.find({})
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch(next);
};

const createPost = (req, res, next) => {
  const { input } = req.body;
  const userId = req.params._id;
  console.log(userId);
  return Posts.create({ text: input, owner: userId })
    .then((post) => {
      res.status(200).send(post);
    })
    .catch(next);
};

module.exports = { createPost, getPosts };
