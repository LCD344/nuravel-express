const MakeBase = require('./BaseClasses/MakeBase');
const path = require('path');

class MakeMiddleware extends MakeBase {
	constructor() {
		super();

		this.signature = "make:middleware <name>";
		this.description = "Make a new middleware"
		this.path = path.resolve(process.cwd(), './app/Http/Middleware');
		this.stub = 'middleware';
	}
};

module.exports = new MakeMiddleware;
