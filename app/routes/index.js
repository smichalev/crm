const path = require('path');
const {User} = require(path.join(__dirname, '..', 'models'));
const Errors = require(path.join(__dirname, '..', 'errors'));
const md5 = require('md5');
const roles = require(path.join(__dirname, '..', 'data', 'roles'));

module.exports = (app) => {
	app.get('/', (req, res, next) => {
		res.render('index');
	});
	app.get('/login', (req, res, next) => {
		res.render('index');
	});
	
	app.get('/api/profile', (req, res, next) => {
		return res.status(200).json({profile: !req.session.user ? null : req.session.user});
	});
	
	app.post('/api/login', async (req, res, next) => {
		try {
			if (!req.body.name || !req.body.password || !req.body.role) {
				throw new Errors(Errors.CODES.NOT_CORRECT_QUERY);
			}
			
			let {name, password, role} = req.body;
			
			let profile = await User.findOne({name, password: md5(password), role});
			
			if (!profile) {
				throw new Errors(Errors.CODES.BAD_PASSWORD_OR_LOGIN);
			}
			
			req.session.user = profile;
			req.session.save();
			
			return res.status(200).json({profile});
		}
		catch (err) {
			next(err);
		}
	});
	
	app.post('/api/logout', (req, res, next) => {
		try {
			req.session.user = null;
			req.session.save();
			
			return res.status(200).send('ok');
		}
		catch (err) {
			next(err);
		}
	});
	
	app.get('/api/roles', async (req, res, next) => {
		try {
			if (!req.query.role) {
				throw new Errors(Errors.CODES.NOT_CORRECT_QUERY);
			}
			
			if (roles.indexOf(req.query.role) === -1) {
				throw new Errors(Errors.CODES.NOT_CORRECT_QUERY);
			}
			
			let result = await User.find({role: req.query.role});
			let users = [];
			
			if (result.length) {
				for (let i = 0; i < result.length; i++) {
					users.push(result[i].name);
				}
			}
			
			return res.status(200).json({users});
		}
		catch (err) {
			next(err);
		}
	});
	
	app.use((err, req, res, next) => {
		if (!err) {
			return next();
		}
		
		let response = {};
		
		if (err.code !== null && err.code !== 'undefined') {
			response.code = err.code;
		}
		
		let message = err.message || 'Неизвестная ошибка';
		
		response.message = message;
		
		return res.status(err.status).json({error: response});
	});
	
	app.use((err, req, res, next) => {
		let error = new Errors(Errors.CODES.NOT_FOUND);
		
		return res.status(404).json({error});
	});
};