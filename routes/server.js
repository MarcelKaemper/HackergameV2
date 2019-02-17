var express = require('express');
var router = express.Router();
var stdParameter = require('../public/javascripts/functions/stdParameter.js');
var stdCall = require('../public/javascripts/functions/stdCall.js');
var countServer = require('../public/javascripts/functions/server/countServer.js');
var buyServer = require('../public/javascripts/functions/server/buyServer.js');
var listServer = require('../public/javascripts/functions/server/listServer.js');
var sellServer = require('../public/javascripts/functions/server/sellServer.js');
var repairServer = require('../public/javascripts/functions/server/repairServer.js');
var genNewPassword = require('../public/javascripts/functions/server/genNewPassword.js');
var loadInventory = require('../public/javascripts/functions/inventory/loadInventroy.js');
var getItemName = require('../public/javascripts/functions/inventory/getItemName.js');
var installSrvItem = require('../public/javascripts/functions/inventory/installSrvItem.js');

router.get('/', async function(req, res, next) {
	await stdCall(req);
	var count = await countServer(req.session.uuid);
	var srvlist = await listServer(req.session.uuid);
	var getinventory = await loadInventory(req.session.uuid);
	var inventory = await getItemName(getinventory);
	res.render('server', stdParameter(req, 'Server', {countServer: count, message: req.query.error, listServer: srvlist, inventory: inventory}));
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

router.post('/installitem', async function(req, res, next) {
	var success = await installSrvItem(req);
	if(success) {
		res.redirect('/server');
	} else {
		res.redirect('/server?error=installFailed');
	}
});

module.exports = router;