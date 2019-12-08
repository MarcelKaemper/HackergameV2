const express = require('express');
const router = express.Router();
const stdParameter = require('../public/javascripts/functions/stdParameter.js');
const stdCall = require('../public/javascripts/functions/stdCall.js');
const getUserInfo = require('../public/javascripts/functions/getUserInfo.js');
const transferMoney = require('../public/javascripts/functions/transferMoney.js');
const getAllPlayers = require('../public/javascripts/functions/getAllPlayers.js');

router.get('/', async(req, res, next) => {
	await stdCall(req);
	let players = await getAllPlayers(req.session.uuid, "everyoneButYou");
	res.render('bank', stdParameter(req, 'Bank', { money: req.session.money, players: players, user: await getUserInfo(req) }));
});

router.post('/', async(req, res, next) => {
	await stdCall(req);
	await transferMoney(req);
	res.redirect('/bank');
});

module.exports = router;
