var express = require('express');
var router = express.Router();
var pool = require('../public/javascripts/database/dbconn.js');
var pwh = require('password-hash');
var validateEmail = require('../public/javascripts/validateEmail.js');
var query = require('../public/javascripts/database/dbquery.js');
var sessionReload = require('../public/javascripts/loadSessionVars.js');
var generator = require('../public/javascripts/functions/generator.js');
var writeActivity = require('../public/javascripts/writeActivity.js');
var setLoggedIn = require('../public/javascripts/setLoggedIn.js');
var logoutInactive = require('../public/javascripts/logoutInactivePlayers.js');


/* GET home page. */
router.get('/', function(req, res, next) {
	logoutInactive(req.session.loggedIn, function(){
		sessionReload(req, function(){
			writeActivity(req.session.uuid, function(){	
				res.render('index', {title: 'Hackergame', loggedIn:req.session.loggedIn});
			});

		});
	});
});

router.get('/signup', function(req, res, next) {
	writeActivity(req.session.uuid, function(){	
		res.render('signup', { title: 'Sign up', message: req.query.error, loggedIn: req.session.loggedIn });
	});
});

router.get('/login', function(req, res, next){
	writeActivity(req.session.uuid, function(){
		res.render('login', {title: 'Login', message: req.query.error, loggedIn: req.session.loggedIn});
	});
});

router.get('/profile', function(req,res,next){
	writeActivity(req.session.uuid, function(){
		res.render('profile', {title: 'Profile', loggedIn: req.session.loggedIn, 
					user:{name:req.session.name,
					xp:req.session.xp,
					level:req.session.level,
					money:req.session.money,
					ip: req.session.ip}});
	});
});

router.get('/logout', function(req,res,next){
	setLoggedIn(false, req.session.uuid, function(){
		req.session.destroy();
		res.redirect('/');
	});
});

router.post('/login', function(req,res,next){
	var login = req.body.login;
	var password = req.body.password;
	var exists = false;
	var sql; 
	var sql2;

	// Define sql query for username or mail
	if(validateEmail(login)){
		sql = "SELECT * FROM logins WHERE mail='"+login+"'";
	}else{
		sql = "SELECT * FROM logins WHERE name='"+login+"'";
	}

	// Get the names and mail addresses
	query("SELECT name,mail FROM logins", function(results){
		console.log(results);
		// Check if the username exists
		for(var i in results){
			if(results[i].name == login || results[i].mail == login){
				exists = true;
				break;
			}
		}
		//If username or email exists in database
		if(exists){
			query(sql,function(results){
				// Compare entered pw to hashed pw
				// If password correct
				if(pwh.verify(password, results[0].password)){
					req.session.userid = results[0].id;
					req.session.name = results[0].name;
					req.session.loggedIn = true;
					req.session.uuid = results[0].uuid;
					sql = "SELECT ip_address FROM userdata WHERE uuid='"+req.session.uuid+"';";
					query(sql, function(results){
						setLoggedIn(true, req.session.uuid, function(){
							req.session.ip = results[0].ip_address;	
							res.redirect('/');
						});
					});
				// If password not correct
				}else{
					res.redirect('/login?error=loginFailed');
				}
			});
		// If login doesn't exists
		}else{
			res.redirect('/login');
		}
	});

});

router.post('/signup', function(req, res, next){
	var mail = req.body.mail;
	var name = req.body.username;
	var password = req.body.password;
	var confirm_password = req.body.confirmPassword;

	var uuid;
	var ip_address;

	var takenNames = [];
	var takenMails = [];

	var sql = "SELECT mail, name FROM logins";

	// Load the list of already taken emails and usernames
	query(sql, function(results){
			for(var i in results){
				takenNames.push(results[i].name);
				takenMails.push(results[i].mail);
			}
			//Check if the email format is correct, the password length, and
			//for duplicate emails and usernames
			if(validateEmail(mail) &&
				password.length >= 4 &&
				takenNames.indexOf(name) <= -1 &&
				takenMails.indexOf(mail) <= -1 &&
				confirm_password == password){

				// Generate password hash
				password = pwh.generate(password);
				// Generate uuid
				generator.genUUID(function(uuid){
					uuid = uuid;
					// Gen IP
					generator.genIP(function(ip){
						ip_address = ip;

						var sql = "INSERT INTO logins(uuid,mail, name, password) VALUES('"+uuid+"','"+mail+"','"+name+"','"+password+"')";
						var sql2 = "INSERT INTO money(uuid, money, robbable) VALUES('"+uuid+"', '10000', '2500');";
						var sql3 = "INSERT INTO levels(uuid, level, xp) VALUES('"+uuid+"', '1', '0');";
						var sql4 = "INSERT INTO userdata(uuid, ip_address) VALUES('"+uuid+"', '"+ip_address+"');";
						var sql5 = "INSERT INTO lastActivity(uuid) VALUES ('"+uuid+"');";

						// Insert values
						query(sql, function(results){
							query(sql2, function(results){
								query(sql3, function(results){
									query(sql4, function(results){
										query(sql5, function(results){
											res.redirect('login');
										});
									});
								});
							});
						});
					});
				});

			//Redirect with error msg
			}else{
				res.redirect('signup?error=invalidEmail');
			}
	});
});

module.exports = router;
