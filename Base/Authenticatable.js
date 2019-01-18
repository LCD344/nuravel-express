const bcrypt = require('bcrypt');
const Model = require('./Model');
const jwtService = require('../Services/Services/JwtService');

class Authenticatable extends Model {

	hidden() {
		return [
			'password',
		];
	}

	async validatePassword(password) {
		return await bcrypt.compare(password, this.password);
	}

	async setPassword(password) {
		this.password = await bcrypt.hashSync(password, process.env.SALT_ROUNDS || 12);
	}

	loginToken() {
		return jwtService.generate({
			id: this.id,
			username: this.username
		});
	}
}

module.exports = Authenticatable;
