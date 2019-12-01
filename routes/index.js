const express = require('express');
const router = express.Router();
const setLoggedIn = require('../public/javascripts/functions/setLoggedIn.js');
const getOnlinePlayers = require('../public/javascripts/functions/getOnlinePlayers.js');
const consolecmd = require('../public/javascripts/functions/console.js');
const getAllPlayers = require('../public/javascripts/functions/getAllPlayers.js');
const transferMoney = require('../public/javascripts/functions/transferMoney.js');
const changeMoney = require('../public/javascripts/functions/changeMoney.js');
const stdCall = require('../public/javascripts/functions/stdCall.js');
const adminAreaHandler = require('../public/javascripts/functions/admin/adminHandler.js');
const signup = require('../public/javascripts/functions/signup.js');
const login = require('../public/javascripts/functions/login.js');
const cashbonus = require('../public/javascripts/functions/cashbonus.js');
const getUserInfo = require('../public/javascripts/functions/getUserInfo.js');
const stdParameter = require('../public/javascripts/functions/stdParameter.js');
const listShop = require('../public/javascripts/functions/shop/listShop.js');
const loadInventory = require('../public/javascripts/functions/inventory/loadInventroy.js');
const getItemData = require('../public/javascripts/functions/inventory/getItemData.js');
const buyShop = require('../public/javascripts/functions/shop/buyShop.js');
const sellShop = require('../public/javascripts/functions/shop/sellShop.js');
const getTopPlayers = require('../public/javascripts/functions/getTopPlayers.js');

/* GET home page. */
router.get('/', async(req, res, next) => {
	await stdCall(req);
	res.render('index', stdParameter(req, 'Hackergame', { onlinePlayers: await getOnlinePlayers(), topPlayers: await getTopPlayers(), user: await getUserInfo(req) }));
});

router.get('/signup', async(req, res, next) => {
	await stdCall(req);
	res.render('signup', stdParameter(req, 'Sign up', { message: req.query.error }));
});

router.get('/login', async(req, res, next) => {
	await stdCall(req);
	res.render('login', stdParameter(req, 'Login', {}));
});

router.get('/bank', async(req, res, next) => {
	await stdCall(req);
	let players = await getAllPlayers(req.session.uuid, "everyoneButYou");
	res.render('bank', stdParameter(req, 'Bank', { money: req.session.money, players: players, user: await getUserInfo(req) }));
});

router.post('/bank', async(req, res, next) => {
	await stdCall(req);
	await transferMoney(req);
	res.redirect('/bank');
});

router.get('/admin', async(req, res, next) => {
	await stdCall(req);
	res.render('admin', stdParameter(req, 'Adminarea', { players: await getAllPlayers(req.session.uuid, "everyone"), user: await getUserInfo(req) }));
});

router.post('/deposit', async(req, res, next) => {
	await stdCall(req);
	await changeMoney(req.session.uuid, req.body.amount, "give");
	res.redirect('/');
});

router.get('/profile', async(req, res, next) => {
	await stdCall(req);
	res.render('profile', stdParameter(req, 'Profile', { user: await getUserInfo(req) }));
});

router.get('/logout', async(req, res, next) => {
	await setLoggedIn(false, req.session.uuid);
	req.session.destroy();
	res.redirect('/');
});

router.get('/console', async(req, res, next) => {
	await stdCall(req);
	res.render('console', stdParameter(req, 'Console', { message: req.session.command_log, user: await getUserInfo(req) }));
});

router.get('/shop', async(req, res, next) => {
	await stdCall(req);
	res.render('shop', stdParameter(req, 'Shop', { shoplist: await listShop(), message: req.query.error, user: await getUserInfo(req) }));
});

router.post('/buyshop', async(req, res, next) => {
	var success = await buyShop(req);
	if (success) {
		res.redirect('/shop');
	} else {
		res.redirect('/shop?error=buyFailed');
	}
});

router.post('/sellshop', async(req, res, next) => {
	await sellShop(req);
	res.redirect('/inventory');
});

router.get('/inventory', async(req, res, next) => {
	var getinventory = await loadInventory(req.session.uuid);
	var inventory = await getItemData(getinventory);
	res.render('inventory', stdParameter(req, 'Inventory', { inventory: inventory, user: await getUserInfo(req) }));
});

router.get('/cashbonus', async(req, res, next) => {
	await cashbonus(req.session.uuid);
	res.redirect('/');
});

router.post('/admin', async(req, res, next) => {
	if (req.body.confirm) {
		await adminAreaHandler(req.body.operation, req.body.user, req.body.additional);
	}
	res.redirect('/admin');
});

router.post('/console', async(req, res, next) => {
	await consolecmd(req, req.body.command);
	//res.render('console', {loggedIn: req.session.loggedIn, message: message});
	res.redirect('/console');
});

router.post('/login', async(req, res, next) => {
	var success = await login(req, req.body.login, req.body.password);

	if (success) {
		res.redirect('/');
	} else {
		res.redirect('/login?error=loginFailed');
	}
});

router.post('/signup', async(req, res, next) => {
	var success = await signup(req, req.body.mail, req.body.username, req.body.password, req.body.confirmPassword);

	if (success) {
		res.redirect('login');
	} else {
		res.redirect('signup?error=invalidEmail');
	}
});

module.exports = router;
