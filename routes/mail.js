var express = require('express');
var router = express.Router();
var stdParameter = require('../public/javascripts/functions/stdParameter.js');
var stdCall = require('../public/javascripts/functions/stdCall.js');
var sendMail = require('../public/javascripts/functions/mail/sendMail.js');

router.get('/', async(req, res, next) => {
    stdCall(req);
    res.render('mail/mail', stdParameter(req, 'Mail', {}));
});

router.post('/sendMail', async(req, res, next) => {
    await sendMail(req, req.body.sendTo, req.body.subject, req.body.message);
    res.redirect('/mail');
});

module.exports = router;