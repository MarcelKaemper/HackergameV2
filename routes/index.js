const express = require('express');
const router = express.Router();
const stdParameter = require('../public/javascripts/functions/stdParameter.js');
const stdCall = require('../public/javascripts/functions/stdCall.js');
const getUserInfo = require('../public/javascripts/functions/getUserInfo.js');
const setLoggedIn = require('../public/javascripts/functions/setLoggedIn.js');
const getOnlinePlayers = require('../public/javascripts/functions/getOnlinePlayers.js');
const changeMoney = require('../public/javascripts/functions/changeMoney.js');
const signup = require('../public/javascripts/functions/signup.js');
const login = require('../public/javascripts/functions/login.js');
const cashbonus = require('../public/javascripts/functions/cashbonus.js');
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

router.post('/deposit', async(req, res, next) => {
	await stdCall(req);
	await changeMoney(req.session.uuid, req.body.amount, "give");
	res.redirect('/');
});

router.get('/logout', async(req, res, next) => {
	await setLoggedIn(false, req.session.uuid);
	req.session.destroy();
	res.redirect('/');
});

router.get('/cashbonus', async(req, res, next) => {
	await cashbonus(req.session.uuid);
	res.redirect('/');
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
