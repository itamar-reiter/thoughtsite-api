const usersRouter = require('express').Router();
const { idValidator } = require('../middleware/celebrateValidators');
const {
  getUserData, getUsers, addUserToFollowers, addFriend, deleteFriend,
} = require('../controllers/users');

usersRouter.get('/users/me', idValidator, getUserData);
usersRouter.get('/users/:name', getUsers);
usersRouter.put('/users/:_id', addUserToFollowers);
usersRouter.put('/users/me/friends', addFriend);
usersRouter.delete('/users/me/friends', deleteFriend);

module.exports = usersRouter;
