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
var countServer = require('../public/javascripts/functions/server/countServer.js');
var buyServer = require('../public/javascripts/functions/server/buyServer.js');
var cashbonus = require('../public/javascripts/functions/cashbonus.js');
var listServer = require('../public/javascripts/functions/server/listServer.js');
var sellServer = require('../public/javascripts/functions/server/sellServer.js');
var getUserInfo = require('../public/javascripts/functions/getUserInfo.js');
var repairServer = require('../public/javascripts/functions/server/repairServer.js');
var stdParameter = require('../public/javascripts/functions/stdParameter.js');
var listShop = require('../public/javascripts/functions/shop/listShop.js');
var genNewPassword = require('../public/javascripts/functions/server/genNewPassword.js');
var getStock = require('../public/javascripts/functions/stocks/getStock.js');
var buyStock = require('../public/javascripts/functions/stocks/buyStock.js');
var loadStocks = require('../public/javascripts/functions/stocks/loadStocks.js');


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

router.get('/stocks', async function(req, res, next) {
	console.log(await loadStocks(req.session.uuid));
	var ownedStocks = await loadStocks(req.session.uuid);
	console.log(typeof JSON.parse(ownedStocks));
	res.render('stocks', stdParameter(req, 'Stocks', {money: req.session.money, ownedStocks: JSON.parse(ownedStocks)}));
});

router.post('/getStocks', async (req, res , next) => {
	let info = await getStock(req.body.stockName);
	res.render('stocks', stdParameter(req, 'Stocks', {price: parseInt(info.latestPrice), company: info.companyName, symbol: info.symbol}));
})

router.post('/buystock', async (req, res, next) => {
	console.log(req.body.symbol, req.body.name, req.body.price);
	await buyStock(req.session.uuid, req.body.symbol, parseInt(req.body.price));
	res.redirect('/stocks');
})

router.get('/bank', async function(req, res, next) {
	await stdCall(req);
	let players = await getAllPlayers(req.session.uuid, "everyoneButYou");
	res.render('bank', stdParameter(req, 'Bank', {money: req.session.money, players: players}));
});

router.post('/bank', async function(req, res, next) {
	await transferMoney(req);
	res.redirect('/bank');
});

router.get('/admin', async function(req, res, next) {
	res.render('admin', stdParameter(req, 'Adminarea', {players: await getAllPlayers(req.session.uuid, "everyone")}));
});

router.post('/deposit', async function(req, res, next) {
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
	res.render('shop', stdParameter(req, 'Shop', {shoplist: await listShop()}));
});

router.get('/server', async function(req, res, next) {
	await stdCall(req);
	var count = await countServer(req.session.uuid);
	var srvlist = await listServer(req.session.uuid);
	res.render('server', stdParameter(req, 'Server', {countServer: count, message: req.query.error, listServer: srvlist}));
});

router.post('/buyserver', async function(req, res, next) {
	var success = await buyServer(req);
	if(success) {
		res.redirect('/server');
	} else {
		res.redirect('/server?error=purchaseFailed');
	}
});

router.post('/sellserver', async function(req, res, next) {
	var success = await sellServer(req);
	if(success) {
		res.redirect('/server');
	} else {
		res.redirect('/server?error=sellFailed');
	}
});

router.post('/repairserver', async function(req, res, next) {
	var success = await repairServer(req);
	if(success) {
		res.redirect('/server');
	} else {
		res.redirect('/server?error=repairFailed');
	}
});

router.post('/newserverpassword', async function(req, res, next) {
	await genNewPassword(req);
	res.redirect('/server');
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
