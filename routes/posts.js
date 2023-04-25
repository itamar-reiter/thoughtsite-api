const postsRouter = require('express').Router();
const { createPost, getPosts } = require('../controllers/posts');
const { idValidator } = require('../middleware/celebrateValidators');

postsRouter.post('/posts/:_id', createPost);
postsRouter.get('/posts', getPosts);

module.exports = postsRouter;
