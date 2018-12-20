const {execSync} = require('child_process');

class KeyGenerate {

	constructor() {
		this.signature = "debug";
		this.description = "Serve and restart while watching file (Requires nodemon)";
	}

	handle() {
		execSync(`npm run debug`, {
			cwd: process.cwd(),
			stdio: 'inherit'
		}, (err, stdout, stderr) => {
			if (err) {
				throw err;
			}

			// the *entire* stdout and stderr (buffered)
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
	}
}

module.exports = new KeyGenerate;