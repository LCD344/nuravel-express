const fs = require('fs');
const path = require('path');

class Autoloader {
	load(dir) {
		let result = {};

		if (fs.existsSync(dir)) {
			fs.readdirSync(dir).filter((file) => {
				return !fs.lstatSync(path.resolve(dir, file)).isDirectory();
			}).forEach((file) => {
				const filePath = path.resolve(dir, file);
				result[file.replace(/\.[^/.]+$/, "")] = require(path.resolve(dir, file));
			});
		}

		return result;
	}
}

module.exports = new Autoloader;
