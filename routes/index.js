var express = require('express');
var router = express.Router();
// sql = require('../public/javascripts/dbconn.js')
var con = require('../public/javascripts/dbconn.js');
var pwh = require('password-hash');
var validateEmail = require('../public/javascripts/validateEmail.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express', loggedIn: req.session.loggedIn});
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Sign up', message: 'Sign up', loggedIn: req.session.loggedIn });
});

router.get('/login', function(req, res, next){
	res.render('login', {title: 'Login', message: 'login', loggedIn: req.session.loggedIn});
});

router.post('/login', function(req,res,next){
	var login = req.body.login;
	var password = req.body.password;
	var sql; 
	var returnPw;
	sql = "SELECT * FROM logins WHERE name='"+login+"'";
	// if(validateEmail(login)){
	// 	sql = "SELECT * FROM logins WHERE mail='"+login+"'";
	// }else{
	// 	sql = "SELECT * FROM logins WHERE name='"+login+"'";
	// }
	con.query(sql,function(err, results){
		if (err) throw err;
		returnPW = results[0].password;
		console.log("returnPW: ", returnPW);
		console.log("Passed");
		if(pwh.verify(password, returnPW)){
			console.log("correct");
			res.render('login', {title: 'Login', message: 'Successfully logged in'});
			req.session.loggedIn = true;
		}else{
			console.log("wrong");
			res.render('login', {title: 'Login', message: 'Login failed'});
		}
	});


});

router.post('/signup', function(req, res, next){
	var mail = req.body.mail;
	var name = req.body.username;
	var password = pwh.generate(req.body.password);

	if(validateEmail(mail)){
		var sql = "INSERT INTO logins(mail, name, password) VALUES('"+mail+"','"+name+"','"+password+"')";
		con.query(sql, function(err, results){
			if (err) throw err;
		});
		res.render('signup',{title: "Sign up", message: "Sign up successful"});
	}else{
	res.render('signup',{title: "Sign up", message: "Error: Enter a valid email"});
	}
});

module.exports = router;
