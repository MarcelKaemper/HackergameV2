const express = require('express');
const router = express.Router();
const stdParameter = require('../public/javascripts/functions/stdParameter.js');
const stdCall = require('../public/javascripts/functions/stdCall.js');
const getUserInfo = require('../public/javascripts/functions/getUserInfo.js');
const getAllPlayers = require('../public/javascripts/functions/getAllPlayers.js');
const adminAreaHandler = require('../public/javascripts/functions/admin/adminHandler.js');

router.get('/', async(req, res, next) => {
	await stdCall(req);
	res.render('admin', stdParameter(req, 'Adminarea', { players: await getAllPlayers(req.session.uuid, "everyone"), user: await getUserInfo(req) }));
});

router.post('/', async(req, res, next) => {
	if (req.body.confirm) {
		await adminAreaHandler(req.body.operation, req.body.user, req.body.additional);
	}
	res.redirect('/admin');
});

module.exports = router;
