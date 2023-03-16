const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { UNAUTHENTICATED_ERROR_ERROR_CODE } = require('../utils/errors/errorCodes');
const UnauthenticatedError = require('../utils/errors/UnauthenticatedError');
const InvalidDataError = require('../utils/errors/InvalidDataError');
const ServerError = require('../utils/errors/ServerError');
const ConflictError = require('../utils/errors/ConflictError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'not-so-secret-string',
        {
          expiresIn: '7d',
        },
      );
      console.log(token);
      res.send({ token });
    })
    .catch((error) => {
      console.log(error);
      if (error.statusCode === UNAUTHENTICATED_ERROR_ERROR_CODE) {
        next(new UnauthenticatedError('Could not log in. email or password are invalid'));
      } else {
        next(new ServerError());
      }
    });
};

const getUsers = (req, res, next) => {
  console.log('in get users controller');
  const { name } = req.params;
  const regex = new RegExp(name, 'i');
  Users.find({ name: { $regex: regex } })
    .then((users) => {
      if (!users) {
        throw new ServerError();
      }
      res.status(200).send(users);
    })
    .catch(next);
};

const addUserToFollowers = (req, res, next) => {
  const userId = req.user._id;
  const friendId = req.params._id;
  console.log(userId);
  console.log(friendId);
  Users.findOneAndUpdate({ _id: friendId }, { $addToSet: { followers: userId } })
    .then((user) => {
      console.log(user);
      res.status(200).send(user);
    })
    .catch(next);
};

const addFriend = (req, res, next) => {
  const userId = req.user._id;
  const { friendsIds } = req.body;
  Users.findOneAndUpdate({ _id: userId }, {
    $addToSet: { friends: friendsIds },
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const deleteFriend = (req, res, next) => {
  const userId = req.user._id;
  const { friendId } = req.body;
  Users.findOneAndUpdate({ _id: userId }, {
    $pull: { friends: friendId },
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const getUserData = (req, res, next) => {
  const id = req.user._id;
  return Users.findOne({ _id: id })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      email, password: hash, name,
    }))
    .then((user) => {
      delete user._doc.password;
      res.status(200).send(user);
    })
    .catch((error) => {
      console.log(error);
      if (error.name === 'ValidationError') {
        next(new InvalidDataError('Invalid email url or password, or an item is missing.'));
      } else if (error.name === 'MongoServerError') {
        next(new ConflictError("There's allready a user with that email adress. please put another email"));
      } else {
        next(error);
      }
    });
};

module.exports = {
  login, getUsers, getUserData, createUser, addUserToFollowers, addFriend, deleteFriend,
};
