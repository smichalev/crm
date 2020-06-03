const path = require('path');
const mongoose = require('mongoose');
const config = require(path.join(__dirname, 'config'));
const {User} = require(path.join(__dirname, 'models'));
const roles = require(path.join(__dirname, 'data', 'roles'));
const md5 = require('md5');

(async () => {
	try {
		await mongoose.connect(config.database, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}
	catch (e) {
		console.error(e);
	}
	
	try {
		let users = [
			{name: 'Иванов Иван Иванович', password: md5('123'), role: roles[6]},
			{name: 'Петров Петр Петрович', password: md5('123'), role: roles[5]},
			{name: 'Соня Мармеладова', password: md5('123'), role: roles[1]},
			{name: 'Анна Каренина', password: md5('123'), role: roles[1]},
		];
		
		for (let i = 0; i < users.length; i++) {
			let findUser = await User.findOne(users[i]);
			
			if (!findUser) {
				let user = new User(users[i]);
				await user.save();
			}
		}
		
		console.log('готово!');
	}
	catch (e) {
		console.error(e);
	}
})();