const request = require('supertest');
const test = require('ava');
const sinon = require('sinon');

const getMethods = Symbol('Get methods');

class Test {
	loginPath() {
		return '/auth/login';
	};

	constructor(app = false) {
		this.serial = true;
		this.withDb = true;
		this.mock = sinon;
		this.app = app;
		if (app) {
			this.request = request(app);
		}
	}

	async setUp() {
		if (this.withDb && !global.db.runningInstance) {
			await global.db.start();
		}
	}

	async tearDown() {
		if (this.withDb) {
			await global.db.stop();
		}
		this.mock.restore();
	}

	async authorize(username, password) {

		return (await this.request.post(this.loginPath()).send({
			username: username,
			password: password
		})).headers['set-cookie'];

	}


	run() {
		test.beforeEach(this.setUp.bind(this));
		test.afterEach.always(this.tearDown.bind(this));

		const methods = this[getMethods]();

		methods.forEach((method) => {
			if (method.indexOf('test') === 0) {
				if (this.serial) {
					test.serial(method.replace(/_/g, ' '), this[method].bind(this));
				} else {
					test(method.replace(/_/g, ' '), this[method].bind(this));
				}
			} else if (method.indexOf('only_test') === 0) {
				test.only(method.replace(/_/g, ' '), this[method].bind(this));
			}
		});
	}


	[getMethods]() {
		let array = [];
		let proto = Object.getPrototypeOf(this);
		while (proto && proto !== Test.prototype) {
			Object.getOwnPropertyNames(proto)
				.forEach(name => {
					if (name !== 'constructor') {
						array.push(name);
					}
				});
			proto = Object.getPrototypeOf(proto);
		}
		return array;
	}
	// TODO dedicated test request class
	hasError(response, param, message) {
		return response.body.errors.some((error) => {
			let messageExists = true;
			if (message) {
				messageExists = error.msg === message;
			}
			return error.param === param && messageExists;
		});
	}

	async databaseHas(model, data) {
		const exists = await model.findOne(data);

		return !!exists;
	}
}

module.exports = Test;
