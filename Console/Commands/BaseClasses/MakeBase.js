const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const exec = require('child_process').execSync;

class MakeBase {
	constructor() {
		this.path = '';
		this.stub = '';
	}

	handle(name) {
		console.log(chalk.yellow(`generating ${this.path}/${name}.js`));

		try {
			this.ensureDirExistence();
			let stub = fs.readFileSync(path.resolve(__dirname, '../Stubs', this.stub)).toString();
			fs.writeFileSync(`${this.path}/${name}.js`, stub.split('{{name}}').join(name));
			console.log(chalk.green(`${this.path}/${name}.js created successfully`));
			this.open(`${this.path}/${name}.js`);
		} catch (error) {
			console.log(chalk.bgRed(`${this.path}/${name}.js creation failed with the following error`, error));
		}
	}

	open(file) {
		try {
			exec(`start ${file}`);
		} catch (error) {
			console.log(chalk.red(error));
		}
	}

	ensureDirExistence() {
		if (!fs.existsSync(this.path)) {
			fs.mkdirSync(this.path, {
				recursive: true,
				mode: 0o755
			});
		}
	}
}

module.exports = MakeBase;