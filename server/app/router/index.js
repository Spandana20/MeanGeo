/**
 * The index of Routes
 */
var user        = require('./endpoints/user');

module.exports = function (
    app
    ) {

  app.route('/signup')
    .post(user.signup);
};
