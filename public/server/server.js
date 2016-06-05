var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var schedule = require('node-schedule');
var path = require('path');
var passport = require('passport');
var TwitterStrategy  = require('passport-twitter').Strategy;
var TWITTER_CONSUMER_KEY = require('./twitterKeys.js').consumer_key;
var TWITTER_CONSUMER_SECRET = require('./twitterKeys.js').consumer_secret;
var db = require('./db.js');
var jwt = require('jsonwebtoken');


// twitter bot 
var tweetBot = require('./twitter.js');

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    db.User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// database

// server config
var port = process.env.PORT || 3000;
var app = express();

// middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var staticPath = path.join(__dirname, '../');
console.log('static path',staticPath);
app.use(express.static(staticPath));
// app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); 

app.use(morgan('dev'));

//configure passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//subrouters
// app.use('/', require('./routers/test.js'));
app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('TWITTER AUTH CALLBACK');
    console.log('user: ',req.user);

    var token = jwt.sign(req.user, 'superSecret');

    // return the information including token as JSON
    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });
    
    // req.session.accessToken = token;
    // Successful authentication, redirect home.
    // res.redirect('/');
  });


// var authApiRoutes = express.Router();

// // route middleware to verify a token
// authApiRoutes.use(function(req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//   // decode token
//   if (token) {
//     // verifies secret and checks exp
//     jwt.verify(token, 'superSecret', function(err, decoded) {      
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });    
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;    
//         next();
//       }
//     });
//   } else {
//     // if there is no token
//     // return an error
//     return res.status(403).send({ 
//         success: false, 
//         message: 'No token provided.' 
//     });
//   }
// });

// // route to show a random message (GET http://localhost:8080/api/)


// // route to return all users (GET http://localhost:8080/api/users)


// // apply the routes to our application with the prefix /api
// app.use('/api', authApiRoutes);

app.use('/api', require('./routers/apiRoutes.js'));
app.get('/', function (err,res){
  res.sendFile(path.join(__dirname, '../../index.html'));
});
console.log('NODE PROCESS', process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
  console.log('DEV MODE');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../../webpack.dev.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}



//
// twitter
//

app.get('/twitter/statuses/show/:id', function (req, res) {
  console.log("SERVER: get /twitter/statuses/" + req.params.id);
  tweetBot.getTweetById(req.params.id, function (results){
    console.log('SERVER: tweet fetched');
    res.status(200).send(results);
  });
});
app.post('/userObj', function(req, res) {
  tweetBot.getUserObj(req.body.handle, res);
});

app.post('/twitterStream', function(req, res) {
  console.log('post /twitterStream recieved: changing stream');
  tweetBot.changeStream(io, req.body);
  res.status(200).send('SERVER: changed stream');
});


//TODO: this is terrible need to fix.
var autoTweet = function() {
  var targets, messages, hashtags;
  // wait
  db.Target.find({}).then(function(data) {
    targets = data;
    console.log('targets done');
    targets.forEach(function(target) {
      console.log(target.handle);
    });
    console.log('________________');
    // wait
    db.Message.find({}).then(function(data) {
      messages = data;
      console.log('messages done');
      messages.forEach(function(message) {
        console.log(message.text);
      });
      console.log('________________');
      //wait
      db.HashTag.find({}).then(function(data) {
        hashtags = data;
        console.log('hashtags done');
        hashtags.forEach(function(hashtag) {
          console.log(hashtag.text);
        });
        console.log('________________');
        // console.log('hashtags done', hashtags);

        function randomElement(array) {
          var size = array.length;
          return array[Math.floor(Math.random() * size)];
        };

        for (var i = 0; i < targets.length; i++) {
          targets[i].loop = new schedule.scheduleJob(targets[i].interval, function(target) {
            message = randomElement(messages).text + ' #' + randomElement(hashtags).text;
            console.log('cron message________@' + target.handle + '_________');
            console.log('message: ', message);
            tweetBot.sendTweetToUser(target.handle, message);
          }.bind(null, targets[i], messages, hashtags));
          console.log(targets[i].interval);
        }
      });
    });
  });
};

// uncomment to enable tweets
// autoTweet();

console.log('app listening: ', port);
var server = app.listen(port);
var io = require('socket.io').listen(server);
// tweetBot.init(io);
