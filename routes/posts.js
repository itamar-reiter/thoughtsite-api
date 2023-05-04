const postsRouter = require('express').Router();
const {
  createPost, getPosts, addComment, putLikeToPost, removeLikeFromPost,
} = require('../controllers/posts');

postsRouter.post('/posts', createPost);
postsRouter.get('/posts', getPosts);
postsRouter.put('/posts/:_id/comments', addComment);
postsRouter.put('/posts/:_id/likes', putLikeToPost);
postsRouter.delete('/posts/:_id/likes', removeLikeFromPost);

module.exports = postsRouter;
