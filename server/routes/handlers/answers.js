var util = require('util'),
	BaseRoutesHandler = require('./base');

// The module exports a constructor
module.exports = AnswersRoutesHandler;

// Inherit the base handler
util.inherits(AnswersRoutesHandler, BaseRoutesHandler);

function AnswersRoutesHandler(endpoint) {

	if (!(this instanceof AnswersRoutesHandler)) {
		return new AnswersRoutesHandler(endpoint);
	}

	// call parent's ctor
	AnswersRoutesHandler.super_.apply(this, arguments);

	this.getRoutes = {
		'/': list,
		':id': get,
		'question/:id': listForQuestion
	};

	// Request handling functions:

	function list(req, res) {
		res.send("I am a list of all top rated answers");
	};

	function listForQuestion(req, res) {
		res.send("I am a list of answers by question id");
	};

	function get(req, res) {
		res.send("I am a specific answer by ID");
	};

}