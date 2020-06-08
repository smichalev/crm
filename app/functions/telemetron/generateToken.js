const path = require('path');
const {telemetron} = require(path.join(__dirname, '..', '..', 'config'));
const axios = require('axios');

module.exports = async () => {
	let result;
	try {
		result = await axios.post('https://api.telemetron.net/auth', telemetron);

		if (result && result.data && result.data.access_token) {
			return result.data.access_token;
		}
		else {
			throw new Error('Not working');
		}
	}
	catch (e) {
		throw new Error(e);
	}
};