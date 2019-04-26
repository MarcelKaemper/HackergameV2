var express = require('express');
var router = express.Router();
var stdParameter = require('../public/javascripts/functions/stdParameter.js');
var stdCall = require('../public/javascripts/functions/stdCall.js');
var sendMail = require('../public/javascripts/functions/mail/sendMail.js');
var mailPreview = require('../public/javascripts/functions/mail/mailPreview.js');

router.get('/', async (req, res, next) => {
    stdCall(req);
    let preview = await mailPreview(req.session.uuid);
    res.render('mail/mail', stdParameter(req, 'Mail', {preview: preview}));
});

router.post('/sendMail', async (req, res, next) => {
    let message = req.body.message.replace(/(\r\n|\n|\r)/gm, "\\n");
    console.log(message);
    await sendMail(req, req.body.sendTo, req.body.subject, message);
    res.redirect('/mail');
});

module.exports = router;