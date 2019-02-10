var express = require('express');
var router = express.Router();
var stdParameter = require('../public/javascripts/functions/stdParameter.js');
var stdCall = require('../public/javascripts/functions/stdCall.js');
var loadClans = require('../public/javascripts/functions/clans/loadClans.js');
var createClan = require('../public/javascripts/functions/clans/createClan.js');

router.get('/', async(req, res, next) => {
    stdCall(req);
    let clans = await loadClans();
    res.render('clan', stdParameter(req, 'Clans', {clans:clans}));
});

router.post('/createClan', async(req, res, next) => {
    await createClan(req.session.uuid, req.body.name, req.body.maxMembers, req.session.name);
    res.redirect('/clan');
});

module.exports = router;