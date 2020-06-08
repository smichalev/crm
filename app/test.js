(async () => {
	let token = await require('./functions').telemetron.generateToken();
	console.log(token);
})();
