const MakeBase = require('./BaseClasses/MakeBase');
const path = require('path');

class MakeController extends MakeBase {
	constructor() {
		super();
		this.signature = "make:model <name>";
		this.description = "Create a model";
		this.path = path.resolve(process.cwd(), './app/Models');
		if (process.env.DB_DRIVER === 'mongoose') {
			this.stub = 'modelMongo';
		} else {
			this.stub = 'modelMysql';
		}
	}
}


module.exports = new MakeController;
