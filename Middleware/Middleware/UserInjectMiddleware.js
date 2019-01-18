const BaseMiddleware = require('./BaseMiddleware');
const jwtService = require('../../Services/Services/JwtService');

class UserInjectMiddleware extends BaseMiddleware {
	handle(req, res, next) {
		const {token} = req.signedCookies;
		const user = jwtService.verify(token);
		if (user) {
			req.user = user;
		} else {
			req.user = null;
		}
		next();
	}
}

module.exports = UserInjectMiddleware;
