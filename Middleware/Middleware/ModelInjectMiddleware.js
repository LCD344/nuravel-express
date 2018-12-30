const path = require('path');
const BaseMiddleware = require('./BaseMiddleware');

const BaseError = require('../../Errors/BaseError');
const autolader = require('../../Helpers/Autoloader');

const models = autolader.load(path.resolve(process.cwd(), 'app/Models'));

class ModelMiddleware extends BaseMiddleware {
	handle() {
		return async (req, res, next) => {
			req.objects = {};
			for (let prop in req.params) {
				if (req.params[prop]) {
					const className = prop.charAt(0).toUpperCase() + prop.substr(1);
					if (models[className] !== undefined) {
						const key = keys[className] || 'id';
						const condition = {};
						condition[key] = req.params[prop];

						const model = await new models[className](condition).fetch();
						if (!model) {
							throw new BaseError('Not Found', 404);
						}
						req.objects[prop] = await new models[className](condition).fetch();
					}
				}
			}
			next();
		}
	}
}

module.exports = ModelMiddleware;
