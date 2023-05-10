const postsRouter = require('express').Router();
const {
  createPost, getPosts, addComment, putLike, deleteLike,
} = require('../controllers/posts');

postsRouter.post('/posts', createPost);
postsRouter.get('/posts', getPosts);
postsRouter.put('/posts/:_id/comments', addComment);
postsRouter.put('/posts/:_id/likes', putLike);
postsRouter.delete('/posts/:_id/likes', deleteLike);

module.exports = postsRouter;
