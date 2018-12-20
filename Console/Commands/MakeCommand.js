const MakeBase = require('./BaseClasses/MakeBase');
const path = require('path');

class MakeCommand extends MakeBase {
	constructor() {
		super();
		this.signature = "make:command <name>";
		this.description = "Make a new console command";
		this.path = path.resolve(process.cwd(), './app/Console/Commands');
		this.stub = 'command';
	}
}

module.exports = new MakeCommand;