const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
	name: String,
	password: String,
	role: String,
});

const User = mongoose.model("User", userScheme);

module.exports = User;