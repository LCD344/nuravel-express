const BaseMiddleware = require('./BaseMiddleware');

const BaseError = require('../../Errors/BaseError');

class ModelOwnershipMiddleware extends BaseMiddleware {
	handle(object) {
		return (req, res, next) => {
			if (!req.user || req.objects[object].user_id !== req.user.id) {
				throw new BaseError('Forbidden', 403);
			}
			next();
		}
	}
}

module.exports = ModelOwnershipMiddleware;
