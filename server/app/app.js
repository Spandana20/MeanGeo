var express =       require('express');
var path =          require('path');
var favicon =       require('serve-favicon');
var logger =        require('morgan');
var cookieParser =  require('cookie-parser');
var bodyParser =    require('body-parser');

var routes =        require('./router/index');

var app = express();

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Development Settings
 */
if (app.get('env') === 'development') {
	// This will change in production since we'll be using the dist folder
	app.use(express.static(path.join(__dirname, '../../client')));
	// This covers serving up the index page
	app.use(express.static(path.join(__dirname, '../../client/.tmp')));
	app.use(express.static(path.join(__dirname, '../../client/app')));

  /**
   * Routes
   */
  var router = require('./router')(
    app
  );

	// Error Handling
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: {}
		});
	});
}

/**
 * Production Settings
 */
if (app.get('env') === 'production') {

	// changes it to use the optimized version for production
	app.use(express.static(path.join(__dirname, '../dist')));

  /**
   * Routes
   */
  var router = require('./router')(
    app
  );

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: {}
		});
	});
}

module.exports = app;
