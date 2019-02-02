var express = require('express');
var router = express.Router();
var setLoggedIn = require('../public/javascripts/functions/setLoggedIn.js');
var getOnlinePlayers = require('../public/javascripts/functions/getOnlinePlayers.js');
var consolecmd = require('../public/javascripts/functions/console.js');
var getAllPlayers = require('../public/javascripts/functions/getAllPlayers.js');
var transferMoney = require('../public/javascripts/functions/transferMoney.js');
var changeMoney = require('../public/javascripts/functions/changeMoney.js');
var stdCall = require('../public/javascripts/functions/stdCall.js');
var adminAreaHandler = require('../public/javascripts/functions/admin/adminHandler.js');
var signup = require('../public/javascripts/functions/signup.js');
var login = require('../public/javascripts/functions/login.js');
var neededXP = require('../public/javascripts/functions/leveling/xpForLvlup.js');
var cashbonus = require('../public/javascripts/functions/cashbonus.js');


/* GET home page. */
router.get('/', async function(req, res, next) {
	await stdCall(req);
	var onlinePlayers = await getOnlinePlayers();
	req.session.onlinePlayers = onlinePlayers;
	res.render('index', {title: 'Hackergame', loggedIn: req.session.loggedIn, isAdmin: req.session.isAdmin, onlinePlayers: req.session.onlinePlayers});
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
	var players = await getAllPlayers(req.session.uuid, "everyoneButYou");
	res.render('bank', {title: 'Bank', loggedIn: req.session.loggedIn, isAdmin: req.session.isAdmin, name: req.session.name, money: req.session.money, players: players});
});

router.post('/bank', async function(req, res, next) {
	await transferMoney(req);
	res.redirect('/bank');
});

router.get('/admin', async function(req, res, next) {
	let players = await getAllPlayers(req.session.uuid, "everyone");
	res.render('admin', {title: 'Adminarea', message: req.query.error, isAdmin: req.session.isAdmin, loggedIn: req.session.loggedIn, players: players});
});

router.post('/deposit', async function(req, res, next) {
	await changeMoney(req.session.uuid, req.body.amount, "give");
	res.redirect('/');
});

router.get('/profile', async function(req, res, next) {
	await stdCall(req);
	var xpNextlvl = await neededXP(req.session.xp, req.session.level);
	var user = {name: req.session.name,displayName: req.session.displayName,xp: req.session.xp, neededXP: xpNextlvl, level: req.session.level,money: req.session.money, ip: req.session.ip};
	res.render('profile', {title: 'Profile', isAdmin: req.session.isAdmin, loggedIn: req.session.loggedIn,user:user});
});

router.get('/logout', async function(req, res, next) {
	await setLoggedIn(false, req.session.uuid);
	req.session.destroy();
	res.redirect('/');
});

router.get('/console', async function(req, res, next) {
	await stdCall(req);
	res.render('console', {title: 'Console', loggedIn: req.session.loggedIn, isAdmin: req.session.isAdmin, message: req.session.command_log});
});

router.get('/cashbonus', async function(req, res, next) {
	await cashbonus(req.session.uuid);
	res.redirect('/');
});

router.post('/admin', async function(req, res, next) {
	if(req.body.confirm) {
		await adminAreaHandler(req.body.operation, req.body.user, req.body.additional);
	}
	res.redirect('/admin');
});

router.post('/console', async function(req, res, next) {
	await consolecmd(req, req.body.command);
	//res.render('console', {loggedIn: req.session.loggedIn, message: message});
	res.redirect('/console');
});

router.post('/login', async function(req,res,next) {
	var success = await login(req, req.body.login, req.body.password);

	if(success) {
		res.redirect('/');
	} else {
		res.redirect('/login?error=loginFailed');
	}
});

router.post('/signup', async function(req, res, next) {
	var success = await signup(req, req.body.mail, req.body.username, req.body.password, req.body.confirmPassword);

	if(success) {
		res.redirect('login');
	} else {
		res.redirect('signup?error=invalidEmail');
	}
});

module.exports = router;
