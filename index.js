const commands = require('./Console/Commands');
const autoloader = require('./Helpers/Autoloader');
const Middleware = require('./Middleware/Middleware');
const Services = require('./Services/Services');
const Factory = require('./Base/Factory');
const Errors = require('./Errors/Errors');
const Kernel = require('./Base/Kernel');
const Router = require('./Base/Router');
const Model = require('./Base/Model');
const Request = require('./Base/Request');
const Authenticatable = require('./Base/Authenticatable');
const Database = require('./Base/Database');
Test = {}
if(process.env.APP_ENV === 'test'){
	Test = require('./Base/Test');
}

module.exports = {
	Kernel,
	Router,
	commands,
	autoloader,
	Errors,
	Middleware,
	Factory,
	Model,
	Request,
	Authenticatable,
	Services,
	Database,
	Test
};
