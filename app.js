require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const router       = express.Router();

const session      = require("express-session");
const bcrypt       = require("bcryptjs");
const passport     = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash        = require("connect-flash");
const User         = require('./models/User')



mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';






passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});



app.use(flash())




passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

app.use(session({
  secret: "our-passport-local-stragey-app",
  resave: true,
  saveUninitialized: true
}));



app.use(passport.initialize());
app.use(passport.session());



app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});




const index = require('./routes/index');
app.use('/', index);

const login = require('./routes/login');
app.use('/', login);

const signup = require('./routes/signup');
app.use('/', signup);

const test = require('./routes/test');
app.use('/', test);

const games = require('./routes/games');
app.use('/', games);

const addGame = require('./routes/add-game');
app.use('/', addGame);

const gameDetails = require('./routes/game-details');
app.use('/', gameDetails);

const review = require('./routes/reviews');
app.use('/', review);

const deleteGame = require('./routes/delete-game');
app.use('/', deleteGame);

const editGame = require('./routes/edit-game');
app.use('/', editGame);


module.exports = app;
