const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const chalk = require('chalk');

const generateEnvFile = Symbol('generateEnvFile');
const generateAppKey = Symbol('generateAppKey');

class KeyGenerate {

	constructor() {
		this.signature = "key:generate";
		this.description = "Generate application key";
	}

	handle() {
		console.log(chalk.yellow('Setting app key'));
		const envFile = path.resolve(process.cwd(), './.env');
		if (!fs.existsSync(envFile)) {
			this[generateEnvFile](envFile);
		}
		const key = this[generateAppKey](envFile);
		console.log(chalk.yellow(`App key set: ${key}`));
	}

	[generateEnvFile](envFile) {
		const envExample = path.resolve(process.cwd(), './.env.example');
		if (!fs.existsSync(envExample)) {
			fs.writeFileSync(envFile, "APP_SECRET=");
			return;
		}

		const content = fs.readFileSync(envExample).toString();
		fs.writeFileSync(envFile, content);
	}

	[generateAppKey](file) {
		let key = crypto.randomBytes(64);
		key = key.toString('base64');

		const content = fs.readFileSync(file).toString();
		fs.writeFileSync(file, content.replace(/APP_SECRET=\S*/, `APP_SECRET=${key}`));
		return key;

	}
}

module.exports = new KeyGenerate;