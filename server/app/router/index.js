/**
 * The index of Routes
 */
var geo         = require('./endpoints/geo');


module.exports = function (
    app
    ) {

  app.route('/geo')
    .post(geo.fetch);
};
