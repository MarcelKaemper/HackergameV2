const express = require('express');
const router = express.Router();
const stdParameter = require('../public/javascripts/functions/stdParameter.js');
const stdCall = require('../public/javascripts/functions/stdCall.js');
const getUserInfo = require('../public/javascripts/functions/getUserInfo.js');
const countServer = require('../public/javascripts/functions/server/countServer.js');
const buyServer = require('../public/javascripts/functions/server/buyServer.js');
const listServer = require('../public/javascripts/functions/server/listServer.js');
const sellServer = require('../public/javascripts/functions/server/sellServer.js');
const repairServer = require('../public/javascripts/functions/server/repairServer.js');
const genNewPassword = require('../public/javascripts/functions/server/genNewPassword.js');
const loadInventory = require('../public/javascripts/functions/inventory/loadInventroy.js');
const getItemData = require('../public/javascripts/functions/inventory/getItemData.js');
const installSrvItem = require('../public/javascripts/functions/inventory/installSrvItem.js');
const consolecmd = require('../public/javascripts/functions/console/consolecmd.js');

router.get('/', async(req, res, next) => {
	await stdCall(req);
	var count = await countServer(req.session.uuid);
	var srvlist = await listServer(req.session.uuid);
	var getinventory = await loadInventory(req.session.uuid);
	var inventory = await getItemData(getinventory);
	res.render('server', stdParameter(req, 'Server', {countServer: count, message: req.query.error, listServer: srvlist, inventory: inventory, user: await getUserInfo(req)}));
});

router.post('/buyserver', async(req, res, next) => {
	var success = await buyServer(req);
	if(success) {
		res.redirect('/server');
	} else {
		res.redirect('/server?error=purchaseFailed');
	}
});

router.post('/sellserver', async(req, res, next) => {
	var success = await sellServer(req);
	if(success) {
		res.redirect('/server');
	} else {
		res.redirect('/server?error=sellFailed');
	}
});

router.post('/repairserver', async(req, res, next) => {
	var success = await repairServer(req);
	if(success) {
		res.redirect('/server');
	} else {
		res.redirect('/server?error=repairFailed');
	}
});

router.post('/newserverpassword', async(req, res, next) => {
	await genNewPassword(req);
	res.redirect('/server');
});

router.post('/installitem', async(req, res, next) => {
	var success = await installSrvItem(req);
	if(success) {
		res.redirect('/server');
	} else {
		res.redirect('/server?error=installFailed');
	}
});

router.post('/manage/login', async(req, res, next) => {
	if(req.session.boolConToSrv) {
		await consolecmd(req, "exit");
		await consolecmd(req, "server connect " + req.body.srvloginipaddress + " " + req.body.srvloginpassword);
	} else {
		await consolecmd(req, "server connect " + req.body.srvloginipaddress + " " + req.body.srvloginpassword);
	}
	res.redirect('/console');
});

router.post('/manage/logout', async(req, res, next) => {
	await consolecmd(req, "exit");
	res.redirect('/console');
});

module.exports = router;
