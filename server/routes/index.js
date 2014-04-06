module.exports = {

	setup: function(app) {

		// route handlers:
		var rhUsers = require('./handlers/users')('users'),
			rhQuestions = require('./handlers/questions')('questions'),
			rhAnswers = require('./handlers/answers')('answers'),
			rhCategories = require('./handlers/categories')('categories');

		rhUsers.setup(app);
		rhQuestions.setup(app);
		rhAnswers.setup(app);
		rhCategories.setup(app);

	}

};