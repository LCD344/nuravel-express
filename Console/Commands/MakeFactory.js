const MakeBase = require('./BaseClasses/MakeBase');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');

class MakeFactory extends MakeBase {
	constructor() {
		super();
		this.signature = "make:factory <name> <model>";
		this.description = "Make a new factory";
		this.path = path.resolve(process.cwd(), './database/factories');
		this.stub = 'factory';
	}

	handle(name, model) {
		console.log(chalk.yellow(`generating ${this.path}/${name}.js`));

		try {
			this.ensureDirExistence(name);
			this.writeToFile(name, model);
			console.log(chalk.green(`${this.path}/${name}.js created successfully`));
			this.open(`${this.path}/${name}.js`);
		} catch (error) {
			console.log(chalk.bgRed(`${this.path}/${name}.js creation failed with the following error`, error));
		}
	}

	writeToFile(name, model) {
		const stub = fs.readFileSync(path.resolve(__dirname, './Stubs', this.stub)).toString();
		fs.writeFileSync(`${this.path}/${name}.js`, stub.split('{{name}}').join(name).split('{{model}}').join(model));
	}
}


module.exports = new MakeFactory;
