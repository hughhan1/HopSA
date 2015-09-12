var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');

module.exports = function() {
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'OurSuperSecretCookieSecret'
	}));

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());

	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/psas.server.routes.js')(app);

	app.use(express.static('./public'));

	return app;
};