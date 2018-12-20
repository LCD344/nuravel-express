const MakeBase = require('./BaseClasses/MakeBase');
const path = require('path');

class MakeController extends MakeBase {
	constructor() {
		super();
		this.signature = "make:controller <name>";
		this.description = "Create a controller";
		this.path = path.resolve(process.cwd(), './app/Http/Controllers');
		this.stub = 'controller';
	}
}


module.exports = new MakeController;