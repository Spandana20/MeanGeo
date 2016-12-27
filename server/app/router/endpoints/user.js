var db          = require('../../database');
var User				= db.user;

exports.signup = function (req, res, next) {
  console.log(JSON.stringify(req.body, null, 2));

	// Check to see if the user already exists
	// using their email address
	User.findOne({
		'email': req.body.email
	}, function (err, user) {

		// If there's an error, log it and return to user
		if (err) {
			console.log('Couldn\'t create new user because of: ' + err);
			// send the error
			res.status(500).json({
				'message': 'Internal server error from signing up new user.'
			});
		}
		// If the user doesn't exist, create one
		if (!user) {
			// setup the new user
			var newUser = new User({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				password: req.body.password1
			});

			// save the user to the database
			newUser.save(function (err, savedUser, numberAffected) {
				if (err) {
					console.log('Problem saving the user due to ' + err);
					res.status(500).json({
						'message': 'Database error trying to sign up.'
					});
				}

				res.status(201).json({
					'message': 'Successfully created new user'
				});
			});
		}

		// If the user already exists...
		if (user) {
			res.status(409).json({
					'message': req.body.email + ' already exists!'
			});
		}
	});
};
