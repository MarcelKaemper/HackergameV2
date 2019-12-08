const express = require('express');
const router = express.Router();
const stdParameter = require('../public/javascripts/functions/stdParameter.js');
const stdCall = require('../public/javascripts/functions/stdCall.js');
const getUserInfo = require('../public/javascripts/functions/getUserInfo.js');
const consolecmd = require('../public/javascripts/functions/console/consolecmd.js');

router.get('/', async(req, res, next) => {
	await stdCall(req);
	res.render('console', stdParameter(req, 'Console', { message: req.session.command_log, user: await getUserInfo(req) }));
});

router.post('/', async(req, res, next) => {
	await consolecmd(req, req.body.command);
	res.redirect('/console');
});

module.exports = router;
