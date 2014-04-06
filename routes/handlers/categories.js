var util = require('util'),
	BaseRoutesHandler = require('./base');

// The module exports a constructor
module.exports = CategoriesRoutesHandler;

// Inherit the base handler
util.inherits(CategoriesRoutesHandler, BaseRoutesHandler);

function CategoriesRoutesHandler(endpoint) {

	if (!(this instanceof CategoriesRoutesHandler)) {
		return new CategoriesRoutesHandler(endpoint);
	}

	var categories = require('../../lib/categories/categories.js');

	// call parent's ctor
	CategoriesRoutesHandler.super_.apply(this, arguments);

	this.getRoutes = {
		'/': list
	};

	// Request handling functions:

	function list(req, res) {
		categories.fetch_all(req, function(final_result) {
			res.json(final_result);
		});
	};

}