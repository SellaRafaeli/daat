module.exports = {

	env: 'development',
	logLevel: 'debug',
	neverDie: true,

	frontend: {
		port: 8080,
		uiEndpoint: '/',
		static: './public/ui'
	},

	daat: {
		initialQuestionRating: 400,
		initialAnswerRating: 400,
		status: {
			pending: 'pending',
			active: 'active',
			suspicious: 'suspicious',
			banned: 'banned'
		}
	},

	mongo: {
		url: 'mongodb://127.0.0.1:27017/daat-development'
	},

	redis: {
		host: '127.0.0.1',
		port: '6379',
		pass: false, // Redis password (string or false)
		db: 1 // Redis database to use
	}

}