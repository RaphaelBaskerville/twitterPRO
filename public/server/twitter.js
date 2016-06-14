var Twitter = require('twitter'),
    twitterKeys,
    tweetLimit = 5,
    tweetTimeout = 3600000,
    likeLimit = 1,
    likeTimeout = 60000,
    latestMentions = [],
    idStrings = {},
    tweetBot = {},
    twitterStream = {};


//create twitter connection
if (process.env.NODE_ENV !== 'production') {
  twitterKeys = require('./twitterKeys');
} else {
  twitterKeys = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  };
}
var twit = new Twitter(twitterKeys);

tweetBot.loginUser = function (keys) {
  return new Twitter(keys);
};

tweetBot.sendUserTweet = function (twitterConnection, tweet) {
  twitterConnection.post('statuses/update', {
    status: tweet
  }, function (error, tweet){
    if (error) {
      console.log(error);
    } else {
      console.log('-------');
      console.log('TWEETED', tweet.text);
      console.log('-------');
    }
  });
};

// requests user data from twitter, takes a user ID or screenname??
tweetBot.getUserObj = function(user, callback) {
  twit.get('users/show', {
    screen_name: user
  }, function(err, obj) {
    if (err) {
      console.log("error in getUserObj");
      console.log(err);
      callback(err);
    } else {
      console.log('returned twitter obj');
      callback(null, obj);
    }
  });
};

tweetBot.getTweet = function (tweetId) {
  console.log('get tweet: does nothing yet');
};

// attaches a handle to a message and tweets it.
tweetBot.sendTweetToUser = function(user, tweet) {
  twit.post('statuses/update', {
    status: "@" + user + " " + tweet
  }, function(error, tweet) {
    if (error) {
      console.error(error);
    } else {
      console.log('-------');
      console.log('tweeted', tweet);
      console.log('-------');
    }
  });
};

// takes a string and tweets it with the current user.
tweetBot.tweet = function(tweetString) {
  console.log('in tweetBot.tweet');
  twit.post('statuses/update', {
    status: tweetString
  }, function(err, tweet) {
    if (err) {
      console.log('tweet errored', err);
    } else {
      console.log('tweet success');
    }
  });
};


// initiate the stream.
tweetBot.init = function(io, query) {
  if (!query) {
    query = "feelthebern";
  }
  var tweetsBuffer = [];
  twit.stream('statuses/filter', {
    track: query
  }, function(stream) {
    twitterStream = stream;
    console.log('--------------------');
    console.log('Connected to twitter');
    console.log('--------------------');
    stream.on('data', function(tweet) {
      var msg = {};
      msg.text = tweet.text;
      msg.tweet = tweet;
      msg.id = tweet.id_str;
      msg.user = {
        name: tweet.user.name,
        image: tweet.user.profile_image_url
      };
      tweetsBuffer.push(msg);
      //send buffer only if full
      if (tweetsBuffer.length >= tweetLimit) {
        //broadcast tweets
        io.sockets.emit('tweets', tweetsBuffer);
        tweetsBuffer = [];
      }
    });
  });
};
  tweetBot.changeStream = function (io, queryObj) {
  console.log('queryObj: ', queryObj);
  var tweetsBuffer = [];
  twitterStream.destroy();
  twit.stream('statuses/filter', queryObj, function(stream) {
    twitterStream = stream;
    console.log('------------------------');
    console.log('-Reconnected to twitter-');
    console.log('------------------------');
    stream.on('data', function(tweet) {
      if (!tweet.user) {
        tweet.user = {
          name: null,
          image: null
        };
      }
      var msg = {};
      msg.text = tweet.text;
      msg.id = tweet.id_str;
      msg.tweet = tweet;
      msg.user = {
        name: tweet.user.name,
        image: tweet.user.profile_image_url
      };
      tweetsBuffer.push(msg);
      //send buffer only if full
      if (tweetsBuffer.length >= tweetLimit) {
        //broadcast tweets
        io.sockets.emit('tweets', tweetsBuffer);
        tweetsBuffer = [];
      }
    });
  });
};
  tweetBot.getTweetById = function (id, callback) {
    twit.get('statuses/show/' + id, function (response) {
      callback(response);
      console.log('TWITTER: get message success', response);
    });
  }
  


module.exports = tweetBot;
