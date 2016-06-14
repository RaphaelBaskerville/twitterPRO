var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var schedule = require('node-schedule');
var _ = require('lodash');

var passport = require('passport');
var TwitterStrategy  = require('passport-twitter').Strategy;
// var twitterKeys = require('./twitterKeys');
var jwt = require('jsonwebtoken');

var db = require('./db.js');
var tweetBot = require('./twitter.js');
var userTweets = require('./automation.js');

var TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET;

// server config
/////////////////
var port = process.env.PORT || 3000;
var app = express();

//serve static files
//////////////////////
var staticPath = path.join(__dirname, '../');
app.use(express.static(staticPath));

// middleware
//////////////
  //headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  // body parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
  //logger
app.use(morgan('dev'));

app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); 


if (process.env.NODE_ENV !== 'production') {
  console.log('DEV MODE');
  TWITTER_CONSUMER_KEY = require('./twitterKeys.js').consumer_key;
  TWITTER_CONSUMER_SECRET = require('./twitterKeys.js').consumer_secret;

  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../../webpack.dev.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

} else {
  TWITTER_CONSUMER_KEY = process.env.CONSUMER_KEY;
  TWITTER_CONSUMER_SECRET = process.env.CONSUMER_SECRET;

}
//configure passport

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    //find the user
    db.User.find({ twitterId: profile.id }, function (err, data) {
      //if the user does exist
      if (data[0]) {
        // return the callback with existing user
        return cb(err, data[0]);  
        // otherwise make a new user and return the callback with the new user        
      } else {
        new db.User({ twitterId:profile.id, username:profile.username, admin: false, profile:profile, imageUrl: profile._json.profile_background_image_url, token:token, token_secret:tokenSecret }).save(function(err, user){
          console.log('err', err);
          console.log('NEW USER', user);
          return cb(err, user);          
        });
      }
    });
  }
));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// serve login page at '/'
app.get('/', function (req,res){
  res.sendFile(path.join(__dirname, '../../index.html'));
});

//ROUTES
////////
app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    console.log('TWITTER AUTH CALLBACK');
    console.log('REQ',req);
    var token = jwt.sign(req.user, 'superSecret');

    // res.set({token: token, user: req.user});
    // Successful authentication, redirect home.
    res.redirect('/?'+token);
  });

app.get('/logout', function(req,res){
  req.logout();
  req.session.destroy(function(){
    res.send();
  });
});


app.use('/api', require('./routers/authRouter.js'));
app.use('/api', require('./routers/apiRoutes.js'));

//
// twitter
//

app.get('/twitter/statuses/show/:id', function (req, res) {
  tweetBot.getTweetById(req.params.id, function (results){
    res.status(200).send(results);
  });
});
app.post('/userObj', function(req, res) {
  tweetBot.getUserObj(req.body.handle, function(err,obj){
    if (err) {
      console.error('error fetching user', err);
    } else {
      res.send(obj);
    }
  });
});

app.post('/twitterStream', function(req, res) {
  console.log('post /twitterStream recieved: changing stream');
  tweetBot.changeStream(io, req.body);
  res.status(200).send('SERVER: changed stream');
});

//all other routes send to react-router
app.get('*', function (req, res){
  console.log('path', path.join(__dirname, '../../', 'index.html'));
  res.sendFile(path.join(__dirname, '../../', 'index.html'));
});

// uncomment to enable tweets
userTweets();

console.log('app listening: ', port);
var server = app.listen(port);
var io = require('socket.io').listen(server);
// tweetBot.init(io);
