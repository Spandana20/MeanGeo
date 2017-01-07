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

  app.route('/weather')
    .post(weather.fetch);
};
