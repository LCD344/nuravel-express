const BaseMiddleware = require('./BaseMiddleware');
const csrfProtection = require('csurf')({cookie: true});

class CSRFMiddleware extends BaseMiddleware {
	constructor(router) {
		if (process.env.APP_ENV !== 'test') {
			router.use(csrfProtection);
		}
		super(router);
	}

	handle(req, res, next) {
		if (process.env.APP_ENV !== 'test') {
			res.header(process.env.APP_CSRF_HEADER || 'csrfToken', req.csrfToken());
		}
		next();
	}
}

module.exports = CSRFMiddleware;
