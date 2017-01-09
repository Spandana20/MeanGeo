/**
 * The index of Routes
 */
var geo         = require('./endpoints/geo');
var weather     = require('./endpoints/weather');


module.exports = function (
    app
    ) {

  app.route('/geo')
    .post(geo.fetch);

  app.route('/someWeather')
    .post(weather.some);

  app.route('/allWeather')
    .post(weather.all);
};
