const BaseMiddleware = require('../Middleware/Middleware/BaseMiddleware');

class Kernel {
	constructor(app) {
		this.app = app;
	}

	preMiddleware() {
		return [];
	}


	postMiddleware() {
		return [];
	}

	registerMiddleware(middlewareList) {
		middlewareList.forEach((middleware) => {
			if (middleware.prototype instanceof BaseMiddleware) {
				new middleware(this.app);
			} else {
				this.app.use(middleware);
			}
		})
	}

	registerPreMiddleware() {
		this.registerMiddleware(this.preMiddleware());
	}

	registerPostMiddleware() {
		this.registerMiddleware(this.postMiddleware());
	}

	static boot(app) {
		return new this(app);
	}
}

module.exports = Kernel;
