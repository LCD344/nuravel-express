class Factory {
	model(data) {
		throw new Error('Model is undefined');
	}

	define() {
		return {}
	}

	async create(data, count = 1) {
		let result = [];
		for (let i = 0; i < count; i++) {
			result.push(await this.createOne(data));
		}

		if (count == 1) {
			return result[0];
		}

		return result;
	}

	async createOne(data) {
		data = Object.assign(await this.define(), data);
		const object = new (this.model())(data);
		await object.save();
		return object;
	}
}

module.exports = Factory;
