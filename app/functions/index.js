const path = require('path');

module.exports = {
	telemetron: {
		generateToken: require(path.join(__dirname, 'telemetron', 'generateToken'))
	}
};