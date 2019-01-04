const validate = require('../Middleware/Middleware/ValidationMiddleware');
const authorize = require('../Middleware/Middleware/AuthorizeMiddleware');

const functions = Symbol('functions');

class Request {
	handle() {
		return [
			authorize.handle(this.authorize),
			validate.validate(this.rules()),
			this[functions].bind(this)
		]
	};

	[functions](req, res, next) {
		let proto = Object.getPrototypeOf(this);
		req.methods = {};
		while (proto && proto !== Request.prototype) {
			Object.getOwnPropertyNames(proto)
				.forEach(name => {
					if (name !== 'constructor' && name !== 'authorize' && name !== 'rules') {
						req.methods[name] = this[name].bind(req);
					}
				});
			proto = Object.getPrototypeOf(proto);
		}
		next();
	}


	authorize() {
		return true;
	}

	rules() {
		return {};
	}
}

module.exports = Request;

