var _ = require('lodash');
var schedule = require('node-schedule');

var db = require('./db.js');
var tweetBot = require('./twitter.js');

var cronTargets = [];


if (process.env.NODE_ENV !== 'production') {
  TWITTER_CONSUMER_KEY = require('./twitterKeys.js').consumer_key;
  TWITTER_CONSUMER_SECRET = require('./twitterKeys.js').consumer_secret;

} else {
  TWITTER_CONSUMER_KEY = process.env.CONSUMER_KEY;
  TWITTER_CONSUMER_SECRET = process.env.CONSUMER_SECRET;

}

module.exports = function () {
  for (var i = 0; i < cronTargets.length; i++) {
    console.log('canceling job #', i + 1);
    cronTargets[i].cancel();
  }
  cronTargets = [];

  db.User.find({})
    .then(function(users){
      _.each(users, function(user){
        var userKeys = {
          consumer_key: process.env.CONSUMER_KEY || TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET || TWITTER_CONSUMER_SECRET,
          access_token_key: user.token,
          access_token_secret: user.token_secret
        };
        var userTwitter = tweetBot.loginUser(userKeys);
        db.List.find({user:user.username})
          .then(function(groups){
            _.each(groups, function(group){
              db.Target.find({list:group.name})
                .then(function(targets){
                  db.Message.find({list: group.name})
                    .then(function(messages){
                      db.HashTag.find({list: group.name})
                        .then(function(hashtags) {

                          function randomElement(array) {
                            var size = array.length;
                            return array[Math.floor(Math.random() * size)];
                          };

                          for (var i = 0; i < targets.length; i++) {
                           
                            cronTargets.push(new schedule.scheduleJob(targets[i].interval, function(target, messages, hashtags, cronTargets) {
                              var group = target.list;
                              message = '@' + target.handle + ' ' + randomElement(messages).text + ' #' + randomElement(hashtags).text;
                              console.log('user: ', user.username, 'message: ', message);
                              // tweetBot.sendUserTweet(userTwitter, message);
                              
                            }.bind(null, targets[i], messages, hashtags, cronTargets)));
                          };
                        });
                    });
                });
            });
            console.log('num of CRON TARGETS', cronTargets.length);
          });
      });
    });
};
