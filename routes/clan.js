var express = require('express');
var router = express.Router();
var stdParameter = require('../public/javascripts/functions/stdParameter.js');
var stdCall = require('../public/javascripts/functions/stdCall.js');
var loadClans = require('../public/javascripts/functions/clans/loadClans.js');
var createClan = require('../public/javascripts/functions/clans/createClan.js');
var joinClan = require('../public/javascripts/functions/clans/joinClan');
var clanInfo = require('../public/javascripts/functions/clans/clanInfo');
var leaveClan = require('../public/javascripts/functions/clans/leaveClan.js');

router.get('/', async(req, res, next) => {
    await stdCall(req);
    let clans = await loadClans();
    let currentClan = req.session.clan;
    let currentMembers = await clanInfo(currentClan)
    res.render('clan/clan', stdParameter(req, 'Clans', {currentClan: currentClan, members: currentMembers, clans:clans}));
});

router.post('/joinClan', async(req, res, next) => {
    await joinClan(req.body.uuid, req.body.name, req.session.uuid, req.session.displayName, req.body.memberCount, req.body.maxMembers);
    res.redirect('/clan');
});

router.post('/createClan', async(req, res, next) => {
    await createClan(req.session.uuid, req.body.name, req.body.maxMembers, req.session.displayName);
    res.redirect('/clan');
});

router.get('/info', async(req, res, next) => {
    await stdCall(req);
    let clan = req.query.clan;
    console.log(clan);
    if(clan == undefined){
        clan = req.session.clan;
    }
    let members = await clanInfo(clan);
    res.render('clan/info', stdParameter(req, clan, {members: members}));
})

router.get('/leaveclan', async(req, res, next) => {
    await leaveClan(req);
    res.redirect('/clan');
});

module.exports = router;