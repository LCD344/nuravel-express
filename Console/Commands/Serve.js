const {execSync} = require('child_process');

class KeyGenerate {

	constructor() {
		this.signature = "serve";
		this.description = "Serves application";
	}

	handle() {
		execSync(`npm run start`, {
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