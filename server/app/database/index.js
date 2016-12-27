/**
 * Database interface
 */
var mongoose      = require('mongoose');
var UserModel			= require('./schemas/user');

var developmentDb = 'mongodb://localhost/test';
var productionDb = 'mongodb://localhost/test';
var usedDb;

mongoose.Promise = global.Promise;

// If we're in development...
if (process.env.NODE_ENV === 'development') {
    // set our database to the development one
    usedDb = developmentDb;
    // connect to it via mongoose
    mongoose.connect(usedDb);
}

// If we're in production...
if (process.env.NODE_ENV === 'production') {
    // set our database to the development one
    usedDb = productionDb;
    // connect to it via mongoose
    mongoose.connect(usedDb);
}

// get an instance of our connection to our database
var db = mongoose.connection;

// Logs that the connection has successfully been opened
db.on('error', console.error.bind(console, 'connection error:'));
// Open the connection
db.once('open', function callback () {
  console.log('Database Connection Successfully Opened at ' + usedDb);
});

exports.user = UserModel;
