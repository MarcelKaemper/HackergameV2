var express = require('express');
var router = express.Router();
var stdParameter = require('../public/javascripts/functions/stdParameter.js');
var stdCall = require('../public/javascripts/functions/stdCall.js');
var loadClans = require('../public/javascripts/functions/clans/loadClans.js');
var createClan = require('../public/javascripts/functions/clans/createClan.js');
var joinClan = require('../public/javascripts/functions/clans/joinClan');

router.get('/', async(req, res, next) => {
    stdCall(req);
    let clans = await loadClans();
    res.render('clan', stdParameter(req, 'Clans', {clans:clans}));
});

router.post('/joinClan', async(req, res, next) => {
    await joinClan(req.body.uuid, req.body.name, req.session.uuid, req.session.name, req.body.memberCount, req.body.maxMembers);
    res.redirect('/clan');
});

router.post('/createClan', async(req, res, next) => {
    await createClan(req.session.uuid, req.body.name, req.body.maxMembers, req.session.name);
    res.redirect('/clan');
});

module.exports = router;