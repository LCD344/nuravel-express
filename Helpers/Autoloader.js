const fs = require('fs');
const path = require('path');

class Autoloader {
	load(dir) {
		let result = [];

		if (fs.existsSync(dir)) {
			result = fs.readdirSync(dir).filter((file) => {
				return !fs.lstatSync(path.resolve(dir, file)).isDirectory();
			}).map((file) => {
				const filePath = path.resolve(dir, file);
				return require(path.resolve(dir, file));
			});
		}

		return result;
	}
}

module.exports = new Autoloader;