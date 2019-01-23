var express = require('express');
var router = express.Router();
// sql = require('../public/javascripts/dbconn.js')
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
	var sql; 
	var returnPw;

	if(validateEmail(login)){
		sql = "SELECT * FROM logins WHERE mail='"+login+"'";
	}else{
		sql = "SELECT * FROM logins WHERE name='"+login+"'";
	}

	pool.getConnection(function(err, con){
		if (err) throw err;
		con.query(sql,function(err, results){
			con.release();
			if (err) throw err;
			returnPW = results[0].password;
			if(pwh.verify(password, returnPW)){
				req.session.loggedIn = true;
				res.redirect('/');
			}else{
				res.redirect('/login?error=loginFailed');
			}
		});
	});


});

router.post('/signup', function(req, res, next){
	var mail = req.body.mail;
	var name = req.body.username;
	var password = req.body.password;

	if(validateEmail(mail) && password.length >= 4){
		password = pwh.generate(password);
		pool.getConnection(function(err, con){
			var sql = "INSERT INTO logins(mail, name, password) VALUES('"+mail+"','"+name+"','"+password+"')";
			con.query(sql, function(err, results){
				con.release();
				if (err) throw err;
				res.redirect('/login');
			});
		});
	}else{
		res.redirect('signup?error=invalidEmail');
	}
});

module.exports = router;
