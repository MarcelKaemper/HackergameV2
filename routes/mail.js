var express = require('express');
var router = express.Router();
var stdParameter = require('../public/javascripts/functions/stdParameter.js');
var stdCall = require('../public/javascripts/functions/stdCall.js');
var sendMail = require('../public/javascripts/functions/mail/sendMail.js');
var loadInbox = require('../public/javascripts/functions/mail/loadInbox.js');

router.get('/', async (req, res, next) => {
    stdCall(req);
    let inbox = await loadInbox(req.session.uuid);
    res.render('mail/mail', stdParameter(req, 'Mail', {preview: inbox}));
});

router.post('/', async (req, res, next) => {
    stdCall(req);
    let inbox = await loadInbox(req.session.uuid);
    res.render('mail/mail', stdParameter(req, 'Mail', {preview: inbox, sender: req.body.sender, subject: req.body.subject, message: req.body.message}));
});

router.post('/sendMail', async (req, res, next) => {
    let message = req.body.message.replace(/(\r\n|\n|\r)/gm, "\\n");
    await sendMail(req, req.body.sendTo, req.body.subject, message);
    res.redirect('/mail');
});

module.exports = router;