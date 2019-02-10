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
var cashbonus = require('../public/javascripts/functions/cashbonus.js');
var getUserInfo = require('../public/javascripts/functions/getUserInfo.js');
var stdParameter = require('../public/javascripts/functions/stdParameter.js');
var listShop = require('../public/javascripts/functions/shop/listShop.js');
var loadInventory = require('../public/javascripts/functions/inventory/loadInventroy.js');
var getItemName = require('../public/javascripts/functions/inventory/getItemName.js');
var buyShop = require('../public/javascripts/functions/shop/buyShop.js');
var sellShop = require('../public/javascripts/functions/shop/sellShop.js');


/* GET home page. */
router.get('/', async function(req, res, next) {
	await stdCall(req);
	res.render('index', stdParameter(req, 'Hackergame', {onlinePlayers: await getOnlinePlayers()}));
});

router.get('/signup', async function(req, res, next) {
	await stdCall(req);
	res.render('signup', stdParameter(req, 'Sign up', {message: req.query.error}));
});

router.get('/login', async function(req, res, next) {
	await stdCall(req);
	res.render('login', stdParameter(req, 'Login', {}));
});

router.get('/bank', async function(req, res, next) {
	await stdCall(req);
	let players = await getAllPlayers(req.session.uuid, "everyoneButYou");
	res.render('bank', stdParameter(req, 'Bank', {money: req.session.money, players: players}));
});

router.post('/bank', async function(req, res, next) {
	await stdCall(req);
	await transferMoney(req);
	res.redirect('/bank');
});

router.get('/admin', async function(req, res, next) {
	await stdCall(req);
	res.render('admin', stdParameter(req, 'Adminarea', {players: await getAllPlayers(req.session.uuid, "everyone")}));
});

router.post('/deposit', async function(req, res, next) {
	await stdCall(req);
	await changeMoney(req.session.uuid, req.body.amount, "give");
	res.redirect('/');
});

router.get('/profile', async function(req, res, next) {
	await stdCall(req);
	res.render('profile', stdParameter(req, 'Profile', {user: await getUserInfo(req)}));
});

router.get('/logout', async function(req, res, next) {
	await setLoggedIn(false, req.session.uuid);
	req.session.destroy();
	res.redirect('/');
});

router.get('/console', async function(req, res, next) {
	await stdCall(req);
	res.render('console', stdParameter(req, 'Console', {message: req.session.command_log}));
});

router.get('/shop', async function(req, res, next) {
	await stdCall(req);
	res.render('shop', stdParameter(req, 'Shop', {shoplist: await listShop(), message: req.query.error}));
});

router.post('/buyshop', async function(req, res, next) {
	var success = await buyShop(req);
	if(success) {
		res.redirect('/shop');
	} else {
		res.redirect('/shop?error=buyFailed');
	}
});

router.post('/sellshop', async function(req, res, next) {
	await sellShop(req);
	res.redirect('/inventory');
});

router.get('/inventory', async function(req, res, next) {
	var getinventory = await loadInventory(req.session.uuid);
	var inventory = await getItemName(getinventory);
	res.render('inventory', stdParameter(req, 'Inventory', {inventory: inventory}));
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
