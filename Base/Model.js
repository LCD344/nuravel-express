let driver;
const models = {};

class Model {
	constructor(schema) {
		if (models[this.constructor.name]) {
			this.model = models[this.constructor.name];
		} else {
			const model = new driver.Schema(schema, {
				timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
				toJSON: {
					transform: this.toJSON.bind(this)
				}
			});
			const methods = this.getInstanceMethodNames(this);

			methods.forEach((method) => {
				model.methods[method] = this[method];
			});

			this.model = driver.model(this.constructor.name, model);
			models[this.constructor.name] = this.model;
		}
	}

	getInstanceMethodNames(obj) {
		let array = [];
		let proto = Object.getPrototypeOf(obj);
		while (proto && proto !== Model.prototype) {
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

	toJSON(doc, ret) {
		let hidden = [];
		if (typeof this.hidden === 'function') {
			hidden = this.hidden();
		}

		for (const prop in ret) {
			if (hidden.indexOf(prop) > -1) {
				delete ret[prop];
			}
		}

		return ret;
	}

	static getModel(name) {
		return models[name];
	}

	static set driver(value) {
		driver = value;
	}
}

module.exports = Model;

