var express = require('express');
var router = express.Router();
// sql = require('../public/javascripts/dbconn.js')
var pool = require('../public/javascripts/dbconn.js');
var pwh = require('password-hash');
var validateEmail = require('../public/javascripts/validateEmail.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Sign up', message: 'Sign up' });
});

router.get('/login', function(req, res, next){
	res.render('login', {title: 'Login'});
});

router.post('/login', function(req,res,next){
	var login = req.body.login;
	var password = req.body.password;
	var sql; 
	if(validateEmail(login)){
		sql = "SELECT * FROM logins WHERE mail='"+login+"'";
	}else{
		sql = "SELECT * FROM logins WHERE name='"+login+"'";
	}
	
	pool.getConnection(function(err, connection){
		connection.query(sql,function(err, results){
			if (err) throw err;
			console.log(results);
			connection.release();

		});

	});

});

router.post('/signup', function(req, res, next){
	var mail = req.body.mail;
	var name = req.body.username;
	var password = pwh.generate(req.body.password);

	if(validateEmail(mail)){
		pool.getConnection(function(err, connection){
			var sql = "INSERT INTO logins(mail, name, password) VALUES('"+mail+"','"+name+"','"+password+"')";
			connection.query(sql, [], function(err, results){
				connection.release();
			});
			
		})
		res.render('signup',{title: "Sign up", message: "Sign up successful"});
	}else{
		res.render('signup',{title: "Sign up", message: "Error: Enter a valid email"});
	}
});

module.exports = router;
