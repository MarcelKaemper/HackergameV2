const express = require('express');
const router = express.Router();
const stdParameter = require('../public/javascripts/functions/stdParameter.js');
const stdCall = require('../public/javascripts/functions/stdCall.js');
const getUserInfo = require('../public/javascripts/functions/getUserInfo.js');
const loadClans = require('../public/javascripts/functions/clans/loadClans.js');
const createClan = require('../public/javascripts/functions/clans/createClan.js');
const joinClan = require('../public/javascripts/functions/clans/joinClan');
const clanInfo = require('../public/javascripts/functions/clans/clanInfo');
const leaveClan = require('../public/javascripts/functions/clans/leaveClan.js');

router.get('/', async(req, res, next) => {
    await stdCall(req);
    let clans = await loadClans();
    let currentClan = req.session.clan;
    let currentMembers = await clanInfo(currentClan);
    res.render('clan/clan', stdParameter(req, 'Clans', { currentClan: currentClan, members: currentMembers, clans: clans, user: await getUserInfo(req) }));
});

router.post('/joinClan', async(req, res, next) => {
    await joinClan(req.body.uuid, req.body.name, req.session.uuid, req.session.displayName, req.body.memberCount, req.body.maxMembers);
    res.redirect('/clan');
});

router.post('/createClan', async(req, res, next) => {
    await createClan(req.session.uuid, req.body.name, req.body.maxMembers != "" ? req.body.maxMembers : "10", req.session.displayName);
    res.redirect('/clan');
});

router.get('/info', async(req, res, next) => {
    await stdCall(req);
    let clan = req.query.clan;
    if (clan == undefined) {
        clan = req.session.clan;
    }
    let members = await clanInfo(clan);
    res.render('clan/info', stdParameter(req, clan, { members: members, user: await getUserInfo(req) }));
});

router.get('/leaveclan', async(req, res, next) => {
    await leaveClan(req);
    res.redirect('/clan');
});

module.exports = router;