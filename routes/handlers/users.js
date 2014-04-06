var util = require('util'),
	BaseRoutesHandler = require('./base');

// The module exports a constructor
module.exports = UsersRoutesHandler;

// Inherit the base handler
util.inherits(UsersRoutesHandler, BaseRoutesHandler);

function UsersRoutesHandler(endpoint) {

	if (!(this instanceof UsersRoutesHandler)) {
		return new UsersRoutesHandler(endpoint);
	}

	// call parent's ctor
	UsersRoutesHandler.super_.apply(this, arguments);

	this.getRoutes = {
		'/': list
	};

	// Request handling functions:

	function list(req, res) {
		res.send("respond with a resource111");
	};

}