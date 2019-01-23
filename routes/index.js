var express = require('express');
var router = express.Router();
var pool = require('../public/javascripts/dbconn.js');
var pwh = require('password-hash');
var validateEmail = require('../public/javascripts/validateEmail.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Hackergame', loggedIn: req.session.loggedIn});
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Sign up', message: req.query.error, loggedIn: req.session.loggedIn });
});

router.get('/login', function(req, res, next){
	res.render('login', {title: 'Login', message: req.query.error, loggedIn: req.session.loggedIn});
});

router.get('/logout', function(req,res,next){
	req.session.destroy();
	res.redirect('/');
});

router.post('/login', function(req,res,next){
	var login = req.body.login;
	var password = req.body.password;
	var exists = false;
	var sql; 
	var returnPw;

	if(validateEmail(login)){
		sql = "SELECT * FROM logins WHERE mail='"+login+"'";
	}else{
		sql = "SELECT * FROM logins WHERE name='"+login+"'";
	}

	pool.getConnection(function(err, con){
		con.query("SELECT name,mail FROM logins", function(err, results){
			for(var i in results){
				if(results[i].name == login || results[i].mail == login){
					exists = true;
					break;
				}
			}
			if(exists){
				con.query(sql,function(err, results){
					con.release();
					returnPW = results[0].password;
					if(pwh.verify(password, returnPW)){
						req.session.loggedIn = true;
						res.redirect('/');
					}else{
						res.redirect('/login?error=loginFailed');
					}
				});
			}else{
			con.release();
			res.redirect('/login');
		}
		});
	});


});

router.post('/signup', function(req, res, next){
	var mail = req.body.mail;
	var name = req.body.username;
	var password = req.body.password;

	var takenNames = [];
	var takenMails = [];

	pool.getConnection(function(err, con){
		var sql = "SELECT mail, name FROM logins";

		// Load the list of already taken emails and usernames
		con.query(sql, function(err, results){
			con.release();
			for(var i in results){
				takenNames.push(results[i].name);
				takenMails.push(results[i].mail);
			}
			//Check if the email format is correct, the password length, and
			//for duplicate emails and usernames
			if(validateEmail(mail) &&
				password.length >= 4 &&
				takenNames.indexOf(name) <= -1 &&
				takenMails.indexOf(mail) <= -1){

				password = pwh.generate(password);

				pool.getConnection(function(err, con){
				var sql = "INSERT INTO logins(mail, name, password) VALUES('"+mail+"','"+name+"','"+password+"')";
				con.query(sql, function(err, results){
					con.release();
					res.redirect('/login');
				});
			});
			//Redirect with error msg
			}else{
				res.redirect('signup?error=invalidEmail');
			}
		});
	});
});

module.exports = router;
