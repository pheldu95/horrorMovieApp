
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const horrorRouter = require('./routes/horror.router');
const watchListRouter = require('./routes/watchList.router');
const subgenresRouter = require('./routes/subgenres.router');
const tagsRouter = require('./routes/tags.router');
const reviewsRouter = require('./routes/reviews.router');
const upvotesRouter = require('./routes/upvotes.router');
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/horror', horrorRouter);
app.use('/api/watchList', watchListRouter);
app.use('/api/watchedList', watchedListRouter);
app.use('/api/subgenres', subgenresRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/upvotes', upvotesRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
