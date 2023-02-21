const { errors } = require('celebrate');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();
const authMiddleware = require('./middleware/auth');
const errorMiddleware = require('./middleware/error');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { loginValidator, registerValidator } = require('./middleware/celebrateValidators');
const indexRouter = require('./routes');
// listen to port 3001
const { PORT = 3001 } = process.env;

mongoose.connect(process.env.DATABASE_ADDRESS, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(requestLogger);

// crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// signup
app.post('/signup', registerValidator, createUser);

// login
app.post('/signin', loginValidator, login);

// use auth middleware only for protected routes
app.use(authMiddleware);

// TODO prevent user from editing users/cards - section

app.use('/', indexRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
