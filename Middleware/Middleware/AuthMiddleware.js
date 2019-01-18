const DataError = require('../../Errors/DataError');

module.exports = function (req, res, next) {
	if (req.user) {
		next();
	} else {
		res.clearCookie("token");
		throw new DataError('Forbidden', 403, {
			message: "No user.",
			clearToken: true
		});
	}
};
