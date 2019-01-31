var express = require('express');
var router = express.Router();
var pwh = require('password-hash');
var validateEmail = require('../public/javascripts/functions/validateEmail.js');
var query = require('../public/javascripts/database/dbquery.js');
var generator = require('../public/javascripts/functions/generator.js');
var writeActivity = require('../public/javascripts/functions/writeActivity.js');
var setLoggedIn = require('../public/javascripts/functions/setLoggedIn.js');
var getOnlinePlayers = require('../public/javascripts/functions/getOnlinePlayers.js');
var consolecmd = require('../public/javascripts/functions/console.js');
var getAllPlayers = require('../public/javascripts/functions/getAllPlayers.js');
var transferMoney = require('../public/javascripts/functions/transferMoney.js');
var changeMoney = require('../public/javascripts/functions/changeMoney.js');
var stdCall = require('../public/javascripts/functions/stdCall.js');
var checkAdmin = require('../public/javascripts/functions/checkAdmin.js');


/* GET home page. */
router.get('/', async function(req, res, next) {
	await stdCall(req);
	getOnlinePlayers(function(onlinePlayers) {
		req.session.onlinePlayers = onlinePlayers;
		res.render('index', {title: 'Hackergame', isAdmin: req.session.isAdmin, loggedIn:req.session.loggedIn, onlinePlayers: req.session.onlinePlayers});
	});
});

router.get('/signup', async function(req, res, next) {
	await stdCall(req);
	res.render('signup', { title: 'Sign up', message: req.query.error, isAdmin: req.session.isAdmin, loggedIn: req.session.loggedIn });
});

router.get('/login', async function(req, res, next) {
	await stdCall(req);
	res.render('login', {title: 'Login', message: req.query.error, isAdmin: req.session.isAdmin, loggedIn: req.session.loggedIn});
});

router.get('/bank', async function(req, res, next) {
	await stdCall(req);
	getAllPlayers(req.session.uuid, function(players) {
		res.render('bank', {title: 'Bank', loggedIn: req.session.loggedIn, isAdmin: req.session.isAdmin, name: req.session.name, money:req.session.money, players:players});
	});
});

router.post('/bank', function(req, res, next) {
	transferMoney(req, function() {
		res.redirect('/bank');
	});
});

router.get('/admin', function(req, res, next) {
	res.render('admin', {title: 'Adminarea', message: req.query.error, isAdmin: req.session.isAdmin, loggedIn: req.session.loggedIn});
});

router.post('/deposit', function(req, res, next) {
	changeMoney(req.session.uuid, req.body.amount, "give");
	res.redirect('/');
});

router.get('/profile', async function(req,res,next) {
	await stdCall(req);
	res.render('profile', {title: 'Profile', isAdmin: req.session.isAdmin, loggedIn: req.session.loggedIn, 
				user:{name:req.session.name,
				xp:req.session.xp,
				level:req.session.level,
				money:req.session.money,
				ip: req.session.ip}});
});

router.get('/logout', async function(req,res,next) {
	await setLoggedIn(false, req.session.uuid);
	req.session.destroy();
	res.redirect('/');
});

router.get('/console', async function(req, res, next) {
	await stdCall(req);
	res.render('console', {title: 'Console', loggedIn: req.session.loggedIn, isAdmin: req.session.isAdmin, message: req.session.command_log});
});

router.post('/console', function(req, res, next) {
	consolecmd(req, req.body.command, function(message) {
		//res.render('console', {loggedIn: req.session.loggedIn, message: message});
		res.redirect('/console');
	});
});

router.post('/login', async function(req,res,next) {
	var login = req.body.login;
	var password = req.body.password;
	var exists = false;
	var results;
	var sql; 
	var sql2;

	// Define sql query for username or mail
	if(validateEmail(login)){
		sql = "SELECT * FROM logins WHERE mail='"+login+"';";
	}else{
		sql = "SELECT * FROM logins WHERE name='"+login+"';";
	}

	// Get the names and mail addresses
	results = await query("SELECT name,mail FROM logins;");
	// Check if the username exists
	for(var i in results) {
		if(results[i].name.toLowerCase() == login.toLowerCase() || results[i].mail.toLowerCase() == login.toLowerCase()){
			exists = true;
			break;
		}
	}
	//If username or email exists in database
	if(exists) {
		results = await query(sql)
		// Compare entered pw to hashed pw
		// If password correct
		if(pwh.verify(password, results[0].password) && !results[0].loggedIn){
			req.session.userid = results[0].id;
			req.session.name = results[0].name;
			req.session.loggedIn = true;
			req.session.uuid = results[0].uuid;
			sql = "SELECT ip_address FROM userdata WHERE uuid='"+req.session.uuid+"';";
			results = await query(sql);
			req.session.ip = results[0].ip_address;	
			await writeActivity(req.session.uuid);
			req.session.isAdmin = await checkAdmin(req.session.uuid);
			await setLoggedIn(req.session.loggedIn, req.session.uuid);
			res.redirect('/');
		// If password not correct
		} else {
			res.redirect('/login?error=loginFailed');
		}
	// If login doesn't exists
	} else {
		res.redirect('/login');
	}

});

router.post('/signup', async function(req, res, next) {
	var mail = req.body.mail;
	var name = req.body.username;
	var password = req.body.password;
	var confirm_password = req.body.confirmPassword;

	var ip_address;

	var takenNames = [];
	var takenMails = [];

	var sql = "SELECT mail, name FROM logins;";

	// Load the list of already taken emails and usernames
	var results = await query(sql);
	for(var i in results){
		takenNames.push(results[i].name.toLowerCase());
		takenMails.push(results[i].mail.toLowerCase());
	}
	//Check if the email format is correct, the password length, and
	//for duplicate emails and usernames
	if(validateEmail(mail) &&
		password.length >= 4 &&
		takenNames.indexOf(name.toLowerCase()) <= -1 &&
		takenMails.indexOf(mail.toLowerCase()) <= -1 &&
		confirm_password == password){

		// Generate password hash
		password = pwh.generate(password);
		// Generate uuid
		var uuid = await generator.genUUID();
		// Gen IP
		var ip_address = await generator.genIP();

		sql = "INSERT INTO logins(uuid,mail, name, password) VALUES('"+uuid+"','"+mail.toLowerCase()+"','"+name+"','"+password+"');";
		var sql2 = "INSERT INTO money(uuid, money) VALUES('"+uuid+"', '10000');";
		var sql3 = "INSERT INTO levels(uuid, level, xp) VALUES('"+uuid+"', '0', '0');";
		var sql4 = "INSERT INTO userdata(uuid, ip_address) VALUES('"+uuid+"', '"+ip_address+"');";
		var sql5 = "INSERT INTO lastActivity(uuid) VALUES ('"+uuid+"');";

		// Insert values
		await query(sql);
		await query(sql2);
		await query(sql3);
		await query(sql4);
		await query(sql5);
		res.redirect('login');

	//Redirect with error msg
	}else{
		res.redirect('signup?error=invalidEmail');
	}
});

module.exports = router;
