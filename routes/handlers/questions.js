var util = require('util'),
	BaseRoutesHandler = require('./base');

// The module exports a constructor
module.exports = QuestionsRoutesHandler;

// Inherit the base handler
util.inherits(QuestionsRoutesHandler, BaseRoutesHandler);

function QuestionsRoutesHandler(endpoint) {

	if (!(this instanceof QuestionsRoutesHandler)) {
		return new QuestionsRoutesHandler(endpoint);
	}

	var questions = require('../../lib/questions/questions.js'),
		answers = require('../../lib/answers/answers.js');

	// call parent's ctor
	QuestionsRoutesHandler.super_.apply(this, arguments);

	this.getRoutes = {
		'/': list,
		':id': get,
		'category/:category_id': get_cat
	};

	this.postRoutes = {
		'new': new_question,
		':id/update': update,
		':id/new_answer': new_answer
	};

	// Request handling functions:

	function list(req, res) {
		res.json(questions.list_top_rates(req.params));
	};

	function get(req, res) {
		questions.fetch_question(req, function(final_result) {
			res.json(final_result);
		});
	};

	function get_cat(req, res) {
		var category = req.params.cat;
		res.json(questions.fetch_question_by_category(category));
	};

	function update(req, res) {
		questions.update(req, function(result) {
			res.json(result);
		});
	};

	function new_question(req, res) {
		res.json(questions.new_question(req.params));
	};

	function new_answer(req, res) {
		answers.create_and_attach_new_answer(req, function(resp) {
			res.json(resp);
		});
	};

}