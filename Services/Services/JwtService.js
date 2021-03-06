const jwt = require('jsonwebtoken');

class JwtService {

	generate(data) {
		return jwt.sign(data, process.env.APP_SECRET, {
			expiresIn: process.env.LOGIN_DURATION || 604800000
		});
	}

	verify(token) {
		try {
			return jwt.verify(token, process.env.APP_SECRET);
		} catch (error) {
			return false;
		}
	}
}

module.exports = new JwtService();
