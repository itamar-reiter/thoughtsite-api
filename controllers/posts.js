const Posts = require('../models/post');
const InvalidDataError = require('../utils/errors/InvalidDataError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ServerError = require('../utils/errors/ServerError');

// get all posts
const getPosts = (req, res, next) => {
  const userId = req.user._id;
  Posts.find({})
    .then((posts) => {
      posts.sort((a, b) => b.comments.length - a.comments.length);
      // # if the user liked the post, add the isLiked field to the post and set it to true
      posts.forEach((post) => {
        if (post.likes.includes(userId)) {
          post.isLiked = true;
        } else {
          post.isLiked = false;
        }
      });
      return posts;
    })
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch(next);
};

// create new post
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

// add comment to a post
const addComment = (req, res, next) => {
  const userId = req.user._id;
  const { input } = req.body;
  const postId = req.params._id;
  console.log(postId);
  console.log(input);
  return Posts.findOneAndUpdate({ _id: postId }, {
    $addToSet: { comments: { text: input, owner: userId } },
  }, { new: true })
    .then((post) => {
      res.status(200).send(post);
    })
    .catch(next);
};

// method for toggeling post's like

const togglePostLike = (req, res, next, isLiked) => {
  const userId = req.user._id;
  const { postId } = req.params;
  const method = isLiked ? { $addToSet: { likes: userId } } : { $pull: { likes: userId } };
  Posts.findOneAndUpdate(
    { _id: postId },
    method,
    { new: true },
  )
    .orFail()
    .then((post) => {
      post.isLiked = isLiked;
      res.status(200).send(post);
    })
    .catch((error) => {
      console.log(error);
      if (error.name === 'CastError') {
        next(new InvalidDataError('invalid user id'));
      } else if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError('post not found'));
      } else {
        next(new ServerError());
      }
    });
};

// add like to a post, using the togglePostLike function
const putLikeToPost = (req, res, next) => togglePostLike(req, res, next, true);

// remove like from a post, using the togglePostLike function
const removeLikeFromPost = (req, res, next) => togglePostLike(req, res, next, false);

module.exports = {
  createPost, getPosts, addComment, putLikeToPost, removeLikeFromPost,
};
