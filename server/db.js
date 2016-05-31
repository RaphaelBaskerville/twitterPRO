var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// specify which db to use and where it is.
mongoose.connect('mongodb://localhost/twitterBot');

var db = mongoose.connection;

db.on('error', console.error.bind(console, "Connected error"));

db.once('open', function() {
  console.log("we're connected port:3000");
});

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: {
      unique: true
    }
  },
  password: String,
  twitterId: String,
  admin: Number,
});

var ListSchema = mongoose.Schema({
  name: {
    type: String,
    index: {
      unique: true,
    },
  },
  user: String,
});

var TargetSchema = mongoose.Schema({
  handle: {
    type: String,
    index: {
      unique: true
    }
  },
  interval: String,
  list: String,
});

var MessageSchema = mongoose.Schema({
  text: {
    type: String,
    index: {
      unique: true
    }
  },
  list: String,
});

var HashTagSchema = mongoose.Schema({
  text: {
    type: String,
    index: {
      unique: true
    }
  },
  list: String,
});


var Target = mongoose.model('target', TargetSchema);
var Message = mongoose.model('message', MessageSchema);
var HashTag = mongoose.model('HashTag', HashTagSchema);
var User = mongoose.model('User', UserSchema);
var List = mongoose.model('List', ListSchema);

var helpers = {};

var models = {
  target: Target,
  message: Message,
  hashtag: HashTag,
  user: User,
  list: List,
};

// HANDLES GET REQUESTS TO /API/MODELS
// Either gets all or a specific instance.
helpers.handleGet = function(model, searchObject, callback) {
  console.log('----------------------');
  console.log('DB multi route handler \nseraching for: ', model);
  console.log('DB search parameters', searchObject);
  console.log('----------------------');
  // check to see if we should get all
  if (searchObject.all) {

    console.log('DB searching for all ');
    models[model].find({}).then(function(results) {

      console.log('DB got all ', model);
      callback(results);
    });
  } else {
    console.log('searching for single');
    models[model].find(searchObject).then(function(obj) {

      console.log('DB Success');
      callback(obj);
    });
  }
};

//HANDLES DELETE REQUESTS TO /API/MODELS
helpers.handleDelete = function(model, searchObject, callback) {
  console.log('----------------------');
  console.log('DB deleting: ', model);
  console.log('searchObject: ', searchObject);
  console.log('----------------------');
  models[model].find(searchObject).remove(function(err, result) {
    if (err) {
      console.log('DB error in delete', err);
    } else {
      console.log('delete successful');
      callback(result);
    }
  });
};

// HANDLES POST REQUESTS TO /API/MODELS
helpers.handlePost = function(model, payload, callback) {
  console.log('----------------------');
  console.log('DB POST api/models CREATING NEW: ', model);
  console.log('payload', payload);
  console.log('----------------------');
  new models[model](payload).save(function(err, user) {
    if (err) {
      console.log('DB error on CREATE: ', err);
    } else {
      console.log('DB success on CREATE');
      callback(user);
    }
  });
};

// HANDLES PUT REQUESTS TO /API/MODELS
helpers.handlePut = function(model, payload, callback) {
  console.log('----------------------');
  console.log('DB PUT api/models Updating', model);
  console.log('payload: ', payload);
  console.log('----------------------');
  models[model].update(payload.user, {
    $set: payload.update
  }, function(err, result) {
    if (err) {
      console.log('DB error on UPDATE: ', model);

    } else {
      console.log('DB success on UPDATE: ');
      callback(result);

    }
  });
};

console.log('db is feeling good');
module.exports = {
  Target: Target,
  Message: Message,
  HashTag: HashTag,
  helpers: helpers
};
