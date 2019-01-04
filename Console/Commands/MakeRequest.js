const MakeBase = require('./BaseClasses/MakeBase');
const path = require('path');

class MakeController extends MakeBase {
	constructor() {
		super();
		this.signature = "make:request <name>";
		this.description = "Create a request";
		this.path = path.resolve(process.cwd(), './app/Http/Requests');
		this.stub = 'request';
	}
}


module.exports = new MakeController;
