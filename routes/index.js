var express = require('express');
var router = express.Router();
// sql = require('../public/javascripts/dbconn.js')
var con = require('../public/javascripts/dbconn.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Sign up' });
});

router.post('/submit', function(req, res, next){
	// res.render('signup', {title: req.body.email});
	var mail = req.body.mail;
	var name = req.body.username;
	var password = req.body.password;
	
	var sql = "INSERT INTO logins(mail, name, password) VALUES('"+mail+"','"+name+"','"+password+"')";
	con.query(sql, function(err, result){
		if (err) throw err;
	})
	res.render('signup', {title: "test"});
});

module.exports = router;
