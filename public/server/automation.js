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
  //clear current cronjobs
  cronTargets = clearTargets(cronTargets);
  //get all users
  db.User.find({})
  .then(function(users){
    _.each(users, function(user){
        // create a twitter connection for each user
        var userKeys = {
          consumer_key: process.env.CONSUMER_KEY || TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET || TWITTER_CONSUMER_SECRET,
          access_token_key: user.token,
          access_token_secret: user.token_secret
        };
        var userTwitter = tweetBot.loginUser(userKeys);
        //get all groups for the current user
        db.List.find({user:user.username})
        .then(function(groups){
          _.each(groups, function(group){
              // for each group, get the associated targets, messages and hashtags
              var targets = db.Target.find({list:group.name});
              var messages = db.Message.find({list: group.name});
              var hashtags = db.HashTag.find({list: group.name});
              // once we have all of the models back
              Promise.all([targets, messages, hashtags]).then(function(data){
                targets = data[0];
                messages = data[1];
                hashtags = data[2];
              // loop through the targets and create a cron schedule for each one
              for (var i = 0; i < targets.length; i++) {
                cronTargets.push(new schedule.scheduleJob(targets[i].interval, function(target, messages, hashtags, cronTargets) {
                  message = '@' + target.handle + ' ' + randomElement(messages).text + ' #' + randomElement(hashtags).text;
                  console.log('user: ', user.username, 'message: ', message);
// UNCOMMENT TO GO LIVE!
                  // tweetBot.sendUserTweet(userTwitter, message);
                }.bind(null, targets[i], messages, hashtags, cronTargets)));
              }
            });
            });
        });
      });
  });
};

function clearTargets(cronJobs) {
    console.log('canceling jobs');
  _.each(cronJobs, function(cronJob, key){
    cronJob.cancel();
  })

  return [];
}

function randomElement(array) {
  var size = array.length;
  return array[Math.floor(Math.random() * size)];
};
