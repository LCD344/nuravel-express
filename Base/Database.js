const BaseError = require('../Errors/BaseError');
const Model = require('./Model');

class Database {
	constructor(type, driver) {

		switch (type) {
			case 'mongoose':
				this.setUpMongoose(driver);
				break;
			case 'knex':
				this.setUpKnex();
				break;
			default:
				throw new BaseError('Unrecognized database driver');
		}
	}

	setUpMongoose(mongoose) {
		mongoose.connect(
			`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, {
				useNewUrlParser: true,
				useCreateIndex: true,
			}
		).then(() => {
			console.log('connected to db');
		}, (error) => {
			console.log(error);
		});

		mongoose.Promise = global.Promise;
		const db = mongoose.connection;

		db.on('error', console.error.bind(console, 'MongoDB connection error:'));
		Model.driver = mongoose;
		this.driver = mongoose;
	}

	setUpKnex() {

	}
}

module.exports = Database;
