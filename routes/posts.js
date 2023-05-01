const postsRouter = require('express').Router();
const { createPost, getPosts, addComment } = require('../controllers/posts');
const { idValidator } = require('../middleware/celebrateValidators');

postsRouter.post('/posts', createPost);
postsRouter.get('/posts', getPosts);
postsRouter.put('/posts/:_id', addComment);

module.exports = postsRouter;
