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

	writeToFile(name) {
		const stub = fs.readFileSync(path.resolve(__dirname, './Stubs', this.stub)).toString();
		fs.writeFileSync(`${this.path}/${name}.js`, stub.split('{{name}}').join(name).split('{{model}}').join(model));
	}
}


module.exports = new MakeFactory;
