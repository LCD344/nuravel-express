const BaseError = require('../../Errors/BaseError');

class AuthorizeMiddleware {

	handle(callback) {
		return async (req, res, next) => {
			const authorized = await callback(req);
			if (!authorized) {
				next(new BaseError('Forbidden', 403));
			}

			return next();
		}
	}
}

module.exports = new AuthorizeMiddleware;
