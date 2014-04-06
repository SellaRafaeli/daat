// This module exports a constructor
module.exports = function BaseRoutesHandler(endpoint) {

	var resolve = require('path').resolve,
		self = this;

	this.endpoint = endpoint;

	// The base handler has no routes.
	// Each inheriting handler will define its
	// own routes.
	this.getRoutes = {};
	this.postRoutes = {};

	this.setup = function(app) {

		for (var route in self.getRoutes) {
			var handler = self.getRoutes[route];
			var fullRoute = resolve('/', endpoint, route.replace(/^\/+/,''));
			app.get(fullRoute, handler);
		}

		for (var route in self.postRoutes) {
			var handler = self.postRoutes[route];
			var fullRoute = resolve('/', endpoint, route.replace(/^\/+/,''));
			app.post(fullRoute, handler);
		}

	};

}