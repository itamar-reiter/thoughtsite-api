const Posts = require('../models/post');
const Users = require('../models/user');
const InvalidDataError = require('../utils/errors/InvalidDataError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ServerError = require('../utils/errors/ServerError');


// get all posts
const getPosts = (req, res, next) => {
  const userId = req.user._id;
  let user = {};
  Users.findOne({ _id: userId })
    .then((userOutput) => {
      user = userOutput;
    })
    .catch(next);

  Posts.find({})
    .then((posts) => {
      // sorting potsts by number of comments
      const sortedPosts = posts.sort((a, b) => b.comments.length - a.comments.length);
      // sorting posts by friendship
      const sortPostsByFriendship = sortedPosts.sort((a, b) => {
        const aFriendship = user._doc.friends.includes(a._doc.owner);
        const bFriendship = user._doc.friends.includes(b._doc.owner);
        if (aFriendship && !bFriendship) {
          return -1;
        }
        if (!aFriendship && bFriendship) {
          return 1;
        }
        return 0;
      });
      // adding isLiked property to each post, based on user's likes
      const postsWithIsLiked = sortPostsByFriendship.map((post) => {
        if (post._doc.likes.includes(userId)) {
          post._doc.isLiked = true;
        } else {
          post._doc.isLiked = false;
        }
        return post;
      });
      return postsWithIsLiked;
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
  console.log('in toggle like');
  const userId = req.user._id;
  const postId = req.params._id;
  console.log(postId);
  const method = isLiked ? { $addToSet: { likes: userId } } : { $pull: { likes: userId } };
  Posts.findOneAndUpdate(
    { _id: postId },
    method,
    { new: true },
  )
    .orFail()
    .then((post) => {
      post._doc.isLiked = isLiked;
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
const putLike = (req, res, next) => togglePostLike(req, res, next, true);

// remove like from a post, using the togglePostLike function
const deleteLike = (req, res, next) => togglePostLike(req, res, next, false);

module.exports = {
  createPost, getPosts, addComment, putLike, deleteLike,
};
